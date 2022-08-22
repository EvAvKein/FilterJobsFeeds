let filteredString;
chrome.storage.sync.get(["blacklisted"], (current) => filteredString = current.blacklisted);

const waitPeriod = { // very arbitrary, based on rough testing with a particular device on a particular internet connection
  scrollAllListings: 1000, 
  fetchAndLoadListings: 1250,
  coldVisit: 3000,
};

const listingsPerPage = 25;

function filterListings() {
  const allListings = Array.from(document.querySelectorAll(".job-card-container"));
  if (allListings.length !== listingsPerPage) {
    console.log(`Failed to parse all listings! Found ${allListings.length}/${listingsPerPage}`);
      // i'd log this as an error/warn, but chrome logs these as extension errors instead of writing to console
  };

  const matchingListings = allListings.filter((listing) => {
    return listing.textContent.includes(filteredString);
  });
  
  let removedCount = 0;
  matchingListings.forEach((matchingListing) => {
    matchingListing.remove();
    removedCount++; 
  });

  console.log(
    removedCount
      ? `Removed ${removedCount} "${filteredString}" listing${removedCount > 1 ? "s" : ""}!`
      : `Didn't find a single "${filteredString}" listing on this page :D`
  );
};

function filterAllListings(delayUntilLoaded) {
  setTimeout(async () => {
    document.querySelector("footer").scrollIntoView({behavior: "smooth"});
      // used to have an intersectionObserver with a debounced disconnect to figure out when scrolling was done,
      // but the debounce timer was a magic number and the scroll length doesn't vary much, so i deleted all that unnecessary complexity in favor of one overarching magic number.
      // might switch to some version of the intersectionObserver solution in future, if/when i wanna make this *more* reliable and have a proper (i.e non-magic-number) solution for the debounce
    setTimeout(() => {
      filterListings();
    }, waitPeriod.scrollAllListings);

    const pageButtons = document.querySelectorAll(".jobs-search-results-list__pagination button");
    pageButtons.forEach((pageButton) => {
      pageButton.addEventListener("click", () => filterAllListings(waitPeriod.fetchAndLoadListings));
    });
  }, delayUntilLoaded);
};

filterAllListings(waitPeriod.coldVisit + waitPeriod.fetchAndLoadListings);