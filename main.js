class PageData {
  constructor(jobsListSelector, jobItemSelector, manualStart) {
    this.jobsList = jobsListSelector;
    this.jobItem = jobItemSelector;
    this.manualStart = manualStart; // created due to AngelList throwing a 404 with a bunch of console errors when changing sort/filter options after the filtering mutationObserver is attached. this is not happening with LinkedIn. AngelList uses NextJS, and my best guess is that the incompatibility has something to do with nextJS's SPA mechanisms
  };
};

class SiteData {
  constructor(siteName, pagesDataArray) {
    this.name = siteName;
    this.pages = pagesDataArray; // created due to both LinkedIn & AngelList (and likely more) having differently-attributed elements for logged-out and logged-out job browsing. didn't do explicit "logged in" & "logged out" URL-based setups because AngelList uses for the exact same URL for both pages
  };
};
const compatibleSites = [
  new SiteData("linkedin", [
    new PageData(".jobs-search__results-list", ".job-search-card"),
    new PageData(".scaffold-layout__list-container", ".job-card-container"),
  ]),
  new SiteData("angel.co", [
    new PageData(".styles_results__ZQhDf", ".styles_result__rPRNG"), // this page just has some listings from a few popular companies before prompting the user to register, but i'm supporting it on principle. also, wont be surprised if these class suffixes end up changing when they recompile for an update
    new PageData('[data-test="JobSearchResults"]', '[data-test="StartupResult"]', true),
  ]),
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

function lookForPageData(siteData) {
  let data;
  for (const pageData of siteData.pages) {
    if (document.querySelector(pageData.jobsList)) {
      data = pageData;
      break;
    };
  };
  return data;
};

async function findPageData(siteData) { // because some pages' body loads slowly enough (e.g AngelList's logged-out jobs page) that checking page elements right as it loads will be premature
  let data;
  for (let i = 0; i < 10; i++) {
    data = lookForPageData(siteData);
    if (data) break; 
    await new Promise(resolve => setTimeout(resolve, 250));
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

  const siteData = findSiteData();
  if (!siteData) {
    titleElem.innerText = "Error: Failed to load specs for this site";
    descriptionElem.innerHTML = 'Please report this at <a href="https://github.com/EvAvKein/FilterJobsFeeds/issues/new">the extension support page</a> (with the page URL)';
    return;
  };

  getFilters().then((filters) => {
    if (!filters?.length) {
      titleElem.innerText = "No filters added!";
      descriptionElem.innerText = "Edit your filters in the extension settings";
      return;
    };
    
    let totalFiltered = 0;
    function filterJobs(pageData) {
      totalFiltered += filterListings(pageData.jobItem, filters);
      titleElem.innerText = "Total jobs filtered: " + totalFiltered;
    };

    const initOnceReady = new MutationObserver(async () => {
      initOnceReady.disconnect();

      titleElem.innerText = "Searching for page specs...";
      descriptionElem.innerText = "";

      const pageData = await findPageData(siteData);
      if (!pageData) {
        titleElem.innerText = "Error: Failed to load specs for this page";
        descriptionElem.innerHTML = 'Try refreshing the page, and if this error remains please report this at <a href="https://github.com/EvAvKein/FilterJobsFeeds/issues/new">the extension support page</a> (with the page URL & a screenshot)';
        return;
      };

      titleElem.innerText = "";
      descriptionElem.innerText = "Filtering: " + stringsArrayToList(filters);

      const filterOnMutation = new MutationObserver(() => {filterJobs(pageData)});
      function startFiltering() {
        filterJobs(pageData);
        filterOnMutation.observe(
          document.querySelector(pageData.jobsList),
          {childList: true, subtree: true}
        );
      };

      if (!pageData.manualStart) {
        startFiltering();
        return;
      };

      const toggleSectionElem = document.createElement("section");
      toggleSectionElem.id = "EAK_toggleSection";
      toggleSectionElem.innerHTML = `
        <hr>
        <h6> Activate once you're ready to browse! </h6>
        <p> Manual activation is required due to conflicts with search/sort functionalities,<br> so first make sure you're done editing those! </p>
      `; // dont need references to any of these, so there's no reason to not use innerHTML. it halves the complexity & lines of code in this case

      const toggleButtonElem = document.createElement("button");
      toggleButtonElem.innerText = "ACTIVATE";
      toggleSectionElem.appendChild(toggleButtonElem);

      toggleButtonElem.addEventListener("click", function manualStartFiltering() {
        startFiltering();
        toggleButtonElem.removeEventListener("click", manualStartFiltering);
        toggleSectionElem.remove();
      });

      containerElem.appendChild(toggleSectionElem);
    });
    initOnceReady.observe(
      document.body,
      {childList: true, subtree: true}
    );
  });
};
initialize();