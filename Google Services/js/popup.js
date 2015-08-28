function CreateLi(serviceObj) {
	var li = document.createElement("li");
	li.setAttribute("id", serviceObj.ID);
	li.innerHTML = serviceObj.TXT
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
		"googleServices": GoogleServices
	}, function (items) {
		MailService = items.mailService;
		GoogleServices = items.googleServices;

		var ul = document.getElementById("list");
		for (var i = 0; i < GoogleServices.length; i++) {
			ul.appendChild(CreateLi(GoogleServices[i]));
		}
	});
});

document.addEventListener("contextmenu", function (event) {
	event.preventDefault();
});
