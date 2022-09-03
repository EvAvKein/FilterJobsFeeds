class SiteData {
  constructor(siteName, jobsListSelector, jobsItemSelector) {
    this.name = siteName;
    this.jobsList = jobsListSelector;
    this.jobItem = jobsItemSelector;
  };
};
const compatibleSites = [
  new SiteData("linkedin", ".scaffold-layout__list-container", ".job-card-container"),
  new SiteData("angel.co", '[data-test="JobSearchResults"]', '[data-test="StartupResult"]'),
];

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

function stringsArrayToList(array) {
  let sentence = "";
  for (const [index, item] of array.entries()) { // initially wanted to use Array.reduce(), because this is a (rare) perfect case for it, but it's just not readable enough
    sentence += (index ? ", " + item : item);
  };
  return sentence;
};

async function getFilters() {
  // function is copy-pasted from settings.js, because using modules in chrome extensions seemingly requires either wacky code or a service-worker (the latter introducing another point of failure and just seeming excessive)
  // also, see that file for context about the function
  return new Promise((resolve) => {
    chrome.storage.sync.get(["filtered"], (storage) => resolve(storage.filtered));
  });
};

function filterListings(listingSelector, filteredStrings) {
  const allListings = Array.from(document.querySelectorAll(listingSelector));

  let filteredCount = 0;
  allListings.forEach((listingElem) => {
    const matchesAnyFilter = filteredStrings.some((filter) => listingElem.textContent.includes(filter));

    if (matchesAnyFilter) {
      listingElem.remove();
      filteredCount++;
    };
  });
  return filteredCount;
};

function initialize() {
  const containerElem = document.createElement("aside");
  const titleElem = document.createElement("h6");
  const descriptionElem = document.createElement("p");
  containerElem.id = "EAK_JobsFilter";
  containerElem.appendChild(titleElem);
  containerElem.appendChild(descriptionElem);
  document.body.appendChild(containerElem);

  const selectors = findSiteData();
  if (!selectors) {
    titleElem.innerText = "Error: Failed to load the specs for site";
    descriptionElem.innerText = "Please report this error at https://github.com/EvAvKein/FilterJobsFeeds/issues/new (and include this page's URL)";
    return;
  };

  getFilters().then((filters) => {
    if (!filters?.length) {
      titleElem.innerText = "No filters added!";
      descriptionElem.innerText = "Edit your filters in the extension settings";
      return;
    };
    descriptionElem.innerText = "Filtering: " + stringsArrayToList(filters);
  
    let totalFiltered = 0;
    const initOnceReady = new MutationObserver(() => {
      if (document.querySelector(selectors.jobsList)) {
        initOnceReady.disconnect();
        

        const filterOnMutation = new MutationObserver(() => {
          totalFiltered += filterListings(selectors.jobItem, filters);
          titleElem.innerText = "Total jobs filtered: " + totalFiltered;
        });
        filterOnMutation.observe(
          document.querySelector(selectors.jobsList),
          {childList: true, subtree: true}
        );
      };
    });
    initOnceReady.observe(
      document.body,
      {childList: true, subtree: true}
    );
  });
};
initialize();