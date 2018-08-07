Array.prototype.Update = function (checkbox) {
	for (var i = 0; i < this.length; i++) {
		if (this[i].ID == checkbox.id) {
			this[i].ACTIVE = checkbox.checked;
		}
	}
};

// function compare(a,b) {
//   if (a.POSITION < b.POSITION)
//     return -1;
//   if (a.POSITION > b.POSITION)
//     return 1;
//   return 0;
// }

	// GoogleServices.sort(compare);

	// var msg = "";
	// for(var i = 0; i < GoogleServices.length; i++)
	// {
	// 	msg+= GoogleServices[i].POSITION + "\n";
	// }
	// alert(msg);

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
	
	InitContextMenu();
}

function OnCheckedHandler(event) {
	GoogleServices.Update(event.target);
	SaveData();
}

function CreateLi(serviceObj) {
	var p = document.createElement("p");

	var input = document.createElement("input");
	input.type = "checkbox";
	input.value = serviceObj.ID;
	input.id = serviceObj.ID;

	input.setAttribute("data-id", serviceObj.ID);
	input.setAttribute("data-txt", serviceObj.TXT);
	input.setAttribute("data-url", serviceObj.URL);
	input.setAttribute("data-img", serviceObj.IMG);
	input.setAttribute("data-active", serviceObj.ACTIVE);
	input.setAttribute("class", "sortable");

	input.checked = serviceObj.ACTIVE;
	input.onclick = OnCheckedHandler;
	p.appendChild(input);

	var label = document.createElement("label");
	label.htmlFor = serviceObj.ID;
	label.innerHTML = serviceObj.TXT;
	p.appendChild(label);

	var li = document.createElement("li");
	li.style.backgroundImage = "url('"+ serviceObj.IMG +"')";
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

	InitContextMenu();
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
// 	event.preventDefault();
// });
