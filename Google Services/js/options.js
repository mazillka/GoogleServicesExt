Array.prototype.Update = function (checkbox) {
	for (var i = 0; i < this.length; i++) {
		if (this[i].ID == checkbox.id) {
			this[i].ACTIVE = checkbox.checked;
		}
	}
};

// save
function SaveData() {
	var mail = document.getElementsByName("mail");
	for (var i = 0; i < mail.length; i++) {		
		if (mail[i].checked) {
			MailService.SERVICE = mail[i].value;
			MailService.URL = mail[i].getAttribute("data-url");
		}
	}

	MailService.ACTIVE = document.getElementById("showUnreadCountCheckbox").checked;
	UrlShortener.ACTIVE = document.getElementById("shortenerContexMenuCheckbox").checked;
	
	var style = document.getElementsByName("style");
	for(var i = 0; i < style.length; i++){
		if(style[i].checked){
			MenuStyle.STYLE = style[i].value;
		}
	}
	
	chrome.storage.local.set({
		"googleServices": GoogleServices,
		"mailService": MailService,
		"urlShortenerService": UrlShortener,
		"menuStyle": MenuStyle
	});
	
	ContextMenu();
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

// restore
document.addEventListener('DOMContentLoaded', function () {
	chrome.storage.local.get({
		"googleServices": GoogleServices,
		"mailService": MailService,
		"urlShortenerService": UrlShortener,
		"menuStyle": MenuStyle
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
				document.getElementById("gmailRadioButton").checked = true;
				break;
			case "inbox":
				document.getElementById("inboxRadioButton").checked = true;
				break;
		}


		document.getElementById("showUnreadCountCheckbox").checked = MailService.ACTIVE;

		UrlShortener = items.urlShortenerService;
		document.getElementById("shortenerContexMenuCheckbox").checked = UrlShortener.ACTIVE;

		MenuStyle = items.menuStyle;
		
		switch(MenuStyle.STYLE){
			case "grid":
				document.getElementById("gridStyleRadioButton").checked = true;
			break;
			case "line":
				document.getElementById("lineStyleRadioButton").checked = true;
			break;
		}
	});

	ContextMenu();
});

window.onload = function() {
	var inputs = document.getElementsByTagName("input");
	for(var i = 0; i < inputs.length; i++){
		inputs[i].onclick = SaveData;
	}
}

window.unload = function() {
	SaveData();
};

// document.addEventListener("contextmenu", function (event) {
// event.preventDefault();
// });
