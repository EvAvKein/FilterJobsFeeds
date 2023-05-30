// @ts-check

/** @typedef {import("../chrome.js").chrome} */

/// 

/**
 * All blacklisted texts
 * @type {string[]}
 */
let filtered = [];

/* CRITICAL: attempt to address the resulting type issues by importing a type override from types.d.ts */
const elems = {
  textInput: document.querySelector("input"),
  saveButton: document.querySelector("button"),
  filtersList: document.querySelector("ul"),
};

/**
 * Retrieves blacklisted texts from the extension's storage
 * @returns {Promise<string[]>}
 */
async function getFilters() { // i'd just chain a "then" after the storage's get function if it was async. according to the docs (as of august 2022), they're planning on eventually making it so 
  return new Promise((resolve) => {
    chrome.storage.sync.get(["filtered"], (storage) => resolve(storage.filtered));
  });
};

/**
 * Creates and appends a new blacklist item to the list
 * @param {string} filterText Blacklisted text
 */
function newFilterListItem(filterText) {
  const filterElem = document.createElement("li");
  const textWrapper = document.createElement("pre"); 
  textWrapper.innerText = filterText;
  filterElem.appendChild(textWrapper);

  const deletionButton = document.createElement("button");
  deletionButton.title = `Delete "${filterText}"`
  deletionButton.innerHTML = '<img src="../assets/trash.svg" alt="Trash icon"/>';
  filterElem.appendChild(deletionButton);

  deletionButton.addEventListener("click", function deleteFilter() {
    const filteredAfterDeletion = filtered.filter((filter) => filter != filterText);

    chrome.storage.sync.set({filtered: filteredAfterDeletion});
    filtered = filteredAfterDeletion;

    deletionButton.removeEventListener("click", deleteFilter);
    filterElem.remove();
  }, {once: true});
  
  elems.filtersList.appendChild(filterElem);
};

/**
 * Saves new blacklisted text by input value & adds to list
 */
function saveFilter() {
  const newFilter = elems.textInput.value;
  const filteredAfterAddition = [...filtered, newFilter];
  
  chrome.storage.sync.set({filtered: filteredAfterAddition});
  filtered = filteredAfterAddition;
  newFilterListItem(newFilter);
  elems.textInput.value = "";
};

getFilters().then((filteredStrings) => {
  if (!filteredStrings) chrome.storage.sync.set({filtered: []});
  filtered = filteredStrings ?? [];
  
  filtered.forEach((filterText) => {
    newFilterListItem(filterText);
  });
  
  elems.saveButton.addEventListener("click", saveFilter);
  
  elems.textInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") saveFilter();
  });
});