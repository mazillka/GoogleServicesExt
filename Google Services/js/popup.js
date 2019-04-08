function CreateLiElement(serviceObj, style) {
	var li = document.createElement("li");
	li.style.backgroundImage = "url('"+ serviceObj.image_path +"')";

	switch(style){
		case "grid":
			li.innerHTML = "&zwnj;";
			li.setAttribute("class", "gridStyle");
			break;
			
		case "line":
			li.innerHTML = serviceObj.title;
			li.setAttribute("class", "lineStyle");
			break;	
	}

	li.onclick = function () {
		chrome.tabs.create({ url: serviceObj.url });
	};

	return li;
}

document.addEventListener('DOMContentLoaded', function () {
	var style = DB.queryAll("menuStyles", { query: { status: true } }).first().style;

	var ul = document.getElementById("list");

	DB.queryAll("services", {
		query: { status: true }
	}).forEach(function(service) {
		ul.appendChild(CreateLiElement(service, style));
	});
});

 document.addEventListener("contextmenu", function (event) {
	 event.preventDefault();
 });
