import db from './db.js';

Array.prototype.first = function () {
	return this[0];
};

HTMLCollection.prototype.first = function () {
	return this[0];
};

function UpdateUnreadCount() {
	if (db.queryAll("configs", { query: { title: "UnreadCounter" } }).first().status) {
		fetch('https://mail.google.com/mail/feed/atom')
			.then(res => res.text())
			.then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
			.then((xmlDoc) => {
				const unreadString = xmlDoc.getElementsByTagName("fullcount").first().textContent;
				const unreadNumber = Number(unreadString);
				SetBadgeText(!Number.isNaN(unreadNumber) && unreadNumber > 0 ? unreadString : '');
			});
	} else {
		SetBadgeText('');
	}
}

function SetBadgeText(text) {
	chrome.browserAction.setBadgeText({ text });
}

chrome.extension.onMessage.addListener(function (request) {
	if (request.message === 'UpdateUnreadCounter') {
		// TODO: update this to use throttling and check if interval is already in calling updates
		const updateTimer = setInterval(UpdateUnreadCount, 1000);
		setTimeout(() => clearInterval(updateTimer), 180000);
	}
});

chrome.runtime.onInstalled.addListener(function (details) {
	switch (details.reason) {
		case "install":
			chrome.tabs.create({ url: chrome.extension.getURL('html/options.html') });
			break;

		case "update":
			// TODO: update to not drop db, but restore default values
			// db.drop();
			break;
	}
});

chrome.tabs.onUpdated.addListener(UpdateUnreadCount);
chrome.tabs.onActivated.addListener(UpdateUnreadCount);
chrome.tabs.onRemoved.addListener(UpdateUnreadCount);
chrome.tabs.onHighlighted.addListener(UpdateUnreadCount);
chrome.idle.onStateChanged.addListener(UpdateUnreadCount);
chrome.windows.onFocusChanged.addListener(UpdateUnreadCount);

document.addEventListener('DOMContentLoaded', UpdateUnreadCount);
