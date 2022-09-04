class SiteData {
  constructor(siteName, jobsListSelector, jobsItemSelector, manualStart) {
    this.name = siteName;
    this.jobsList = jobsListSelector;
    this.jobItem = jobsItemSelector;
    this.manualStart = manualStart; // created due to AngelList throwing a 404 with a bunch of console errors when changing sort/filter options after the filtering mutationObserver is attached. this is not happening with LinkedIn. AngelList uses NextJS, and my best guess is that the incompatibility has something to do with nextJS's SPA mechanisms
  };
};
const compatibleSites = [
  new SiteData("linkedin", ".scaffold-layout__list-container", ".job-card-container", false),
  new SiteData("angel.co", '[data-test="JobSearchResults"]', '[data-test="StartupResult"]', true),
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
  const titleElem = document.createElement("h5");
  const descriptionElem = document.createElement("p");
  containerElem.id = "EAK_JobsFilter";
  containerElem.appendChild(titleElem);
  containerElem.appendChild(descriptionElem);
  document.body.appendChild(containerElem);

  const site = findSiteData();
  if (!site) {
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
    function filterJobs() {
      totalFiltered += filterListings(site.jobItem, filters);
      titleElem.innerText = "Total jobs filtered: " + totalFiltered;
    };

    const initOnceReady = new MutationObserver(() => {
      if (document.querySelector(site.jobsList)) {
        initOnceReady.disconnect();

        const filterOnMutation = new MutationObserver(filterJobs);
        function startFiltering() {
          filterJobs();
          filterOnMutation.observe(
            document.querySelector(site.jobsList),
            {childList: true, subtree: true}
          );
        };

        if (!site.manualStart) {
          startFiltering();
          return;
        };

        const toggleSectionElem = document.createElement("section");
        toggleSectionElem.id = "EAK_toggleSection";
        toggleSectionElem.innerHTML = `
          <hr>
          <h6> Activate once you're ready to browse! </h6>
          <p> Manual activation is required due to conflicts with search/sort functionalities,<br> so first make sure you're done editing those! </p>
        `; // dont need references to any of these, so there's no reason to not use innerHTML. halves the complexity & lines of code

        const toggleButtonElem = document.createElement("button");
        toggleButtonElem.innerText = "ACTIVATE";
        toggleSectionElem.appendChild(toggleButtonElem);

        toggleButtonElem.addEventListener("click", function manualStartFiltering() {
          startFiltering();
          toggleButtonElem.removeEventListener("click", manualStartFiltering);
          toggleSectionElem.remove();
        });

        containerElem.appendChild(toggleSectionElem);
      };
    });
    initOnceReady.observe(
      document.body,
      {childList: true, subtree: true}
    );
  });
};
initialize();