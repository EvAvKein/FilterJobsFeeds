// @ts-check
/// <reference path="../../shared/chrome.d.ts"/>

// Created this minimal window (which is shown when the extension icon is clicked) because:
// 1. Redirecting it to a setting spage by script-clicking the anchor or dispatching a click event doesn't work in Firefox
// 2. I'm avoiding the "tabs" permission (which is needed to include the extension's full functionality in that window) because it has an excessive warning ("Read your browsing history") on Chrome

const anchor = document.createElement("a");
anchor.href = "/settings/settings.html";
anchor.target = "_blank";
anchor.innerText = "Settings";
document.body.appendChild(anchor);
