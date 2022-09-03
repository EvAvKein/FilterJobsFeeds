let filtered = [];

const elems = {
  textInput: document.querySelector("input"),
  saveButton: document.querySelector("button"),
  filtersList: document.querySelector("ul"),
};

async function getFilters() { // i'd just chain a "then" after the storage's get function if it was async. according to the docs (as of august 2022), they're planning on eventually making it so 
  return new Promise((resolve) => {
    chrome.storage.sync.get(["filtered"], (storage) => resolve(storage.filtered));
  });
};

function newFilterListItem(filterText) {
  const filterElem = document.createElement("li");
  filterElem.innerText = filterText;

  const deletionButton = document.createElement("button");
  deletionButton.innerText = "Delete";
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