function CreateTabWithURL(url){
	chrome.tabs.create({
		url: url
	});
}

function UpdateBadge(text){
	chrome.browserAction.setBadgeText({
		text: text
	});
}

function InitContextMenu() {
	chrome.storage.local.get({
		"urlShortenerService": UrlShortener
	}, function (items) {
		UrlShortener = items.urlShortenerService;

		chrome.contextMenus.removeAll();

		if (UrlShortener.ACTIVE) {
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
	});
}

chrome.contextMenus.onClicked.addListener(function (info, tab) {
	switch (info.menuItemId) {
		case "url":
			Url();
			break;
	}
});

function Mail() {
	chrome.tabs.query({}, function (tabs) {
		for (var i = 0; i < tabs.length; i++) {
			if (tabs[i].url && tabs[i].url.indexOf(MailService.URL) == 0) {
				chrome.tabs.update(tabs[i].id, {
					highlighted: true
				});
				return;
			}
		}
		CreateTabWithURL(MailService.URL);
	});
}

function Url() {
	chrome.tabs.query({
		'active': true,
		'currentWindow': true
	}, function (tabs) {
		chrome.storage.local.get({
			"shortUrl": null,
			"longUrl": null
		}, function (items) {
			if (tabs[0].url == items.longUrl) {
				copyTextToClipboard(items.shortUrl);
			} else {
				GetShortUrl(tabs[0].url);
			}
		});
	});
}

function UpdateUnreadCount() {
	chrome.storage.local.get({
		"mailService": MailService
	}, function (items) {
		MailService = items.mailService;

		if (MailService.ACTIVE) {
			var xhr = new XMLHttpRequest();
			xhr.open("GET", "https://mail.google.com/mail/feed/atom", true);
			xhr.onreadystatechange = function () {
				if (xhr.readyState == 4) {
					if (xhr.status == 200) {
						var xmlDoc = xhr.responseXML;
						var unreadCount = xmlDoc.getElementsByTagName("fullcount")[0].innerHTML;

						if (unreadCount > 0) {
							UpdateBadge(unreadCount);
						} else {
							UpdateBadge("");
						}
					}
				}
			};
			xhr.send(null);
		} else {
			UpdateBadge("");
		}
	});
}

function CopyTextToClipboard(text) {
	var copyFrom = document.createElement("textarea");
	copyFrom.textContent = text;
	var body = document.getElementsByTagName('body')[0];
	body.appendChild(copyFrom);
	copyFrom.select();
	document.execCommand('copy');
	body.removeChild(copyFrom);

	ShowNotification("msg", "Short Url copied to clipboard", "../img/notificationUrl.png", 1500);
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
					CopyTextToClipboard(shortUrl);
				});
			} else {
				ShowNotification("msg", "Can't short this Url", "../img/notificationUrl.png", 1500);
			}
		}
	};
	xhr.send(JSON.stringify({
		"longUrl": longUrl
	}));
}

function ShowNotification(id, message, iconPath, closeTime) {
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
	switch(details.reason){
		case "install":
		case "update":
			CreateTabWithURL(chrome.extension.getURL('html/options.html'));
			break;
	}

	InitContextMenu();
});

chrome.tabs.onUpdated.addListener(function (id, info, tab) {
	InitContextMenu();
	UpdateUnreadCount();
});

chrome.tabs.onActivated.addListener(function () {
	InitContextMenu();
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
