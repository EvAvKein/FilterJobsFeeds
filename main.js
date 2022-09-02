let filterCount = 0;
let filteredStrings = [];
let selectors;

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

for (const siteData of compatibleSites) {
  if (document.URL.match(siteData.name)) {
    selectors = siteData;
    break;
  };
};

function stringsArrayToList(array) {
  let sentence = "";
  for (const [index, item] of array.entries()) { // initially wanted to use Array.reduce(), because this is a (rare) perfect case for it, but it's just not readable enough
    sentence += (index ? ", " + item : item);
  };
  return sentence;
};

const containerElem = document.createElement("aside");
const counterElem = document.createElement("h6");
const filtersElem = document.createElement("p");
containerElem.id = "EAK_JobsFilter";
containerElem.appendChild(counterElem);
containerElem.appendChild(filtersElem);

function updateCounterElem(newCount) {
  counterElem.innerText = "Total jobs filtered: " + newCount;
};

async function getFilters() { // copy-pasted from settings.js, because using modules in chrome extensions requires some very wacky code. also, see that file for context about this function
  return new Promise((resolve) => {
    chrome.storage.sync.get(["filtered"], (storage) => resolve(storage.filtered));
  });
};

function filterNewListings() {
  const allListings = Array.from(document.querySelectorAll(selectors.jobItem));

  const matchingListings = allListings.filter((listing) => {
    let matchesAnyFilter;

    filteredStrings.forEach((string) => {
      if (listing.textContent.includes(string)) {
        matchesAnyFilter = true;
      };
    });

    return matchesAnyFilter;
  });
  
  matchingListings.forEach((matchingListing) => {
    matchingListing.remove();
    updateCounterElem(filterCount++);
  });
};

function setup() {
  updateCounterElem(0);
  
  const filtersAsString = stringsArrayToList(filteredStrings);
  filtersElem.innerText = "Filtering: " + filtersAsString;
  document.body.appendChild(containerElem);

  const filterOnMutation = new MutationObserver(filterNewListings);
  filterOnMutation.observe(
    document.querySelector(selectors.jobsList),
    {childList: true, subtree: true}
  );
};

if (selectors) {
  getFilters().then((filters) => {
    filteredStrings = filters;
  
    const initOnceReady = new MutationObserver(() => {
      if (document.querySelector(selectors.jobsList)) {
        initOnceReady.disconnect();
        setup();
        filterNewListings();
      };
    });
    initOnceReady.observe(
      document.body,
      {childList: true, subtree: true}
    );
  });
} else {
  const compatibleSiteNames = compatibleSites.map((site) => site.name);
  console.error(`Couldn't find site specs for ${document.URL}, this extension only supports the following sites: ${stringsArrayToList(compatibleSiteNames)}`);
};