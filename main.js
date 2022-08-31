let filteredString;
chrome.storage.sync.get(["blacklisted"], (current) => filteredString = current.blacklisted);

const selectors = {
  jobsList: ".scaffold-layout__list-container",
  jobItem: ".job-card-container",
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

let filterCount = 0;
function filterNewListings() {
  const allListings = Array.from(document.querySelectorAll(selectors.jobItem));

  const matchingListings = allListings.filter((listing) => {
    return listing.textContent.includes(filteredString);
  });
  
  matchingListings.forEach((matchingListing) => {
    matchingListing.remove();
    updateCounterElem(filterCount++);
  });
};

function setup() {
  updateCounterElem(0);
  filtersElem.innerText = "Filtering: " + filteredString;
  document.body.appendChild(containerElem);

  const filterOnMutation = new MutationObserver(filterNewListings);
  filterOnMutation.observe(
    document.querySelector(selectors.jobsList),
    {childList: true, subtree: true}
  );
};

const initOnceReady = new MutationObserver(() => {
  if (document.querySelector(selectors.jobsList)) {
    pageReadyObserver.disconnect();
    setup();
    filterNewListings();
  };
});
initOnceReady.observe(
  document.body,
  {childList: true, subtree: true}
);