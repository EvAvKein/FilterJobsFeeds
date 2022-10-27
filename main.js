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

async function findPageData(siteData) { // because some pages' body loads slowly enough (e.g AngelList's logged-out jobs page) that checking page elements right as the page loads would be premature
  let data;
  for (let i = 0; i < 10; i++) {
    data = lookForPageData(siteData);
    if (data) break; 
    await new Promise(resolve => setTimeout(resolve, 250));
  };
  return data;
};

function filtersToListElem(filters) {
  const ul = document.createElement("ul");
  filters.forEach((filter) => {
    const li = document.createElement("li");
    li.innerText = filter.string + ": " + filter.removedCount;
    ul.appendChild(li);
  });
  return ul;
};

async function getFilters() {
  // function is copy-pasted from settings.js, because using modules in chrome extensions seemingly requires either wacky code or a service-worker (the latter introducing another point of failure and just seeming excessive)
  // also, see that file for context about the function
  return new Promise((resolve) => {
    chrome.storage.sync.get(["filtered"], (storage) => resolve(storage.filtered));
  });
};

function initialize() {
  const detailsElem = document.createElement("details")
  const summaryElem = document.createElement("summary");
  const descriptionElem = document.createElement("p");
  const placeholderFilterListElem = document.createElement("ul");
  detailsElem.appendChild(summaryElem);
  detailsElem.appendChild(descriptionElem);
  detailsElem.appendChild(placeholderFilterListElem);
  detailsElem.id = "EAK_JobsFilter";
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
      return {string: filter, removedCount: 0}
    });

    function filterListings(pageData) {
      const allListings = Array.from(document.querySelectorAll(pageData.jobItem));
    
      allListings.forEach((listingElem) => {
        try { // would just use a for-of loop and "break" instead of "throw", but it doesn't seem possible for an array of objects while also recieving the index param (but please commit a refactor if i'm wrong)
          filters.forEach((filter, index) => {
            if (listingElem.textContent.includes(filter.string)) {
              listingElem.remove();
  
              totalFiltered++;
              filters[index].removedCount++;
              throw true;
            };
          });
        } catch {}
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

      const filterOnMutation = new MutationObserver(() => {filterListings(pageData)});
      function startFiltering() {
        descriptionElem.remove();
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
      }, {once: true});
    });

    initOnceReady.observe(document.body, {childList: true, subtree: true});
  });
};
initialize();