// @ts-check

/** Wrapper function for isolating scope, as otherwise extension scripts run in a shared scope (or at least the type-checker thinks that they do) causing some undesirable cross-file variable borrowing/duplicate-flagging */
(async () => {
  /** @typedef {import("../shared/chrome.d.ts").chrome} */
  /** @typedef {import("../shared/settings.d.ts").settings} settingsObj */

  /** @type {{blacklist?: string[], filtered?: string[], settings?: settingsObj}} */
  const storage = await chrome.storage.sync.get([
    "blacklist", "filtered",
    "settings"
  ]);
  if (storage.filtered) { // "filtered" is the previous key used for blacklist storage, feel free to remove this migration code by 2024
    await chrome.storage.sync.set({blacklist: storage.filtered, filtered: null});
    storage.blacklist = structuredClone(storage.filtered);
    delete storage.filtered;
  };

  let blacklist = storage.blacklist ?? [];
  let settings = storage.settings ?? {};

  /** Elements created in JS for JSdoc/TS type-safety (type-safe refactor suggestions welcome, not a fan of the readability consequences) */
  const elems = {
    filterAdditionWrapper: document.createElement("section"),
    textInput: document.createElement("input"),
    saveButton: document.createElement("button"),

    filtersTitle: document.createElement("h1"),
    filtersList: document.createElement("ul"),

    settingsTitle: document.createElement("h2"),
    settingsInputs: {
      hideFilterCountersAtZero: document.createElement("input")
    },
  };

  /** Saves new blacklisted text by input value & adds to list */
  function saveBlacklistItem() {
    const newFilter = elems.textInput.value;
    const blacklistAfterAddition = [...blacklist, newFilter];

    chrome.storage.sync.set({blacklist: blacklistAfterAddition});
    blacklist = blacklistAfterAddition;
    appendBlacklistItemElem(newFilter);
    elems.textInput.value = "";
  };
  elems.saveButton.innerText = "Add";
  elems.saveButton.addEventListener("click", saveBlacklistItem);
  elems.textInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") saveBlacklistItem();
  });

  elems.filterAdditionWrapper.id = "filterAddition";
  elems.filterAdditionWrapper.appendChild(elems.textInput);
  elems.filterAdditionWrapper.appendChild(elems.saveButton);
  elems.filtersTitle.innerText = "Currently Filtering:";

  /**
   * Creates and appends a new blacklist item to the list
   * @param {string} filterText Blacklisted text
   */
  function appendBlacklistItemElem(filterText) {
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
    appendBlacklistItemElem(filterText);
  });

  /**
   * @template {keyof settings} K
   * @param {K} key 
   * @param {settings[K]|false|undefined} value 
   */
  function saveSettingChange(key, value) {
    value ? settings[key] = value : delete settings[key];
    chrome.storage.sync.set({settings});
  };

  elems.settingsTitle.innerText = "Settings:";
  const {hideFilterCountersAtZero} = elems.settingsInputs;

  hideFilterCountersAtZero.type = "checkbox";
  hideFilterCountersAtZero.checked = settings.hideFilterCountersAtZero || false;
  hideFilterCountersAtZero.addEventListener("input", () => {
    saveSettingChange("hideFilterCountersAtZero", Boolean(hideFilterCountersAtZero.checked));
  });

  /** @type {[string, HTMLElement][]} */
  const settingsByLabelAndInput = [
    ["Hide filter counters at zero", hideFilterCountersAtZero]
  ];

  for (const element of [
    elems.filterAdditionWrapper,
    elems.filtersTitle,
    elems.filtersList,
    document.createElement("hr"),
    elems.settingsTitle
  ]) {
    document.body.appendChild(element)
  };
  for (const [label, input] of settingsByLabelAndInput) {
    const wrapper = document.createElement("label");
    wrapper.innerText = label + ": ";
    wrapper.appendChild(input);
    document.body.appendChild(wrapper);
  };
})();