import db from './helpers/db.js';
import './helpers/prototypes';
import {refreshBadgeVisibility, updateUnreadCounter} from "./helpers";



chrome.extension.onMessage.addListener(function (request) {
	console.info('message', request.message, request);
	if (request.message === 'UpdateUnreadCounter') {
		updateUnreadCounter();
	} else if (request.message === 'refreshBadgeVisibility') {
		refreshBadgeVisibility();
	}
});

chrome.runtime.onInstalled.addListener(function (details) {
	switch (details.reason) {
		case "install":
			chrome.tabs.create({ url: chrome.extension.getURL('html/options.html') });
			break;

		case "update":
			db.resetDB();
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
