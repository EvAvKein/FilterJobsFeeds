// @ts-check
/// <reference path="../shared/chrome.d.ts"/>

/** Wrapper function for isolating scope, as otherwise extension scripts run in a shared scope (or at least the type-checker thinks that they do) causing some undesirable cross-file variable borrowing/duplicate-flagging */
(async () => {
  /** @typedef {import("../shared/settings.d.ts").settings} settingsObj */

  /** @type {{blacklist?: string[], filtered?: string[], settings?: settingsObj}} */
  const storage = await chrome.storage.sync.get([
    "blacklist",
    "filtered",
    "settings",
  ]);
  if (storage.filtered) {
    // "filtered" is the previous key used for blacklist storage, feel free to remove this migration code by 2024
    await chrome.storage.sync.set({
      blacklist: storage.filtered,
      filtered: null,
    });
    storage.blacklist = structuredClone(storage.filtered);
    delete storage.filtered;
  }

  let blacklist = storage.blacklist ?? [];
  let settings = storage.settings ?? {};

  /** Elements created in JS for JSdoc/TS type-safety (type-safe refactor suggestions welcome, not a fan of the readability consequences) */
  const elems = {
    pageWrapper: document.createElement("div"),

    blacklistedAdditionWrapper: document.createElement("section"),
    textInput: document.createElement("input"),
    saveButton: document.createElement("button"),

    blacklistTitle: document.createElement("h1"),
    blacklistList: document.createElement("ul"),

    blacklistFileLoadWrapper: document.createElement("section"),
    exportBlacklistButton: document.createElement("button"),
    importBlacklistInput: document.createElement("input"),
    importBlacklistLabel: document.createElement("label"), // exists because input[type="file"] can't be styled much

    settingsWrapper: document.createElement("section"),
    settingsTitle: document.createElement("h2"),
    settingsInputs: {
      hideFilterCountersAtZero: document.createElement("input"),
    },
  };

  /** Saves new blacklisted text by input value & adds to list */
  function saveBlacklistItem() {
    const newBlacklisted = elems.textInput.value;
    const blacklistAfterAddition = [...blacklist, newBlacklisted];

    chrome.storage.sync.set({ blacklist: blacklistAfterAddition });
    blacklist = blacklistAfterAddition;
    appendBlacklistedElem(newBlacklisted);
    elems.textInput.value = "";
  }
  elems.saveButton.innerText = "Add";
  elems.saveButton.addEventListener("click", saveBlacklistItem);
  elems.textInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") saveBlacklistItem();
  });

  elems.blacklistedAdditionWrapper.id = "filterAddition";
  elems.blacklistedAdditionWrapper.appendChild(elems.textInput);
  elems.blacklistedAdditionWrapper.appendChild(elems.saveButton);
  elems.blacklistTitle.innerText = "Currently Filtering:";

  /**
   * Creates and appends a new blacklist item to the list
   * @param {string} blacklistedText Blacklisted text
   */
  function appendBlacklistedElem(blacklistedText) {
    const blacklistedElem = document.createElement("li");
    const textWrapper = document.createElement("pre");
    textWrapper.innerText = blacklistedText;
    blacklistedElem.appendChild(textWrapper);

    const deletionButton = document.createElement("button");
    deletionButton.className = "imageButton";
    deletionButton.title = `Delete "${blacklistedText}"`;
    deletionButton.innerHTML =
      '<img src="../assets/trash.svg" alt="Trash icon"/>';
    blacklistedElem.appendChild(deletionButton);

    deletionButton.addEventListener(
      "click",
      function deleteBlacklisting() {
        const blacklistAfterDeletion = blacklist.filter(
          (blacklisted) => blacklisted !== blacklistedText
        );

        chrome.storage.sync.set({ blacklist: blacklistAfterDeletion });
        blacklist = blacklistAfterDeletion;

        blacklistedElem.remove();
      },
      { once: true }
    );

    elems.blacklistList.appendChild(blacklistedElem);
  }
  blacklist.forEach((blacklistedText) => {
    appendBlacklistedElem(blacklistedText);
  });

  elems.blacklistFileLoadWrapper.id = "fileLoadWrapper";
  [elems.exportBlacklistButton, elems.importBlacklistLabel].forEach(
    (elem, index) => {
      const actionName = !index ? "export" : "import";
      const capitalizedName = actionName[0].toUpperCase() + actionName.slice(1);

      elem.className = "imageButton";
      elem.title = capitalizedName + " blacklist";
      elem.innerHTML = `
      <img
        src="../assets/${actionName}.svg"
        alt="${capitalizedName} icon"
      />
    `;
      elems.blacklistFileLoadWrapper.appendChild(elem);
    }
  );

  elems.importBlacklistInput.type = "file";
  elems.importBlacklistInput.accept = ".json,text/*";
  elems.importBlacklistInput.id = "blacklistImport";
  elems.importBlacklistLabel.setAttribute("for", "blacklistImport");
  elems.importBlacklistLabel.appendChild(elems.importBlacklistInput);
  elems.importBlacklistInput.addEventListener("change", async () => {
    if (!elems.importBlacklistInput.files) return;

    const [file] = elems.importBlacklistInput.files;
    /** @type {blacklist | undefined} */
    let importedBlacklist;

    try {
      importedBlacklist = await JSON.parse(await file.text());
    } catch {
      alert("Invalid file format (not JSON)");
      return;
    }

    if (
      !Array.isArray(importedBlacklist) ||
      !importedBlacklist.every((item) => typeof item === "string")
    ) {
      alert("Invalid blacklist content (not array of strings)");
      return;
    }

    chrome.storage.sync.set({ blacklist: importedBlacklist });
    blacklist = importedBlacklist;
    for (let prevElem of elems.blacklistList.children) {
      prevElem.remove();
    }
    importedBlacklist.forEach((blacklistedText) => {
      appendBlacklistedElem(blacklistedText);
    });
  });

  elems.exportBlacklistButton.addEventListener("click", async () => {
    const dlAnchor = document.createElement("a");
    dlAnchor.setAttribute(
      "href",
      "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(blacklist))
    );
    dlAnchor.setAttribute("download", "blacklist.json");
    document.body.appendChild(dlAnchor); // required for firefox
    dlAnchor.click();
    dlAnchor.remove();
  });

  /**
   * @template {keyof settings} K
   * @param {K} key
   * @param {settings[K]|false|undefined} value
   */
  function saveSettingChange(key, value) {
    value ? (settings[key] = value) : delete settings[key];
    chrome.storage.sync.set({ settings });
  }

  elems.settingsTitle.innerText = "Settings:";
  elems.settingsWrapper.appendChild(elems.settingsTitle);
  const { hideFilterCountersAtZero } = elems.settingsInputs;

  hideFilterCountersAtZero.type = "checkbox";
  hideFilterCountersAtZero.checked = settings.hideFilterCountersAtZero || false;
  hideFilterCountersAtZero.addEventListener("input", () => {
    saveSettingChange(
      "hideFilterCountersAtZero",
      Boolean(hideFilterCountersAtZero.checked)
    );
  });

  /** @type {[string, HTMLElement][]} */
  const settingsByLabelAndInput = [
    ["Hide filter counters at zero", hideFilterCountersAtZero],
  ];
  for (const [label, input] of settingsByLabelAndInput) {
    const wrapper = document.createElement("label");
    wrapper.innerText = label + ": ";
    wrapper.appendChild(input);
    elems.settingsWrapper.appendChild(wrapper);
  }

  for (const element of [
    elems.blacklistedAdditionWrapper,
    elems.blacklistTitle,
    elems.blacklistList,
    elems.blacklistFileLoadWrapper,
    document.createElement("hr"),
    elems.settingsWrapper,
  ]) {
    elems.pageWrapper.appendChild(element);
  }
  document.body.appendChild(elems.pageWrapper);
})();
