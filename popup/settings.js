// @ts-check

/** @typedef {import("../shared/chrome.d.ts").chrome} */

/** Wrapper function for isolating scope, as otherwise extension scripts run in a shared scope (or at least the type-checker thinks that they do) causing some undesirable cross-file variable borrowing/duplicate-flagging */
(async () => {
  /** @type {string[]} */
  let blacklist = [];

  /** Elements created in JS for JSdoc/TS type-safety (type-safe refactor suggestions welcome, not a fan of the readability consequences) */
  const elems = {
    filterAdditionWrapper: document.createElement("section"),
    textInput: document.createElement("input"),
    saveButton: document.createElement("button"),

    filtersTitle: document.createElement("h1"),
    filtersList: document.createElement("ul"),
  };

  /** Saves new blacklisted text by input value & adds to list */
  function saveFilter() {
    const newFilter = elems.textInput.value;
    const blacklistAfterAddition = [...blacklist, newFilter];

    chrome.storage.sync.set({filtered: blacklistAfterAddition});
    blacklist = blacklistAfterAddition;
    createFilterListItem(newFilter);
    elems.textInput.value = "";
  }
  elems.saveButton.innerText = "Add";
  elems.saveButton.addEventListener("click", saveFilter);
  elems.textInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") saveFilter();
  });

  elems.filterAdditionWrapper.id = "filterAddition";
  elems.filterAdditionWrapper.appendChild(elems.textInput);
  elems.filterAdditionWrapper.appendChild(elems.saveButton);

  elems.filtersTitle.innerText = "Currently Filtering:";
  document.body.appendChild(elems.filterAdditionWrapper);
  document.body.appendChild(elems.filtersTitle);
  document.body.appendChild(elems.filtersList);

  /**
   * Retrieves blacklisted texts from the extension's storage, or provides empty array if no blacklist exists
   * @returns {Promise<string[]>}
   */
  async function getFilters() {
    // function is copy-pasted from main.js, because using modules in chrome extensions seemingly requires either wacky code or a service-worker (the latter introducing another point of failure and just seeming excessive)
    return (await chrome.storage.sync.get(["filtered"])).filtered ?? [];
  };

  /**
   * Creates and appends a new blacklist item to the list
   * @param {string} filterText Blacklisted text
   */
  function createFilterListItem(filterText) {
    const filterElem = document.createElement("li");
    const textWrapper = document.createElement("pre"); 
    textWrapper.innerText = filterText;
    filterElem.appendChild(textWrapper);

    const deletionButton = document.createElement("button");
    deletionButton.title = `Delete "${filterText}"`
    deletionButton.innerHTML = '<img src="../assets/trash.svg" alt="Trash icon"/>';
    filterElem.appendChild(deletionButton);

    deletionButton.addEventListener("click", function deleteFilter() {
      const blacklistAfterDeletion = blacklist.filter((filter) => filter != filterText);

      chrome.storage.sync.set({filtered: blacklistAfterDeletion});
      blacklist = blacklistAfterDeletion;

      filterElem.remove();
    }, {once: true});

    elems.filtersList.appendChild(filterElem);
  };

  getFilters()
    .then((storedBlacklist) => {
      storedBlacklist
        ? blacklist = storedBlacklist
        : chrome.storage.sync.set({filtered: []});

      blacklist.forEach((filterText) => {
        createFilterListItem(filterText);
      });
    });
})();