// @ts-check
/// <reference path="../shared/chrome.d.ts"/>

/** Wrapper function for isolating scope, as otherwise extension scripts run in a shared scope (or at least the type-checker thinks they do) causing some undesirable cross-file variable borrowing/duplicate-flagging */
(async () => {
  /** @typedef {import("../shared/settings.d.ts").settings} settingsObj */

  /** @type {{blacklist?: string[], filtered?: string[], settings?: settingsObj}} */
  const storage = await chrome.storage.sync.get([
    "blacklist",
    "filtered",
    "settings",
  ]);
  if (storage.filtered) {
    // "filtered" is the previous key used for blacklist storage, feel free to remove this migration code by 2024
    await chrome.storage.sync.set({
      blacklist: storage.filtered,
      filtered: null,
    });
    storage.blacklist = structuredClone(storage.filtered);
    delete storage.filtered;
  }

  let blacklist = storage.blacklist ?? [];
  let settings = storage.settings ?? {};

  /**
   * @typedef {Object} Filter
   * @property {string} blacklisted The blacklisted text
   * @property {number} removedCount The amount of times (in this page load) that this filter's `string` was matched and prompted a listing's removal
   */

  /** @type {Filter[]} */
  let filters = blacklist.map((blacklisted) => {
    return { blacklisted, removedCount: 0 };
  });

  let totalFiltered = 0;

  /** All extension elements, `details` being the outermost wrapper */
  const elems = {
    details: document.createElement("details"),
    summary: document.createElement("summary"),
    filterList: document.createElement("ul"),
    description: document.createElement("p"),
  };

  elems.details.id = "FJF_JobsFilter";
  elems.details.appendChild(elems.summary);
  elems.details.appendChild(elems.filterList);
  elems.details.appendChild(elems.description);

  /**
   * Helper to set the extension element's summary text and description
   * @param {string} summary Text which is visible regardless of whether the extension's wrapper is expanded or collapsed
   * @param {string} description Text/HTML which is only visible when the extension's wrapper is expanded (assigned as HTML to support links e.g. support page)
   */
  function setText(summary, description) {
    elems.summary.innerText = summary;
    elems.description.innerHTML = description;
  }

  /**
   * Converts the provided `Filter` array into an HTML list
   * @param {Filter[]} filters
   * @returns {HTMLUListElement}
   */
  function filtersToListElem(filters) {
    const ul = document.createElement("ul");
    for (const filter of filters) {
      if (settings.hideFilterCountersAtZero && !filter.removedCount) continue;
      const li = document.createElement("li");
      li.innerText = filter.blacklisted + ": " + filter.removedCount;
      ul.appendChild(li);
    }
    if (settings.hideFilterCountersAtZero) {
      const li = document.createElement("li");
      li.className = "note";
      li.innerText = `[${filters.length - ul.children.length} hidden at zero]`;
      ul.appendChild(li);
    }
    return ul;
  }

  class PageData {
    /**
     * @param {string} jobsListSelector The selector for this page's wrapper for job listings. To be watched with a `MutationObserver`
     * @param {string} jobItemSelector The selector for this page's job listings. To be queried and iterated on initial load and list mutations
     * @param {boolean=} manualStart Whether to withhold filtering on this page until the user confirms they're done editing sort/search functionalities (due to unknown/irreconcilable conflicts between extension and site behavior)
     * @param {string=} disclaimer Disclaimer text to be displayed under the filters list
     */
    constructor(jobsListSelector, jobItemSelector, manualStart, disclaimer) {
      this.jobsList = jobsListSelector;
      this.jobItem = jobItemSelector;
      this.manualStart = manualStart; // Created due to Wellfound throwing a 404 with a bunch of console errors when changing sort/filter options after the filtering MutationObserver is attached. Wellfound uses NextJS, and my best guess is that the incompatibility has something to do with NextJS's SPA mechanisms
      this.disclaimer = disclaimer;
    }
  }

  class SiteData {
    /**
     * @param {string} siteName The website's name, as it appears in its FQDN
     * @param {PageData[]} pagesDataArray `PageData` for the job pages under this domain (e.g. logged out, logged in)
     */
    constructor(siteName, pagesDataArray) {
      this.name = siteName;
      this.pages = pagesDataArray;
    }
  }
  const compatibleSites = [
    new SiteData("linkedin", [
      new PageData(
        "div[data-results-list-top-scroll-sentinel] + ul",
        "div[data-results-list-top-scroll-sentinel] + ul > li"
      ),
    ]),
    new SiteData("indeed", [
      new PageData(
        "#mosaic-provider-jobcards",
        "#mosaic-provider-jobcards > ul > li",
        false,
        "(Due to conflicts with site architecture, listings are liable to have minor rendering quirks)"
      ), // I would've fixed those quirks if I could sufficiently figure them out. A fix commit would be welcomed!
    ]),
    new SiteData("wellfound", [
      new PageData(".styles_results__ZQhDf", ".styles_result__rPRNG"), // This page just has some listings from a few popular companies before prompting the user to register. I'm supporting it for now, but won't be surprised if these class suffixes change when they recompile for an update
      new PageData(
        '[data-test="JobSearchResults"]',
        '[data-test="StartupResult"]',
        true
      ),
    ]),
  ];

  /**
   * Retrieves compatible `SiteData` (if any) based on the current URL's FQDN
   * @returns {SiteData=} `SiteData` for current site, or `undefined` if there isn't any for the current site
   */
  function findSiteData() {
    let data;
    for (const siteData of compatibleSites) {
      if (window.location.hostname.match(siteData.name)) {
        data = siteData;
        break;
      }
    }
    return data;
  }

  /**
   * Queries for compatible `PageData` using the list selector
   * @param {SiteData} siteData The current site's `SiteData`, from which to query possible `PageData`s
   * @returns {PageData=} `PageData` for the current page (liable to find none, e.g. due to slow loading or site changes)
   */
  function queryForPageData(siteData) {
    let data;
    for (const pageData of siteData.pages) {
      if (document.querySelector(pageData.jobsList)) {
        data = pageData;
        break;
      }
    }
    return data;
  }

  /**
   * Retrieves compatible `PageData` (if any) based on the list selector, by querying it on a interval (to account for varying page-load speeds) with finite attempts
   * @param {SiteData} siteData The current site's `SiteData`, from which to query for possible `PageData`s
   * @returns {Promise<PageData|undefined>} `PageData` for the current page (liable to find none, e.g. due to slow loading or site updates)
   */
  async function findPageData(siteData) {
    // If/when changing the max testing period:
    // 1. Test on both Firefox & Chrome (former especially, it's been significantly slower on at least one relevant page)
    // 2. A particularly slow page is Wellfound's logged-out page
    let data;
    for (let i = 0; i < 10; i++) {
      data = queryForPageData(siteData);
      if (data) break;
      await new Promise((resolve) => setTimeout(resolve, 350));
    }
    return data;
  }

  /**
   * Deletes any listing element which contains blacklisted text, updating the filter count of that blacklist
   * @param {PageData} pageData
   */
  function filterListings(pageData) {
    const allListings = Array.from(document.querySelectorAll(pageData.jobItem));

    allListings.forEach((listingElem) => {
      for (const [index, filter] of filters.entries()) {
        if (
          listingElem.textContent &&
          listingElem.textContent.includes(filter.blacklisted)
        ) {
          listingElem.remove();

          totalFiltered++;
          filters[index].removedCount++;
          break;
        }
      }
    });
    elems.summary.innerText = "Jobs filtered: " + totalFiltered;

    elems.filterList.replaceWith(
      (elems.filterList = filtersToListElem(filters))
    );
    // ^ I measured this and compared it to updating a specific filter's count element when there's a match... and replacing the entire list was faster!
  }

  /**
   * Call the `filterListing` function & set up the `MutationObserver` which'll call it on every change inside the list element
   * @param {PageData} pageData
   */
  function startFiltering(pageData) {
    const jobsList = document.querySelector(pageData.jobsList);
    if (!jobsList) {
      setText(
        "Error: Failed to find page's jobs list",
        'The wrapper used by this extension to detect listing updates can no longer be found. Please report this at <a href="https://github.com/EvAvKein/FilterJobsFeeds/issues/new">the extension support page</a> (with the page URL and the steps which led to this problem)'
      );
      return;
    }

    elems.description.innerText = pageData.disclaimer ?? "";
    filterListings(pageData);

    new MutationObserver(() => filterListings(pageData)).observe(jobsList, {
      childList: true,
      subtree: true,
    });
  }

  /** A function containing all the steps for setting up the extension on a given page */
  async function initialize() {
    setText(
      "Loading...",
      'If you have time to read this, the current website is likely monopolizing script execution. If this issue doesn\'t resolve itself within 1-2 minutes, please report it at <a href="https://github.com/EvAvKein/FilterJobsFeeds/issues/new">the extension support page</a> (with the page URL)'
    );
    document.body.appendChild(elems.details);

    const siteData = findSiteData();
    if (!siteData) {
      setText(
        "Error: Failed to load specs for this site",
        'Please report this at <a href="https://github.com/EvAvKein/FilterJobsFeeds/issues/new">the extension support page</a> (with the page URL)'
      );
      return;
    }

    if (!blacklist?.length) {
      setText(
        "Blacklist is empty!",
        "Edit your blacklist in the extension settings"
      );
      return;
    }

    const initOnceReady = new MutationObserver(async () => {
      initOnceReady.disconnect();
      setText(
        "Searching for page specs...",
        'If this message persists, please report this at <a href="https://github.com/EvAvKein/FilterJobsFeeds/issues/new">the extension support page</a>'
      );

      const pageData = await findPageData(siteData);
      if (!pageData) {
        setText(
          "Error: Failed to load specs for this page",
          'Try refreshing the page, and if this error remains please report this at <a href="https://github.com/EvAvKein/FilterJobsFeeds/issues/new">the extension support page</a> (with the page URL & a screenshot)'
        );
        return;
      }

      if (!pageData.manualStart) {
        startFiltering(pageData);
        return;
      }

      setText(
        "Activate once you're ready to browse!",
        "Manual activation is required due to conflicts with search/sort functionalities, so first make sure you're done editing those!"
      );
      const toggleButtonElem = document.createElement("button");
      toggleButtonElem.innerText = "ACTIVATE";
      toggleButtonElem.addEventListener(
        "click",
        () => {
          startFiltering(pageData);

          toggleButtonElem.remove();
          elems.details.open = false;
        },
        { once: true }
      );
      elems.details.appendChild(toggleButtonElem);
    });
    initOnceReady.observe(document.body, { childList: true, subtree: true });
  }
  initialize();
})();
