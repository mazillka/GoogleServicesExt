function CreateLiElement(serviceObj) {
	var p = document.createElement("p");

	var input = document.createElement("input");
	input.type = "checkbox";
	input.value = serviceObj.short_name;
	input.id = serviceObj.short_name;
	input.checked = serviceObj.status;

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

function CreateRadioButtonElement(obj, name){
	var p = document.createElement("p");
	var input = document.createElement("input");
	input.type = "radio";
	input.value = obj.title;
	input.id = obj.title;
	input.name = name;
	input.checked = obj.status;

	p.appendChild(input);

	var label = document.createElement("label");
	label.htmlFor = obj.title;
	label.innerHTML = obj.title;

	p.appendChild(label);

	return p;
}

function UpdateServicesList(){
	var ul = document.getElementById("list");
	ul.innerHTML = "";

	DB.queryAll("services").forEach(function(service) {
		ul.appendChild(CreateLiElement(service));
	});

	Sortable.create(ul, {
		animation: 150,
		onUpdate: function (event) {
			var tableBackup = DB.queryAll("services");
			var movedElement = tableBackup[event.oldIndex];

			tableBackup.splice(event.oldIndex, 1);
			tableBackup.splice(event.newIndex, 0, movedElement);

			DB.dropTable("services");
			DB.createTableWithData("services", tableBackup);
			DB.commit();
		}
	});

	SubscribeToServicesListEvents();
}

function SubscribeToServicesListEvents(){
	var inputs = document.getElementsByTagName("input");
	for(var i = 0; i < inputs.length; i++){
		inputs[i].onclick = function(event){
			var obj = event.target;

			if(obj.value == "UnreadCounter" || obj.value == "UrlShortener"){
				DB.update("configs", {title: obj.value}, function (row) {
					row.status = obj.checked;
					return row;
				});
				UpdateContextMenu();
				UpdateUnreadCount();
			} else{
				var idx = DB.queryAll("services", { query: { short_name: obj.value } }).first().ID - 1;

				var tableBackup = DB.queryAll("services");
				var changedElement = tableBackup[idx];
				changedElement.status = obj.checked;

				tableBackup.splice(idx, 1);

				if(obj.checked == true){

					tableBackup.splice(tableBackup.lastActiveServiceIdx(), 0, changedElement);
				} else {
					tableBackup.splice(tableBackup.length, 0, changedElement);
				}

				DB.dropTable("services");
				DB.createTableWithData("services", tableBackup);
			}
			DB.commit();

			UpdateServicesList();
		};
	}
}

document.addEventListener('DOMContentLoaded', function () {

	UpdateServicesList();

	var mails = document.getElementById("mailList");
	DB.queryAll("mailServices").forEach(function(mail){
		mails.appendChild(CreateRadioButtonElement(mail, "mail"));
	});

	var styles = document.getElementById("styleList");
	DB.queryAll("menuStyles").forEach(function(style){
		styles.appendChild(CreateRadioButtonElement(style, "style"));
	});

	document.getElementById("showUnreadCountCheckbox").checked = DB.queryAll("configs", {
		query: {title: "UnreadCounter"}
	}).first().status;

	document.getElementById("shortenerContexMenuCheckbox").checked = DB.queryAll("configs", {
		query: {title: "UrlShortener"}
	}).first().status;

	UpdateContextMenu();
});

window.onload = function() {

	SubscribeToServicesListEvents();

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
