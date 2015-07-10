document.addEventListener('DOMContentLoaded', function () {
	chrome.storage.local.get({
		"optionsList" : ["popupMail", "popupPlus", "popupTranslate", "popupDrive", "popupSearch",
			"popupMaps", "popupPlay", "popupNews", "popupCalendar", "popupContacts", "popupYoutube", "popupShortener", "mailGmail"],
		"mail" : ["mailGmail"],
		"style" : ["lineMenu"]
	}, function (items) {
		var ul = document.getElementById("list");
		if (items.optionsList != null && items.optionsList.length > 0) {
			for (var i = 0; i < items.optionsList.length; i++) {
				var li = document.createElement("li");
				switch (items.optionsList[i]) {
				case "popupMail":
					li.setAttribute("id", "mail");
					li.innerHTML = "<hr>Google Mail <label id='unreadCount'></label>";
					li.onclick = Mail;
					break;

				case "popupPlus":
					li.setAttribute("id", "plus");
					li.innerHTML = "<hr>Google Plus";
					li.onclick = function () {
						chrome.tabs.create({
							'url' : 'https://plus.google.com'
						});
					};
					break;

				case "popupTranslate":
					li.setAttribute("id", "translate");
					li.innerHTML = "<hr>Google Translate";
					li.onclick = function () {
						chrome.tabs.create({
							'url' : 'https://translate.google.com'
						});
					};
					break;

				case "popupDrive":
					li.setAttribute("id", "drive");
					li.innerHTML = "<hr>Google Drive";
					li.onclick = function () {
						chrome.tabs.create({
							'url' : 'https://drive.google.com'
						});
					};
					break;

				case "popupSearch":
					li.setAttribute("id", "search");
					li.innerHTML = "<hr>Google Search";
					li.onclick = function () {
						chrome.tabs.create({
							'url' : 'https://google.com'
						});
					};
					break;

				case "popupMaps":
					li.setAttribute("id", "maps");
					li.innerHTML = "<hr>Google Maps";
					li.onclick = function () {
						chrome.tabs.create({
							'url' : 'https://maps.google.com'
						});
					};
					break;

				case "popupPlay":
					li.setAttribute("id", "play");
					li.innerHTML = "<hr>Google Play";
					li.onclick = function () {
						chrome.tabs.create({
							'url' : 'https://play.google.com'
						});
					};
					break;

				case "popupNews":
					li.setAttribute("id", "news");
					li.innerHTML = "<hr>Google News";
					li.onclick = function () {
						chrome.tabs.create({
							'url' : 'https://news.google.com'
						});
					};
					break;

				case "popupCalendar":
					li.setAttribute("id", "calendar");
					li.innerHTML = "<hr>Google Calendar";
					li.onclick = function () {
						chrome.tabs.create({
							'url' : 'https://calendar.google.com'
						});
					};
					break;

				case "popupContacts":
					li.setAttribute("id", "contacts");
					li.innerHTML = "<hr>Google Contacts";
					li.onclick = function () {
						chrome.tabs.create({
							'url' : 'https://contacts.google.com'
						});
					};
					break;
					
				case "popupPhotos":
					li.setAttribute("id", "photos");
					li.innerHTML = "<hr>Google Photos";
					li.onclick = function () {
						chrome.tabs.create({
							'url' : 'https://photos.google.com'
						});
					};
					break;
					
				case "popupKeep":
					li.setAttribute("id", "keep");
					li.innerHTML = "<hr>Google Keep";
					li.onclick = function () {
						chrome.tabs.create({
							'url' : 'https://keep.google.com'
						});
					};
					break;

				case "popupYoutube":
					li.setAttribute("id", "youtube");
					li.innerHTML = "<hr>Youtube";
					li.onclick = function () {
						chrome.tabs.create({
							'url' : 'https://youtube.com'
						});
					};
					break;

				case "popupShortener":
					li.setAttribute("id", "shortener");
					li.innerHTML = "<hr>URL Shortener";
					li.onclick = Url;
					break;
				}

				for (var j = 0; j < items.style.length; j++) {
					switch (items.style[j]) {
					case "gridMenu":
						ul.style.width = "200px";
						ul.style.height = "auto";
						li.innerHTML = "&zwnj;";
						li.setAttribute("class", "gridStyle");
						document.body.style.backgroundColor = "#F8F8F8";
						break;
					case "altLineMenu":
						ul.style.width = "220px";
						ul.style.marginTop = "6px";
						li.setAttribute("class", "altLineStyle");
						document.body.style.backgroundColor = "#F8F8F8";
						break;
					}
				}

				ul.appendChild(li);
			}
		}

		if (items.mail != null && items.mail.length > 0) {
			for (var i = 0; i < items.mail.length; i++) {
				switch (items.mail[i]) {
				case "mailGmail":
					mailUrl = "https://mail.google.com/mail/";
					break;

				case "mailInbox":
					mailUrl = "https://inbox.google.com/";
					break;
				}
			}
		}
	});
});

document.addEventListener("contextmenu", function (event) {
	event.preventDefault();
});
