Array.prototype.Update = function (checkbox) {
	for (var i = 0; i < this.length; i++) {
		if (this[i].ID == checkbox.id) {
			this[i].ACTIVE = checkbox.checked;
		}
	}
};

function SaveData() {
	var mail = document.getElementsByName("mailOptions");
	for (var i = 0; i < mail.length; i++) {
		if (mail[i].checked) {
			switch (mail[i].value) {
				case "mailGmail":
					MailService.SERVICE = "gmail";
					MailService.URL = "https://mail.google.com/";
					break;
				case "mailInbox":
					MailService.SERVICE = "inbox";
					MailService.URL = "https://inbox.google.com/";
					break;
			}
		}
	}

	MailService.ACTIVE = document.getElementById("showOption").checked;
	UrlShortener.ACTIVE = document.getElementById("shortenerContextOption").checked;

	chrome.storage.local.set({
		"googleServices": GoogleServices,
		"mailService": MailService,
		"urlShortenerService": UrlShortener
	});

}

function OnCheck(event) {
	GoogleServices.Update(event.target);
	SaveData();
}

function CreateLi(serviceObj) {
	var p = document.createElement("p");

	var input = document.createElement("input");
	input.type = "checkbox";
	input.value = serviceObj.ID;
	input.id = serviceObj.ID;
	input.checked = serviceObj.ACTIVE;
	input.onclick = OnCheck;
	p.appendChild(input);

	var label = document.createElement("label");
	label.htmlFor = serviceObj.ID;
	label.innerHTML = serviceObj.TXT;
	p.appendChild(label);

	var li = document.createElement("li");
	li.appendChild(p);

	return li;
}

document.addEventListener('DOMContentLoaded', function () {
	chrome.storage.local.get({
		"googleServices": GoogleServices,
		"mailService": MailService,
		"urlShortenerService": UrlShortener
	}, function (items) {
		GoogleServices = items.googleServices;

		var ul = document.getElementById("list");

		for (var i = 0; i < GoogleServices.length; i++) {
			ul.appendChild(CreateLi(GoogleServices[i]));
		}

		$("#list").sortable();

		MailService = items.mailService;

		switch (MailService.SERVICE) {
			case "gmail":
				document.getElementById("gmailOption").checked = true;
				break;
			case "inbox":
				document.getElementById("inboxOption").checked = true;
				break;
		}


		document.getElementById("showOption").checked = MailService.ACTIVE;

		UrlShortener = items.urlShortenerService;
		document.getElementById("shortenerContextOption").checked = UrlShortener.ACTIVE;

	});

	ContextMenu();
});

document.addEventListener('DOMContentLoaded', function () {
	document.getElementById("saveButton").addEventListener("click", function () {

		SaveData();

		var status = document.getElementById('saveButton');
		status.value = "Options saved...";
		setTimeout(function () {
			status.value = "Save";
		}, 750);

		ContextMenu();
	});
});

// document.addEventListener("contextmenu", function (event) {
// event.preventDefault();
// });
