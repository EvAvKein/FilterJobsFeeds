// @ts-check
/// <reference path="../../shared/chrome.d.ts"/>

const anchor = document.createElement("a");
anchor.href = "/settings/settings.html";
anchor.target = "_blank";
anchor.innerText = "Settings";
document.body.appendChild(anchor);
// script-clicking the anchor or dispatching the event doesn't work in firefox, and i'm avoiding the "tabs" permission because it has an excessive warning ("Read your browsing history") on chrome
