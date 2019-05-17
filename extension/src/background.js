import './helpers/prototypes';
import {initializeData, resetData} from "./helpers/initialize-storage-data";
import {refreshBadgeVisibility, storage, updateUnreadCounter} from "./helpers";

// set up listeners
storage.onChange(changes => {
    if (changes.hasOwnProperty('showBadge')) {
        refreshBadgeVisibility(changes.showBadge.newValue);
    }
});

chrome.extension.onMessage.addListener(request => {
    if (request.message === 'UpdateUnreadCounter') {
        updateUnreadCounter();
    }
});

chrome.runtime.onInstalled.addListener(async details => {
    switch (details.reason) {
        case "install":
            await initializeData();
            chrome.tabs.create({url: chrome.extension.getURL('html/options.html')});
            break;

        case "update":
            await resetData();
            break;
    }
});

chrome.tabs.onUpdated.addListener(updateUnreadCounter);
chrome.tabs.onActivated.addListener(updateUnreadCounter);
chrome.tabs.onRemoved.addListener(updateUnreadCounter);
chrome.tabs.onHighlighted.addListener(updateUnreadCounter);
chrome.idle.onStateChanged.addListener(updateUnreadCounter);
chrome.windows.onFocusChanged.addListener(updateUnreadCounter);

document.addEventListener('DOMContentLoaded', updateUnreadCounter);
