function CreateLi(serviceObj) {
	var p = document.createElement("p");

	var input = document.createElement("input");
	input.type = "checkbox";
	input.value = serviceObj.short_name;
	input.id = serviceObj.short_name;

	input.setAttribute("data-id", serviceObj.short_name);
	input.setAttribute("data-txt", serviceObj.title);
	input.setAttribute("data-url", serviceObj.url);
	input.setAttribute("data-img", serviceObj.image_path);
	input.setAttribute("data-active", serviceObj.status);

	input.setAttribute("class", "sortable");

	input.checked = serviceObj.status;
	// input.onclick = OnCheckedHandler;
	p.appendChild(input);

	var label = document.createElement("label");
	label.htmlFor = serviceObj.short_name;
	label.innerHTML = serviceObj.title;
	p.appendChild(label);

	var li = document.createElement("li");
	li.style.backgroundImage = "url('"+ serviceObj.image_path +"')";
	li.appendChild(p);

	return li;
}

function CreateRadioButton(obj, name){
	var p = document.createElement("p");
	var input = document.createElement("input");
	input.type = "radio";
	input.value = obj.title;
	input.id = obj.title;
	input.name = name;

	input.setAttribute("data-service", obj.title);
	input.setAttribute("data-txt", obj.title);
	input.setAttribute("data-url", obj.url);
	input.setAttribute("data-active", obj.status);
	input.setAttribute("data-style", obj.style);

	input.checked = obj.status;
	// input.onclick = OnCheckedHandler;
	p.appendChild(input);

	var label = document.createElement("label");
	label.htmlFor = obj.title;
	label.innerHTML = obj.title;
	p.appendChild(label);

	return p;
}

// restore from DB
document.addEventListener('DOMContentLoaded', function () {
	var l = document.getElementById("list");

	DB.queryAll("services").forEach(function(service) {
		l.appendChild(CreateLi(service));
	});

	/// ?????????
	Sortable.create(l, {
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

	var mails = document.getElementById("mailList");
	DB.queryAll("mailServices").forEach(function(mail){
		mails.appendChild(CreateRadioButton(mail, "mail"));
	});


	var styles = document.getElementById("styleList");
	DB.queryAll("menuStyles").forEach(function(style){
		styles.appendChild(CreateRadioButton(style, "style"));
	});


	document.getElementById("showUnreadCountCheckbox").checked = DB.queryAll("configs", {
		query: {title: "UnreadCounter"}
	}).first().status;

	document.getElementById("shortenerContexMenuCheckbox").checked = DB.queryAll("configs", {
		query: {title: "UrlShortener"}
	}).first().status;


	ContextMenu();
});

window.onload = function() {
	var inputs = document.getElementsByTagName("input");
	for(var i = 0; i < inputs.length; i++){
		inputs[i].onclick = function(event){
			var obj = event.target;

			if(obj.value == "UnreadCounter" || obj.value == "UrlShortener"){
				DB.update("configs", {title: obj.value}, function (row) {
					row.status = obj.checked;
					return row;
				});
				ContextMenu();
			} else{
				DB.update("services", {short_name: obj.value}, function (row) {
					row.status = obj.checked;
					return row;
				});
			}
			DB.commit();
		};
	}


	var mails = document.getElementsByName("mail");
	for(var i = 0; i < mails.length; i++){
		mails[i].onclick = function(event){
			var obj = event.target;

			DB.update("mailServices", {status: true}, function (row) {
				row.status = false;
				return row;
			});

			DB.update("mailServices", {title: obj.value}, function (row) {
				row.status = obj.checked;
				return row;
			});
			DB.commit();
		};
	}


	var styles = document.getElementsByName("style");
	for(var i = 0; i < styles.length; i++){
		styles[i].onclick = function(event){
			var obj = event.target;

			DB.update("menuStyles", {status: true}, function (row) {
				row.status = false;
				return row;
			});

			DB.update("menuStyles", {title: obj.value}, function (row) {
				row.status = obj.checked;
				return row;
			});
			DB.commit();
		};
	}
};

// document.addEventListener("contextmenu", function (event) {
// event.preventDefault();
// });
