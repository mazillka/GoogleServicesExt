Array.prototype.remove = function (x) {
	var i;
	for (i in this) {
		if (this[i].toString() == x.toString()) {
			this.splice(i, 1);
		}
	}
};

function CreateLiString(elementValue, elementIdName, LabelText, boolChecked) {
	if (boolChecked == true) {
		return "<li><p><input checked type='checkbox' name='popupOptions' value='" + elementValue + "' id='" + elementIdName + "'><label for='" + elementIdName + "'>" + LabelText + "</label></p></li>";
	} else {
		return "<li><p><input type='checkbox' name='popupOptions' value='" + elementValue + "' id='" + elementIdName + "'><label for='" + elementIdName + "'>" + LabelText + "</label></p></li>";
	}
}

var defaultOptionsList = ["popupMail", "popupPlus", "popupTranslate", "popupDrive", "popupSearch",
						"popupMaps", "popupPlay", "popupNews", "popupCalendar", "popupContacts",
						"popupPhotos", "popupKeep", "popupHangouts", "popupMusic", "popupStore", "popupYoutube", "popupShortener"];

document.addEventListener('DOMContentLoaded', function () {
	chrome.storage.local.get({
		"optionsList" : ["popupMail", "popupPlus", "popupTranslate", "popupDrive", "popupSearch",
						"popupMaps", "popupPlay", "popupNews", "popupCalendar", "popupContacts",
						"popupPhotos", "popupKeep", "popupHangouts", "popupMusic", "popupStore", "popupYoutube", "popupShortener"]
	}, function (items) {
		var ul = document.getElementById("list");
		for (var i = 0; i < items.optionsList.length; i++) {
			switch (items.optionsList[i]) {
			case "popupMail":
				defaultOptionsList.remove("popupMail");
				ul.innerHTML += CreateLiString("popupMail", "popupMail", "Google Mail", true);
				break;

			case "popupPlus":
				defaultOptionsList.remove("popupPlus");
				ul.innerHTML += CreateLiString("popupPlus", "popupPlus", "Google Plus", true);
				break;

			case "popupTranslate":
				defaultOptionsList.remove("popupTranslate");
				ul.innerHTML += CreateLiString("popupTranslate", "popupTranslate", "Google Translate", true);
				break;

			case "popupDrive":
				defaultOptionsList.remove("popupDrive");
				ul.innerHTML += CreateLiString("popupDrive", "popupDrive", "Google Drive", true);
				break;

			case "popupSearch":
				defaultOptionsList.remove("popupSearch");
				ul.innerHTML += CreateLiString("popupSearch", "popupSearch", "Google Search", true);
				break;

			case "popupMaps":
				defaultOptionsList.remove("popupMaps");
				ul.innerHTML += CreateLiString("popupMaps", "popupMaps", "Google Maps", true);
				break;

			case "popupPlay":
				defaultOptionsList.remove("popupPlay");
				ul.innerHTML += CreateLiString("popupPlay", "popupPlay", "Google Play", true);
				break;

			case "popupNews":
				defaultOptionsList.remove("popupNews");
				ul.innerHTML += CreateLiString("popupNews", "popupNews", "Google News", true);
				break;

			case "popupCalendar":
				defaultOptionsList.remove("popupCalendar");
				ul.innerHTML += CreateLiString("popupCalendar", "popupCalendar", "Google Calendar", true);
				break;

			case "popupContacts":
				defaultOptionsList.remove("popupContacts");
				ul.innerHTML += CreateLiString("popupContacts", "popupContacts", "Google Contacts", true);
				break;

			case "popupPhotos":
				defaultOptionsList.remove("popupPhotos");
				ul.innerHTML += CreateLiString("popupPhotos", "popupPhotos", "Google Photos", true);
				break;
				
			case "popupKeep":
				defaultOptionsList.remove("popupKeep");
				ul.innerHTML += CreateLiString("popupKeep", "popupKeep", "Google Keep", true);
				break;

			case "popupHangouts":
				defaultOptionsList.remove("popupHangouts");
				ul.innerHTML += CreateLiString("popupHangouts", "popupHangouts", "Google Hangouts", true);
				break;

			case "popupMusic":
				defaultOptionsList.remove("popupMusic");
				ul.innerHTML += CreateLiString("popupMusic", "popupMusic", "Google Play Music", true);
				break;

			case "popupStore":
				defaultOptionsList.remove("popupStore");
				ul.innerHTML += CreateLiString("popupStore", "popupStore", "Chrome Web Store", true);
				break;
				
			case "popupYoutube":
				defaultOptionsList.remove("popupYoutube");
				ul.innerHTML += CreateLiString("popupYoutube", "popupYoutube", "Youtube", true);
				break;

			case "popupShortener":
				defaultOptionsList.remove("popupShortener");
				ul.innerHTML += CreateLiString("popupShortener", "popupShortener", "Url Shortener", true);
				break;
			}
		}

		for (var i = 0; i < defaultOptionsList.length; i++) {
			switch (defaultOptionsList[i]) {
				case "popupMail":
					ul.innerHTML += CreateLiString("popupMail", "popupMail", "Google Mail", false);
					break;

				case "popupPlus":
					ul.innerHTML += CreateLiString("popupPlus", "popupPlus", "Google Plus", false);
					break;

				case "popupTranslate":
					ul.innerHTML += CreateLiString("popupTranslate", "popupTranslate", "Google Translate", false);
					break;

				case "popupDrive":
					ul.innerHTML += CreateLiString("popupDrive", "popupDrive", "Google Drive", false);
					break;

				case "popupSearch":
					ul.innerHTML += CreateLiString("popupSearch", "popupSearch", "Google Search", false);
					break;

				case "popupMaps":
					ul.innerHTML += CreateLiString("popupMaps", "popupMaps", "Google Maps", false);
					break;

				case "popupPlay":
					ul.innerHTML += CreateLiString("popupPlay", "popupPlay", "Google Play", false);
					break;

				case "popupNews":
					ul.innerHTML += CreateLiString("popupNews", "popupNews", "Google News", false);
					break;

				case "popupCalendar":
					ul.innerHTML += CreateLiString("popupCalendar", "popupCalendar", "Google Calendar", false);
					break;

				case "popupContacts":
					ul.innerHTML += CreateLiString("popupContacts", "popupContacts", "Google Contacts", false);
					break;

				case "popupPhotos":
					ul.innerHTML += CreateLiString("popupPhotos", "popupPhotos", "Google Photos", false);
					break;

				case "popupKeep":
					ul.innerHTML += CreateLiString("popupKeep", "popupKeep", "Google Keep", false);
					break;

				case "popupHangouts":
					ul.innerHTML += CreateLiString("popupHangouts", "popupHangouts", "Google Hangouts", false);
					break;

				case "popupMusic":
					ul.innerHTML += CreateLiString("popupMusic", "popupMusic", "Google Play Music", false);
					break;

				case "popupStore":
					ul.innerHTML += CreateLiString("popupStore", "popupStore", "Chrome Web Store", false);
					break;

				case "popupYoutube":
					ul.innerHTML += CreateLiString("popupYoutube", "popupYoutube", "Youtube", false);
					break;

				case "popupShortener":
					ul.innerHTML += CreateLiString("popupShortener", "popupShortener", "Url Shortener", false);
					break;
			}
		}

		$("#list").sortable();
	});

	chrome.storage.local.get({
		"mail" : ["mailGmail", "showUnreadCount"],
		"context" : ["contextTranslate", "contextShortener"],
		"language" : "en",
		"style" : ["lineMenu"]
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
	
				case "showUnreadCount":
					document.getElementById("showOption").checked = true;
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

		if (items.style != null && items.style.length > 0) {
			for (var i = 0; i < items.style.length; i++) {
				switch (items.style[i]) {
				case "lineMenu":
					document.getElementById("lineOption").checked = true;
					break;
				case "gridMenu":
					document.getElementById("gridOption").checked = true;
					break;
				case "altLineMenu":
					document.getElementById("altLineOption").checked = true;
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
		var checkedStyle = [];
		var popupOptions = document.getElementsByName("popupOptions");
		var mailOptions = document.getElementsByName("mailOptions");
		var contextOptions = document.getElementsByName("contextOptions");
		var styleOptions = document.getElementsByName("styleOptions");
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

		for (var i = 0; i < styleOptions.length; i++) {
			if (styleOptions[i].checked) {
				checkedStyle.push(styleOptions[i].value);
			}
		}

		chrome.storage.local.set({
			"optionsList" : checkedOptions,
			"mail" : checkedMail,
			"context" : checkedContext,
			"language" : checkedLanguage,
			"style" : checkedStyle
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
