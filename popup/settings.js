// @ts-check

/** @typedef {import("../shared/chrome.d.ts").chrome} */

/** Wrapper function for isolating scope, as otherwise extension scripts run in a shared scope (or at least the type-checker thinks that they do) causing some undesirable cross-file variable borrowing/duplicate-flagging */
(async () => {
  /** @type {{blacklist?: string[], filtered?: string[]}} */
  const storage = await chrome.storage.sync.get(["blacklist", "filtered"]);
  if (storage.filtered) { // "filtered" is the previous key used for blacklist storage, feel free to remove this migration code by 2024
    await chrome.storage.sync.set({blacklist: storage.filtered, filtered: null});
    storage.blacklist = structuredClone(storage.filtered);
    delete storage.filtered;
  };

  let blacklist = storage.blacklist ?? [];

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

    chrome.storage.sync.set({blacklist: blacklistAfterAddition});
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

  for (const element of [elems.filterAdditionWrapper, elems.filtersTitle, elems.filtersList]) {
    document.body.appendChild(element)
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

    deletionButton.addEventListener("click", function deleteBlacklisting() {
      const blacklistAfterDeletion = blacklist.filter((filter) => filter !== filterText);

      chrome.storage.sync.set({blacklist: blacklistAfterDeletion});
      blacklist = blacklistAfterDeletion;

      filterElem.remove();
    }, {once: true});

    elems.filtersList.appendChild(filterElem);
  };
  
  blacklist.forEach((filterText) => {
    createFilterListItem(filterText);
  });
})();