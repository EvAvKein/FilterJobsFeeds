const currentFilter = document.querySelector("span");
const textInput = document.querySelector("input");
const saveButton = document.querySelector("button");

function updateCurrentFilterElement() {
  chrome.storage.sync.get(["blacklisted"], (current) => {
    currentFilter.innerText = current.blacklisted;
  });
};

updateCurrentFilterElement();

saveButton.addEventListener("click", () => {
  chrome.storage.sync.set({blacklisted: textInput.value});
  updateCurrentFilterElement();
});