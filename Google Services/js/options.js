Array.prototype.remove = function (x) {
	var i;
	for (i in this) {
		if (this[i].toString() == x.toString()) {
			this.splice(i, 1);
		}
	}
};

var defaultOptionsList = ["popupMail", "popupPlus", "popupTranslate", "popupDrive", "popupSearch",
	"popupMaps", "popupPlay", "popupNews", "popupCalendar", "popupContacts", "popupYoutube", "popupShortener"];

document.addEventListener('DOMContentLoaded', function () {
	chrome.storage.local.get({
		"optionsList" : ["popupMail", "popupPlus", "popupTranslate", "popupDrive", "popupSearch",
			"popupMaps", "popupPlay", "popupNews", "popupCalendar", "popupContacts", "popupYoutube", "popupShortener"]
	}, function (items) {
		var ul = document.getElementById("list");
		for (var i = 0; i < items.optionsList.length; i++) {
			var li = document.createElement("li");
			switch (items.optionsList[i]) {
			case "popupMail":
				defaultOptionsList.remove("popupMail");
				li.innerHTML = "<p><input checked type='checkbox' name='popupOptions' value='popupMail' id='mailPopupOption'><label for='mailPopupOption'>Google Mail</label></p>";
				break;

			case "popupPlus":
				defaultOptionsList.remove("popupPlus");
				li.innerHTML = "<p><input checked type='checkbox' name='popupOptions' value='popupPlus' id='plusPopupOption'><label for='plusPopupOption'>Google Plus</label></p>";
				break;

			case "popupTranslate":
				defaultOptionsList.remove("popupTranslate");
				li.innerHTML = "<p><input checked type='checkbox' name='popupOptions' value='popupTranslate' id='translatePopupOption'><label for='translatePopupOption'>Google Translate</label></p>";
				break;

			case "popupDrive":
				defaultOptionsList.remove("popupDrive");
				li.innerHTML = "<p><input checked type='checkbox' name='popupOptions' value='popupDrive' id='drivePopupOption'><label for='drivePopupOption'>Google Drive</label></p>";
				break;

			case "popupSearch":
				defaultOptionsList.remove("popupSearch");
				li.innerHTML = "<p><input checked type='checkbox' name='popupOptions' value='popupSearch' id='searchPopupOption'><label for='searchPopupOption'>Google Search</label></p>";
				break;

			case "popupMaps":
				defaultOptionsList.remove("popupMaps");
				li.innerHTML = "<p><input checked type='checkbox' name='popupOptions' value='popupMaps' id='mapsPopupOption'><label for='mapsPopupOption'>Google Maps</label></p>";
				break;

			case "popupPlay":
				defaultOptionsList.remove("popupPlay");
				li.innerHTML = "<p><input checked type='checkbox' name='popupOptions' value='popupPlay' id='playPopupOption'><label for='playPopupOption'>Google Play</label></p>";
				break;

			case "popupNews":
				defaultOptionsList.remove("popupNews");
				li.innerHTML = "<p><input checked type='checkbox' name='popupOptions' value='popupNews' id='newsPopupOption'><label for='newsPopupOption'>Google News</label></p>";
				break;

			case "popupCalendar":
				defaultOptionsList.remove("popupCalendar");
				li.innerHTML = "<p><input checked type='checkbox' name='popupOptions' value='popupCalendar' id='calendarPopupOption'><label for='calendarPopupOption'>Google Calendar</label></p>";
				break;

			case "popupContacts":
				defaultOptionsList.remove("popupContacts");
				li.innerHTML = "<p><input checked type='checkbox' name='popupOptions' value='popupContacts' id='contactsPopupOption'><label for='contactsPopupOption'>Google Contacts</label></p>";
				break;

			case "popupYoutube":
				defaultOptionsList.remove("popupYoutube");
				li.innerHTML = "<p><input checked type='checkbox' name='popupOptions' value='popupYoutube' id='youtubePopupOption'><label for='youtubePopupOption'>Youtube</label></p>";
				break;

			case "popupShortener":
				defaultOptionsList.remove("popupShortener");
				li.innerHTML = "<p><input checked type='checkbox' name='popupOptions' value='popupShortener' id='shortenerPopupOption'><label for='shortenerPopupOption'>Url Shortener</label></p>";
				break;
			}
			ul.appendChild(li);
		}

		for (var i = 0; i < defaultOptionsList.length; i++) {
			var li = document.createElement("li");
			switch (defaultOptionsList[i]) {
			case "popupMail":
				li.innerHTML = "<p><input type='checkbox' name='popupOptions' value='popupMail' id='mailPopupOption'><label for='mailPopupOption'>Google Mail</label></p>";
				break;

			case "popupPlus":
				li.innerHTML = "<p><input type='checkbox' name='popupOptions' value='popupPlus' id='plusPopupOption'><label for='plusPopupOption'>Google Plus</label></p>";
				break;

			case "popupTranslate":
				li.innerHTML = "<p><input type='checkbox' name='popupOptions' value='popupTranslate' id='translatePopupOption'><label for='translatePopupOption'>Google Translate</label></p>";
				break;

			case "popupDrive":
				li.innerHTML = "<p><input type='checkbox' name='popupOptions' value='popupDrive' id='drivePopupOption'><label for='drivePopupOption'>Google Drive</label></p>";
				break;

			case "popupSearch":
				li.innerHTML = "<p><input type='checkbox' name='popupOptions' value='popupSearch' id='searchPopupOption'><label for='searchPopupOption'>Google Search</label></p>";
				break;

			case "popupMaps":
				li.innerHTML = "<p><input type='checkbox' name='popupOptions' value='popupMaps' id='mapsPopupOption'><label for='mapsPopupOption'>Google Maps</label></p>";
				break;

			case "popupPlay":
				li.innerHTML = "<p><input type='checkbox' name='popupOptions' value='popupPlay' id='playPopupOption'><label for='playPopupOption'>Google Play</label></p>";
				break;

			case "popupNews":
				li.innerHTML = "<p><input type='checkbox' name='popupOptions' value='popupNews' id='newsPopupOption'><label for='newsPopupOption'>Google News</label></p>";
				break;

			case "popupCalendar":
				li.innerHTML = "<p><input type='checkbox' name='popupOptions' value='popupCalendar' id='calendarPopupOption'><label for='calendarPopupOption'>Google Calendar</label></p>";
				break;

			case "popupContacts":
				li.innerHTML = "<p><input type='checkbox' name='popupOptions' value='popupContacts' id='contactsPopupOption'><label for='contactsPopupOption'>Google Contacts</label></p>";
				break;

			case "popupYoutube":
				li.innerHTML = "<p><input type='checkbox' name='popupOptions' value='popupYoutube' id='youtubePopupOption'><label for='youtubePopupOption'>Youtube</label></p>";
				break;

			case "popupShortener":
				li.innerHTML = "<p><input type='checkbox' name='popupOptions' value='popupShortener' id='shortenerPopupOption'><label for='shortenerPopupOption'>Url Shortener</label></p>";
				break;
			}
			ul.appendChild(li);
		}

		$("#list").sortable();
	});

	chrome.storage.local.get({
		"mail" : ["mailGmail"],
		"context" : ["contextTranslate", "contextShortener"],
		"language" : "en"
	}, function (items) {
		if (items.mail != null && items.mail.length > 0) {
			for (var i = 0; i < items.mail.length; i++) {
				switch (items.mail[i]) {
				case "mailGmail":
					document.getElementById("gmailOption").checked = true;
					break;

				case "mailInbox":
					document.getElementById("inboxOption").checked = true;
					break;
				}
			}
		}

		if (items.context != null && items.context.length > 0) {
			for (var i = 0; i < items.context.length; i++) {
				switch (items.context[i]) {
				case "contextTranslate":
					document.getElementById("translateContextOption").checked = true;
					break;

				case "contextShortener":
					document.getElementById("shortenerContextOption").checked = true;
					break;
				}
			}
		}

		document.getElementById("languageOption").value = items.language;
	});
	ContextMenu();
});

document.addEventListener('DOMContentLoaded', function () {
	document.getElementById("saveButton").addEventListener("click", function () {
		var checkedOptions = [];
		var checkedContext = [];
		var checkedMail = [];
		var popupOptions = document.getElementsByName("popupOptions");
		var mailOptions = document.getElementsByName("mailOptions");
		var contextOptions = document.getElementsByName("contextOptions");
		var checkedLanguage = document.getElementById("languageOption").value;

		for (var i = 0; i < popupOptions.length; i++) {
			if (popupOptions[i].checked) {
				checkedOptions.push(popupOptions[i].value);
			}
		}

		for (var i = 0; i < mailOptions.length; i++) {
			if (mailOptions[i].checked) {
				checkedMail.push(mailOptions[i].value);
			}
		}

		for (var i = 0; i < contextOptions.length; i++) {
			if (contextOptions[i].checked) {
				checkedContext.push(contextOptions[i].value);
			}
		}

		chrome.storage.local.set({
			"optionsList" : checkedOptions,
			"mail" : checkedMail,
			"context" : checkedContext,
			"language" : checkedLanguage
		}, function () {
			var status = document.getElementById('saveButton');
			status.value = "Options saved...";
			setTimeout(function () {
				status.value = "Save";
			}, 750);
		});
		ContextMenu();
	});
});

document.addEventListener("contextmenu", function (event) {
	event.preventDefault();
});
