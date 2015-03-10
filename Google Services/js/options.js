document.addEventListener('DOMContentLoaded', function () {
	chrome.storage.local.get({
		"options" : ["popupMail", "popupPlus", "popupTranslate", "popupDrive", "popupSearch",
			"popupMaps", "popupPlay", "popupNews", "popupCalendar", "popupContacts", "popupYoutube", "popupShortener", "mailGmail"],
		"context" : ["contextTranslate", "contextShortener"],
		"language" : "en"
	}, function (items) {
		if (items.options != null && items.options.length > 0) {
			for (var i = 0; i < items.options.length; i++) {
				switch (items.options[i]) {
				case "popupMail":
					document.getElementById("mailPopupOption").checked = true;
					break;

				case "popupPlus":
					document.getElementById("plusPopupOption").checked = true;
					break;

				case "popupTranslate":
					document.getElementById("translatePopupOption").checked = true;
					break;

				case "popupDrive":
					document.getElementById("drivePopupOption").checked = true;
					break;

				case "popupSearch":
					document.getElementById("searchPopupOption").checked = true;
					break;

				case "popupMaps":
					document.getElementById("mapsPopupOption").checked = true;
					break;

				case "popupPlay":
					document.getElementById("playPopupOption").checked = true;
					break;

				case "popupNews":
					document.getElementById("newsPopupOption").checked = true;
					break;

				case "popupCalendar":
					document.getElementById("calendarPopupOption").checked = true;
					break;

				case "popupContacts":
					document.getElementById("contactsPopupOption").checked = true;
					break;
					
				case "popupYoutube":
					document.getElementById("youtubePopupOption").checked = true;
					break;

				case "popupShortener":
					document.getElementById("shortenerPopupOption").checked = true;
					break;

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
				checkedOptions.push(mailOptions[i].value);
			}
		}

		for (var i = 0; i < contextOptions.length; i++) {
			if (contextOptions[i].checked) {
				checkedContext.push(contextOptions[i].value);
			}
		}

		chrome.storage.local.set({
			"options" : checkedOptions,
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
