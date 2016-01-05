function CreateLiElement(serviceObj, style) {
	var li = document.createElement("li");
	li.innerHTML = serviceObj.title;
	li.style.backgroundImage = "url('"+ serviceObj.image_path +"')";

	switch(style){
		case "grid":
			li.innerHTML = "&zwnj;";
			li.setAttribute("class", "gridStyle");
			break;
		case "line":
			li.setAttribute("class", "lineStyle");	
			break;	
	}
		
	if (serviceObj.short_name == "mail") {
		li.onclick = Mail;
	} else if (serviceObj.short_name == "shortener") {
		li.onclick = Url;
	} else {
		li.onclick = function () {
			chrome.tabs.create({ 'url': serviceObj.url });
		};
	}

	return li;
}

document.addEventListener('DOMContentLoaded', function () {
	var style = DB.queryAll("menuStyles", { query: { status: true } }).first().style;

	var ul = document.getElementById("list");

	//switch (style){
	//	case "grid":
	//		ul.style.width = "200px";
	//		ul.style.height = "auto";
	//		break;
	//	case "line":
	//		ul.style.width = "220px";
	//		ul.style.marginTop = "6px";
	//		break;
	//}

	DB.queryAll("services", {
		query: {status: true}
	}).forEach(function(service) {
		ul.appendChild(CreateLiElement(service, style));
	});
});

 document.addEventListener("contextmenu", function (event) {
	event.preventDefault();
 });
