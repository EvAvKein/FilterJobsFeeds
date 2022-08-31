let filteredString;
chrome.storage.sync.get(["blacklisted"], (current) => filteredString = current.blacklisted);

const waitForColdVisit = 2500; // very arbitrary, based on rough testing with a particular device on a particular internet connection

function filterNewListings() { // 
  const allListings = Array.from(document.querySelectorAll(".job-card-container"));

  const matchingListings = allListings.filter((listing) => {
    return listing.textContent.includes(filteredString);
  });
  
  let removedCount = 0;
  matchingListings.forEach((matchingListing) => {
    matchingListing.remove();
    removedCount++; 
  });

  if (removedCount) {
    console.log(`Removed ${removedCount} "${filteredString}" listing${removedCount > 1 ? "s" : ""}!`)
  };
};

function setup() {
  const filterOnMutation = new MutationObserver(filterNewListings);
  filterOnMutation.observe(
    document.querySelector(".scaffold-layout__list-container"),
    {childList: true, subtree: true}
  );
};

setTimeout(() => {
  setup()
  filterNewListings();
}, waitForColdVisit);