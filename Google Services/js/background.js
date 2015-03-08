function ContextMenu() {
	chrome.storage.local.get({
		"context" : ["contextTranslate", "contextShortener"],
		"language" : "en"
	}, function (items) {
		if (items.context != null && items.context.length > 0) {
			chrome.contextMenus.removeAll();
			chrome.contextMenus.create({
				id : 'parent',
				title : 'Google Services',
				contexts : ['all']
			});

			for (var i = 0; i < items.context.length; i++) {
				switch (items.context[i]) {
				case "contextTranslate":
					chrome.contextMenus.create({
						parentId : 'parent',
						id : 'translate',
						title : 'Google Translate',
						contexts : ['all'],
						onclick : function (info) {
							if (info.menuItemId == "translate") {
								if (info.selectionText != null) {
									var text = info.selectionText.replace(/ /g, '%20');
									chrome.tabs.create({
										'url' : 'https://translate.google.com/#auto/' + items.language + '/' + text
									});
								} else {
									chrome.tabs.create({
										'url' : 'https://translate.google.com'
									});
								}
							}
						}
					});
					break;

				case "contextShortener":
					chrome.contextMenus.create({
						parentId : 'parent',
						id : 'url',
						title : 'Url Shortener',
						contexts : ['all'],
						onclick : function (info) {
							if (info.menuItemId == "url") {
								Url();
							}
						}
					});
					break;
				}
			}
		}
	});
}
//
var mailUrl;

function isMailUrl(url) {
	return url.indexOf(mailUrl) == 0;
}

function Mail() {
	chrome.tabs.getAllInWindow(null, function (tabs) {
		for (var i = 0; i < tabs.length; i++) {
			if (tabs[i].url && isMailUrl(tabs[i].url)) {
				chrome.tabs.update(tabs[i].id, {
					selected : true
				});
				return;
			}
		}
		chrome.tabs.create({
			url : mailUrl
		});
	});
}

function Url() {
	chrome.tabs.getSelected(null, function (tab) {
		chrome.storage.local.get({
			"shortUrl" : null,
			"longUrl" : null
		}, function (items) {
			if (tab.url == items.longUrl) {
				copyTextToClipboard(items.shortUrl);
			} else {
				GetShortUrl(tab.url);
			}
		});
	});
}

// TODO:
chrome.extension.onMessage.addListener(
	function (request, sender, send_response) {
	var updateTimer = setInterval(function () {
			updateUnreadCount();
		}, 2000);
	setTimeout(function () {
		clearInterval(updateTimer);
	}, 300000);
});

function updateUnreadCount() {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "https://mail.google.com/mail/feed/atom", true);
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				var xmlDoc = xhr.responseXML;
				var unreadCount = xmlDoc.getElementsByTagName("fullcount")[0].innerHTML;

				if (unreadCount > 0) {
					chrome.browserAction.setBadgeText({
						text : unreadCount
					});
					try {
						document.getElementById("unreadCount").innerHTML = "(" + unreadCount + ")";
					} catch (e) {}
					xhr.abort();
				} else {
					chrome.browserAction.setBadgeText({
						text : ""
					});
					try {
						document.getElementById("unreadCount").innerHTML = "";
					} catch (e) {}
					xhr.abort();
				}
			} else {
				xhr.abort();
			}
		}
	}
	xhr.send(null);
}

function copyTextToClipboard(text) {
	var copyFrom = document.createElement("textarea");
	copyFrom.textContent = text;
	var body = document.getElementsByTagName('body')[0];
	body.appendChild(copyFrom);
	copyFrom.select();
	document.execCommand('copy');
	body.removeChild(copyFrom);

	chrome.notifications.create("true", {
		type : "basic",
		title : "Google Services",
		message : "Short Url copied to clipboard",
		iconUrl : "../icons/64x64.png"
	}, function () {
		setTimeout(function () {
			chrome.notifications.clear("true", function () {});
		}, 1300);
	});
}

function GetShortUrl(longUrl) {
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "https://www.googleapis.com/urlshortener/v1/url", true);
	xhr.setRequestHeader("Content-Type", "application/JSON");
	xhr.send(JSON.stringify({
			longUrl : longUrl
		}));
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				var shortUrl = JSON.parse(xhr.responseText).id;

				chrome.storage.local.set({
					shortUrl : shortUrl,
					longUrl : longUrl
				}, function () {
					copyTextToClipboard(shortUrl);
				});

				xhr.abort();
			} else {
				xhr.abort();

				chrome.notifications.create("false", {
					type : "basic",
					title : "Google Services",
					message : "Can't short this Url",
					iconUrl : "../icons/64x64.png"
				}, function () {
					setTimeout(function () {
						chrome.notifications.clear("false", function () {});
					}, 1400);
				});
			}
		}
	}
}

// TODO:
if (chrome.runtime && chrome.runtime.onStartup) {
	chrome.runtime.onStartup.addListener(function () {
		setInterval(updateUnreadCount, 60000);
		ContextMenu();
	});
} else {
	chrome.windows.onCreated.addListener(function () {
		setInterval(updateUnreadCount, 60000);
		ContextMenu();
	});
}

document.addEventListener('DOMContentLoaded', updateUnreadCount);

chrome.runtime.onInstalled.addListener(function (details) {
	if (details.reason == "install") {
		chrome.tabs.create({
			'url' : chrome.extension.getURL('html/options.html')
		});
		ContextMenu();
	} else if (details.reason == "update") {
		ContextMenu();
	}
});
