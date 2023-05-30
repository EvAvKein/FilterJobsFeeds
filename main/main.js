// @ts-check

/** @typedef {import("../shared/chrome.d.ts").chrome} chrome */

/**
 * Wrapper function for isolating scope, as otherwise extension scripts run in a shared scope (or at least the type-checker thinks that they do) causing some undesirable cross-file variable borrowing/duplicate-flagging
 */
(async () => {
  /**
   * All extension elements, `details` being the outermost wrapper
   */
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
   * Shorthand for setting the extension's page element's summary text and description HTML/text
   * @param {string} summary Text which is visible regardless of whether the extension's wrapper is expanded or collapsed
   * @param {string} description HTML/text which is only visible when the extension's wrapper is expanded (assigned as HTML to support links e.g support page)
   */
  function setText(summary, description) {
    elems.summary.innerText = summary; 
    elems.description.innerText = description;
  }

  /**
   * Retrieves blacklisted texts from the extension's storage, or provides empty array if no blacklist exists
   * @returns {Promise<string[]>}
   */
  async function getFilters() {
    // function is copy-pasted from settings.js, because using modules in chrome extensions seemingly requires either wacky code or a service-worker (the latter introducing another point of failure and just seeming excessive)
    return (await chrome.storage.sync.get(["filtered"])).filtered ?? [];
  };

  let totalFiltered = 0;

  /** @type {string[]} */
  let blacklist = [];

  /**
   * @typedef {Object} Filter
   * @property {string} string The blacklisted text
   * @property {number} removedCount The amount of times (in this page load) that this filter's `string` was matched and prompted a listing's removal
   */

  /** @type {Filter[]} */
  let filters = [];

  /**
   * Converts the provided `Filter` array into an HTML list
   * @param {Filter[]} filters
   * @returns {HTMLUListElement}
   */
  function filtersToListElem(filters) {
    const ul = document.createElement("ul");
    filters.forEach((filter) => {
      const li = document.createElement("li");
      li.innerText = filter.string + ": " + filter.removedCount;
      ul.appendChild(li);
    });
    return ul;
  };

  class PageData {
    /**
     * @param {string} jobsListSelector The selector for this page's wrapper for job listings. To be watched with a `MutationObserver`
     * @param {string} jobItemSelector The selector for this page's job listings. To be queried and iterated through on initial load and further list mutations
     * @param {boolean=} manualStart Whether to withhold filtering on this page until the user confirms they're done editing sort/search functionalities (due to unknown/irreconcilable conflicts between extension and site behavior)
     * @param {string=} disclaimer Disclaimer text to be displayed under the filters list
     */
    constructor(jobsListSelector, jobItemSelector, manualStart, disclaimer) {
      this.jobsList = jobsListSelector;
      this.jobItem = jobItemSelector;
      this.manualStart = manualStart; // created due to Wellfound throwing a 404 with a bunch of console errors when changing sort/filter options after the filtering MutationObserver is attached. Wellfound uses NextJS, and my best guess is that the incompatibility has something to do with nextJS's SPA mechanisms
      this.disclaimer = disclaimer;
    };
  };

  class SiteData {
    /**
     * @param {string} siteName The website's name, as it appears in its FQDN
     * @param {PageData[]} pagesDataArray `PageData` for various job pages under this domains (e.g logged out, logged in)
     */
    constructor(siteName, pagesDataArray) {
      this.name = siteName;
      this.pages = pagesDataArray;
    };
  };
  const compatibleSites = [
    new SiteData("linkedin", [
      new PageData(".jobs-search__results-list", ".job-search-card"),
      new PageData(".scaffold-layout__list-container", ".job-card-container"),
    ]),
    new SiteData("indeed", [
      new PageData(".jobsearch-ResultsList", ".jobsearch-ResultsList > li", false, "(Due to conflicts with site architecture, listings are liable to have minor rendering quirks)"), // would've just fixed those quirks if i could sufficiently figure them out. a fix commit would be welcomed
    ]),
    new SiteData("wellfound", [
      new PageData(".styles_results__ZQhDf", ".styles_result__rPRNG"), // this page just has some listings from a few popular companies before prompting the user to register, but i'm supporting it on principle. also, wont be surprised if these class suffixes end up changing when they recompile for an update
      new PageData('[data-test="JobSearchResults"]', '[data-test="StartupResult"]', true),
    ]),
    new SiteData("f6s", [
      new PageData("#csResultsBlock", ".result-item"),
    ]),
    new SiteData("dice", [
      new PageData("dhi-search-cards-widget", "dhi-search-card"),
    ]),
  ];

  /**
   * Retrieves compatible `SiteData` (if any) based on the current URL's FQDN
   * @returns {SiteData=} `SiteData` for current site (if found, which is predominantly the case)
   */
  function findSiteData() {
    let data;
    for (const siteData of compatibleSites) {
      if (window.location.hostname.match(siteData.name)) {
        data = siteData;
        break;
      };
    };
    return data;
  };

  /**
   * Queries for compatible `PageData` using the list selector 
   * @param {SiteData} siteData The current site's `SiteData`, from which to query possible `PageData`s
   * @returns {PageData=} `PageData` for the current page (liable to find none, for reasons such as slow loading or site refactors)
   */
  function queryForPageData(siteData) {
    let data;
    for (const pageData of siteData.pages) {
      if (document.querySelector(pageData.jobsList)) {
        data = pageData;
        break;
      };
    };
    return data;
  };

  /**
   * Retrieves compatible `PageData` (if any) based on the list selector, by querying it on a interval (to account for varying page-load speeds) with finite attempts
   * @param {SiteData} siteData The current site's `SiteData`, from which to query possible `PageData`s
   * @returns {Promise<PageData|undefined>} `PageData` for the current page (liable to find none, for reasons such as slow loading or site refactors)
   */
  async function findPageData(siteData) {
    // If/when making adjustments that affect max testing period:
    // 1. Test on both Firefox & Chrome (former especially, as I can personally attest to its significantly slower load speed on at least one extension-relevant page)
    // 2. Some good test targets (i.e particularly slow pages) are Dice's page and Wellfound's logged-out page
    let data;
    for (let i = 0; i < 10; i++) {
      data = queryForPageData(siteData);
      if (data) break;
      await new Promise(resolve => setTimeout(resolve, 350));
    };
    return data;
  };

    /**
     * Deletes any listing element which contains blacklisted text, updating the filter count of that blacklist
     * @param {PageData} pageData 
     */
    function filterListings(pageData) {
      const allListings = Array.from(document.querySelectorAll(pageData.jobItem));
    
      allListings.forEach((listingElem) => {
        for (const [index, filter] of filters.entries()) {
          if (listingElem.textContent && listingElem.textContent.includes(filter.string)) {
            listingElem.remove();

            totalFiltered++;
            filters[index].removedCount++;
            break;
          };
        };
      });
      elems.summary.innerText = "Total jobs filtered: " + totalFiltered;

      elems.filterList.replaceWith(elems.filterList = filtersToListElem(filters));
      // ^ i measured and compared this (i.e replacing the entire list) to updating a matched filter's count element upon every match, and replacing the entire list was faster
    };

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
    };

    elems.description.innerText = pageData.disclaimer ?? "";
    filterListings(pageData);

    new MutationObserver(() => 
      filterListings(pageData)
    ).observe(
      jobsList,
      {childList: true, subtree: true}
    );
  };

  /**
   * A function containing all the steps for setting up the extension on a given page
   */
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
    };

    blacklist = await getFilters();
    if (!blacklist?.length) {
      setText(
        "No filters added!",
        "Edit your filters in the extension settings"
      );
      return;
    };

    filters = blacklist.map((filter) => {
      return {string: filter, removedCount: 0};
    });

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
      };

      if (!pageData.manualStart) {
        startFiltering(pageData);
        return;
      };

      setText(
        "Activate once you're ready to browse!",
        "Manual activation is required due to conflicts with search/sort functionalities, so first make sure you're done editing those!"
      );
      const toggleButtonElem = document.createElement("button");
      toggleButtonElem.innerText = "ACTIVATE";
      toggleButtonElem.addEventListener("click", () => {
        startFiltering(pageData);

        toggleButtonElem.remove();
        elems.details.open = false;
      }, {once: true});
      elems.details.appendChild(toggleButtonElem);
    });
    initOnceReady.observe(document.body, {childList: true, subtree: true});
  };
  initialize();
})();