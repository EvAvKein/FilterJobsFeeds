// @ts-check

/** @typedef {import("../chrome.js").chrome} chrome */

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
   * @param {string} siteName The website's name, as it appears in the domain name
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
  new SiteData("wellfound.com", [
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
 * @typedef {Object} Filter
 * @property {string} string The blacklisted text
 * @property {number} removedCount The amount of times (in this page load) that this filter's `string` was matched and prompted a listing's removal
 */

/**
 * Retrieves compatible `SiteData` (if any) based on the current URL
 * @returns {SiteData=} `SiteData` for current site (if found, which is predominantly the case)
 */
function findSiteData() {
  let data;
  for (const siteData of compatibleSites) {
    if (document.URL.match(siteData.name)) {
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
  // 1. Test on both Firefox & Chrome (former especially, as I can personally attest to its significantly slower load speed of at least one extension-relevant page)
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

/**
 * Retrieves blacklisted texts from the extension's storage
 * @returns {Promise<string[]>}
 */
async function getFilters() {
  // function is copy-pasted from settings.js, because using modules in chrome extensions seemingly requires either wacky code or a service-worker (the latter introducing another point of failure and just seeming excessive)
  // also, see that file for context about the function
  return new Promise((resolve) => {
    chrome.storage.sync.get(["filtered"], (storage) => resolve(storage.filtered));
  });
};

/**
 * A function containing all the steps for setting up the extension on a given page
 */
function initialize() {
  const detailsElem = document.createElement("details");
  const summaryElem = document.createElement("summary");
  const placeholderFilterListElem = document.createElement("ul");
  const descriptionElem = document.createElement("p");
  detailsElem.appendChild(summaryElem);
  detailsElem.appendChild(placeholderFilterListElem);
  detailsElem.appendChild(descriptionElem);
  detailsElem.id = "EAK_JobsFilter";
  summaryElem.innerText = "Loading...";
  descriptionElem.innerHTML = 'If you have time to read this, the current website is likely monopolizing script execution. If this issue doesn\'t resolve itself within 1-2 minutes, please report it at <a href="https://github.com/EvAvKein/FilterJobsFeeds/issues/new">the extension support page</a> (with the page URL)';
  document.body.appendChild(detailsElem);

  const siteData = findSiteData();
  if (!siteData) {
    summaryElem.innerText = "Error: Failed to load specs for this site";
    descriptionElem.innerHTML = 'Please report this at <a href="https://github.com/EvAvKein/FilterJobsFeeds/issues/new">the extension support page</a> (with the page URL)';
    return;
  };

  getFilters().then((filtersArray) => {
    if (!filtersArray?.length) {
      summaryElem.innerText = "No filters added!";
      descriptionElem.innerText = "Edit your filters in the extension settings";
      return;
    };
    
    let totalFiltered = 0;
    const filters = filtersArray.map((filter) => {
      return {string: filter, removedCount: 0};
    });

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

      summaryElem.innerText = "Total jobs filtered: " + totalFiltered;
      
      detailsElem.querySelector("ul").replaceWith(filtersToListElem(filters));
      // ^ i compared this to updating the count element upon every match in the filters loop, and this implementation is faster
      // (performance for both was measured by pushing a before-and-after difference of performance.now() to an array and averaging that array once in a while. count elem update statement was "detailsElem.querySelector(`ul :nth-child(${index + 1}) span`).innerText = filters[index].removedCount")
    };

    const initOnceReady = new MutationObserver(async () => {
      initOnceReady.disconnect();

      summaryElem.innerText = "Searching for page specs...";
      descriptionElem.innerHTML = 'If this message persists, please report this at <a href="https://github.com/EvAvKein/FilterJobsFeeds/issues/new">the extension support page</a>';

      const pageData = await findPageData(siteData);
      if (!pageData) {
        summaryElem.innerText = "Error: Failed to load specs for this page";
        descriptionElem.innerHTML = 'Try refreshing the page, and if this error remains please report this at <a href="https://github.com/EvAvKein/FilterJobsFeeds/issues/new">the extension support page</a> (with the page URL & a screenshot)';
        return;
      };

      descriptionElem.innerText = pageData.disclaimer || "";

      const filterOnMutation = new MutationObserver(() => {filterListings(pageData)});
      /**
       * Call the `filterListing` function & set up the `MutationObserver` which'll call it on every change inside the list element
       */
      function startFiltering() {
        if (!pageData) return; /* temporary. gonna refactor soon after this commit */
        filterListings(pageData);

        filterOnMutation.observe(
          document.querySelector(pageData.jobsList),
          {childList: true, subtree: true}
        );
      };

      if (!pageData.manualStart) {
        startFiltering();
        return;
      };

      summaryElem.innerText = "Activate once you're ready to browse!";
      descriptionElem.innerText = "Manual activation is required due to conflicts with search/sort functionalities, so first make sure you're done editing those!";

      const toggleButtonElem = document.createElement("button");
      toggleButtonElem.innerText = "ACTIVATE";
      detailsElem.appendChild(toggleButtonElem);

      toggleButtonElem.addEventListener("click", () => {
        startFiltering();
        toggleButtonElem.remove();
        detailsElem.open = false;
      }, {once: true});
    });

    initOnceReady.observe(document.body, {childList: true, subtree: true});
  });
};
initialize();