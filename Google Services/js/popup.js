function CreateLi(serviceObj, styleObj) {
	// var ul = document.getElementById("list");
	var li = document.createElement("li");
	// li.setAttribute("id", serviceObj.short_name);
	li.innerHTML = serviceObj.title;
	li.style.backgroundImage = "url('"+ serviceObj.image_path +"')";

	switch(styleObj.style){
		case "grid":
			// ul.style.width = "200px";
			// ul.style.height = "auto";
			li.innerHTML = "&zwnj;";
			li.setAttribute("class", "gridStyle");
			break;
		case "line":
			// ul.style.width = "220px";
			// ul.style.marginTop = "6px";
			li.setAttribute("class", "lineStyle");	
			break;	
	}
		
	if (serviceObj.ID == "mail") {
		li.onclick = Mail;
	} else if (serviceObj.ID == "shortener") {
		li.onclick = url;
	} else {
		li.onclick = function () {
			chrome.tabs.create({
				'url': serviceObj.url
			});
		};
	}

	return li;
}

document.addEventListener('DOMContentLoaded', function () {

	var style = DB.queryAll("menuStyles", {
		query: {status: true}
	}).first();

	var ul = document.getElementById("list");

	DB.queryAll("services", {
		query: {status: true}
	}).forEach(function(service) {
		ul.appendChild(CreateLi(service, style));
	});

	/// ?????????
	Sortable.create(ul, {
		animation: 150,
		store: {
			get: function (sortable) {
				// var order = localStorage.getItem(sortable.options.group);
				var order = localStorage.getItem("position");
				return order ? order.split('|') : [];
			},
			set: function (sortable) {
				var order = sortable.toArray();
				// localStorage.setItem(sortable.options.group, order.join('|'));
				localStorage.setItem("position", order.join('|'));
			}
		}
	});
});

 document.addEventListener("contextmenu", function (event) {
	 // event.preventDefault();
 });
