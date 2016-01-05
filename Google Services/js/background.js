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

function UpdateContextMenu() {
	chrome.contextMenus.removeAll();

	if (DB.queryAll("configs", { query: { title: "UrlShortener" }}).first().status) {
		var ctx = ["all", "page", "frame", "selection", "link", "editable", "image", "video", "audio"];

		chrome.contextMenus.create({
			id: 'parent',
			title: 'Google Services',
			contexts: ctx
		});

		chrome.contextMenus.create({
			parentId: 'parent',
			id: 'url',
			title: 'Url Shortener',
			contexts: ctx
		});
	}
}

chrome.contextMenus.onClicked.addListener(function (info, tab) {
	switch (info.menuItemId) {
		case "url":
			Url();
			break;
	}
});

function Mail() {
	var mailURL = DB.queryAll("mailServices", { query: { status: true } }).first().url;

	chrome.tabs.query({}, function (tabs) {
		for (var i = 0; i < tabs.length; i++) {
			if (tabs[i].url && (tabs[i].url.indexOf(mailURL) == 0)) {
				chrome.tabs.update(tabs[i].id, { highlighted: true });
				return;
			}
		}
		chrome.tabs.create({ url: mailURL });
	});
}

function Url() {
	chrome.tabs.query({
		active: true,
		currentWindow: true
	}, function (tabs) {
		chrome.storage.local.get({
			shortUrl: null,
			longUrl: null
		}, function (items) {
			if (tabs.first().url == items.longUrl) {
				copyTextToClipboard(items.shortUrl);
			} else {
				GetShortUrl(tabs.first().url);
			}
		});
	});
}

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

function copyTextToClipboard(text) {
	var copyFrom = document.createElement("textarea");
	copyFrom.textContent = text;
	var body = document.getElementsByTagName("body").first();
	body.appendChild(copyFrom);
	copyFrom.select();
	document.execCommand("copy");
	body.removeChild(copyFrom);

	Notification("msg", "Short Url copied to clipboard", "../img/notificationUrl.png", 1500);
}

function GetShortUrl(longUrl) {
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyBycyrWVXU6BCZ1-JC_XFKi1e1bbCifIYk", true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				var shortUrl = JSON.parse(xhr.responseText).id;

				chrome.storage.local.set({
					shortUrl: shortUrl,
					longUrl: longUrl
				}, function () {
					copyTextToClipboard(shortUrl);
				});
			} else {
				Notification("msg", "Can't short this Url", "../img/notificationUrl.png", 1500);
			}
		}
	};
	xhr.send(JSON.stringify({ longUrl: longUrl }));
}

function Notification(id, message, iconPath, closeTime) {
	chrome.notifications.create(id, {
		type: "basic",
		title: "Google Services",
		message: message,
		iconUrl: iconPath
	}, function () {
		setTimeout(function () {
			chrome.notifications.clear(id, function () { });
		}, closeTime);
	});
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
	if (details.reason == "install") {
		InitializeDB();
		chrome.tabs.create({
			url: "http://mazillka.in.ua/donate/"
		});
		chrome.tabs.create({
			url: chrome.extension.getURL('html/options.html')
		});
	} else if (details.reason == "update") {
		UpdateDB();
		chrome.tabs.create({
			url: "http://mazillka.in.ua/donate/"
		});
		chrome.tabs.create({
			url: chrome.extension.getURL('html/options.html')
		});
	}
	UpdateContextMenu();
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

document.addEventListener('DOMContentLoaded', UpdateUnreadCount);

chrome.commands.onCommand.addListener(function (command) {
	switch (command) {
		case "Url Shortener":
			Url();
			break;
	}
});
