Array.prototype.first = function () {
	return this[0];
};

Array.prototype.lastActiveServiceIdx = function() {
	for(var i = this.length - 1; i != 0; i--){
		if(this[i].status){
			return i + 1;
		}
	}
};

HTMLCollection.prototype.first = function () {
	return this[0];
};

function UpdateUnreadCount() {
	if (DB.queryAll("configs", { query: { title: "UnreadCounter" } }).first().status) {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "https://mail.google.com/mail/feed/atom", true);
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					var xmlDoc = xhr.responseXML;
					var unreadCount = xmlDoc.getElementsByTagName("fullcount").first().innerHTML;

					if (unreadCount > 0) {
						chrome.browserAction.setBadgeText({ text: unreadCount });
					} else {
						chrome.browserAction.setBadgeText({ text: "" });
					}
				}
			}
		};
		xhr.send(null);
	} else {
		chrome.browserAction.setBadgeText({ text: "" });
	}
}

chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
	switch (request.message) {
		case "UpdateUnreadCounter":
			var updateTimer = setInterval(function () {
				UpdateUnreadCount();
			}, 1000);
			setTimeout(function () {
				clearInterval(updateTimer);
			}, 180000);
			break;
	}
});

chrome.runtime.onInstalled.addListener(function (details) {
	switch(details.reason){
		case "install":
			chrome.tabs.create({ url: chrome.extension.getURL('html/options.html') });
			break;

		case "update":
			DB.drop();
			break;
	}
});

chrome.tabs.onUpdated.addListener(function () {
	UpdateUnreadCount();
});

chrome.tabs.onActivated.addListener(function () {
	UpdateUnreadCount();
});

chrome.tabs.onRemoved.addListener(function () {
	UpdateUnreadCount();
});

chrome.tabs.onHighlighted.addListener(function () {
	UpdateUnreadCount();
});

chrome.idle.onStateChanged.addListener(function () {
	UpdateUnreadCount();
});

chrome.windows.onFocusChanged.addListener(function () {
	UpdateUnreadCount();
});

document.addEventListener('DOMContentLoaded', function(){
	UpdateUnreadCount();
});