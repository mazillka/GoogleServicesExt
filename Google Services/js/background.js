var mailUrl;
var translateLink;

function isMailUrl(url) {
	return url.indexOf(mailUrl) == 0;
}

function ContextMenu() {
	chrome.storage.local.get({
		"context" : ["contextTranslate", "contextShortener"]
	}, function (items) {
		chrome.contextMenus.removeAll();
		if (items.context != null && items.context.length > 0) {
			var ctx = ["all", "page", "frame", "selection", "link", "editable", "image", "video", "audio"];
			chrome.contextMenus.create({
				id : 'parent',
				title : 'Google Services',
				contexts : ctx
			});

			for (var i = 0; i < items.context.length; i++) {
				switch (items.context[i]) {
				case "contextTranslate":
					chrome.contextMenus.create({
						parentId : 'parent',
						id : 'translate',
						title : 'Google Translate',
						contexts : ctx
					});
					break;

				case "contextShortener":
					chrome.contextMenus.create({
						parentId : 'parent',
						id : 'url',
						title : 'Url Shortener',
						contexts : ctx
					});
					break;
				}
			}
		}
	});
}

chrome.contextMenus.onClicked.addListener(function (info, tab) {
	switch (info.menuItemId) {
	case "translate":
		if (info.selectionText != null && info.selectionText.length > 0) {
			chrome.storage.local.get({
				"language" : "en"
			}, function (items) {
				translateLink = 'https://translate.google.com/#auto/' + items.language + '/' + info.selectionText.replace(/ /g, '%20');
				GetTranslate(info.selectionText, items.language);
			});
		} else {
			chrome.tabs.create({
				'url' : 'https://translate.google.com'
			});
		}
		break;
	case "url":
		Url();
		break;
	}
});

function Mail() {
	chrome.tabs.query({}, function (tabs) {
		for (var i = 0; i < tabs.length; i++) {
			if (tabs[i].url && isMailUrl(tabs[i].url)) {
				chrome.tabs.update(tabs[i].id, {
					highlighted : true
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
	chrome.tabs.query({
		'active' : true,
		'currentWindow' : true
	}, function (tabs) {
		chrome.storage.local.get({
			"shortUrl" : null,
			"longUrl" : null
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
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "https://mail.google.com/mail/feed/atom", true);
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				var xmlDoc = xhr.responseXML;
				var unreadCount = xmlDoc.getElementsByTagName("fullcount")[0].innerHTML;
				
				chrome.storage.local.get(function (items) {
					if (items) {
						if (items.mail != null && items.mail.length > 0) {
							if (items.mail.indexOf("showUnreadCount") > 0) {
								if (unreadCount > 0) {
									chrome.browserAction.setBadgeText({
										text : unreadCount
									});
									try {
										document.getElementById("unreadCount").innerHTML = "(" + unreadCount + ")";
									} catch (e) {}
								} else {
									chrome.browserAction.setBadgeText({
										text : ""
									});
									try {
										document.getElementById("unreadCount").innerHTML = "";
									} catch (e) {}
								}

							} else {
								chrome.browserAction.setBadgeText({
									text : ""
								});
								try {
									document.getElementById("unreadCount").innerHTML = "";
								} catch (e) {}								
							}
						}
					}
				});
			}
		}
	};
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
					shortUrl : shortUrl,
					longUrl : longUrl
				}, function () {
					copyTextToClipboard(shortUrl);
				});
			} else {
				Notification("msg", "Can't short this Url", "../img/notificationUrl.png", 1500);
			}
		}
	};
	xhr.send(JSON.stringify({
			"longUrl" : longUrl
		}));
}

function GetTranslate(text, language) {
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "http://translate.google.com/translate_a/t?client=x&text={" + text + "}&hl=auto&sl=auto&tl=" + language, true);
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				var translate = JSON.parse(xhr.responseText).sentences[0];

				Notification("translate", translate.trans.replace('{', '').replace('}', ''), "../img/notificationTranslate.png", 8000);
			}
		}
	};
	xhr.send(null);
}

function Notification(id, message, iconPath, closeTime) {
	chrome.notifications.create(id, {
		type : "basic",
		title : "Google Services",
		message : message,
		iconUrl : iconPath
	}, function () {
		setTimeout(function () {
			chrome.notifications.clear(id, function () {});
		}, closeTime);
	});
}

chrome.notifications.onClicked.addListener(function (notificationId, event) {
	chrome.notifications.clear(notificationId, function () {}); // empty function for opera
	if (notificationId == "translate") {
		chrome.tabs.create({
			'url' : translateLink
		});
	}
});

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
		chrome.tabs.create({
			'url' : "http://mazillka.in.ua/donate/"
		});
		chrome.tabs.create({
			'url' : chrome.extension.getURL('html/options.html')
		});
	} else if (details.reason == "update") {
		chrome.tabs.create({
			'url' : "http://mazillka.in.ua/donate/"
		});
		chrome.tabs.create({
			'url' : chrome.extension.getURL('html/options.html')
		});
	}
	ContextMenu();
});

chrome.tabs.onUpdated.addListener(function (id, info, tab) {
	ContextMenu();
	UpdateUnreadCount();
});

chrome.tabs.onActivated.addListener(function () {
	ContextMenu();
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
	case "Translate Selected":
		chrome.tabs.query({
			active : true
		}, function (tab) {
			chrome.tabs.sendMessage(tab[0].id, {
				method : "getSelection"
			}, function (response) {
				chrome.storage.local.get({
					language : "en"
				}, function (items) {
					if (response != undefined) {
						translateLink = 'https://translate.google.com/#auto/' + items.language + '/' + response.selected.replace(/ /g, '%20');
						GetTranslate(response.selected, items.language);
					}
				});
			});
		});
		break;
	}
});
