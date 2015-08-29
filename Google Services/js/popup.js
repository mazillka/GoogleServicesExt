function CreateLi(serviceObj, theme) {
	var ul = document.getElementById("list");
	var li = document.createElement("li");
	li.setAttribute("id", serviceObj.ID);
	li.innerHTML = serviceObj.TXT;
	li.style.backgroundImage = "url('"+ serviceObj.IMG +"')";

	switch(theme){
		case "grid":
			ul.style.width = "200px";
			ul.style.height = "auto";
			li.innerHTML = "&zwnj;";
			li.setAttribute("class", "gridStyle");
			break;
		case "line":
			ul.style.width = "220px";
			ul.style.marginTop = "6px";
			li.setAttribute("class", "lineStyle");	
			break;	
	}
		
	if (serviceObj.ID == "mail") {
		li.onclick = Mail;
	} else if (serviceObj.ID == "shortener") {
		li.onclick = Url;
	} else {
		li.onclick = function () {
			chrome.tabs.create({
				'url': serviceObj.URL
			});
		};
	}
	return li;
}

document.addEventListener('DOMContentLoaded', function () {
	chrome.storage.local.get({
		"mailService": MailService,
		"googleServices": GoogleServices,
		"menuStyle": MenuStyle
	}, function (items) {
		MailService = items.mailService;
		GoogleServices = items.googleServices;
		MenuStyle = items.menuStyle;
		
		var ul = document.getElementById("list");
		for (var i = 0; i < GoogleServices.length; i++) {
			if(GoogleServices[i].ACTIVE){
				ul.appendChild(CreateLi(GoogleServices[i], MenuStyle.STYLE));
			}
		}
	});
});

// document.addEventListener("contextmenu", function (event) {
	// event.preventDefault();
// });
