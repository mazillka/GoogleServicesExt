import sortable from 'sortablejs';
import db from './db.js';

Array.prototype.lastActiveServiceIdx = function () {
	for (var i = this.length - 1; i !== 0; i--) {
		if (this[i].status) {
			return i + 1;
		}
	}
};

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
	li.style.backgroundImage = "url('" + serviceObj.image_path + "')";

	li.appendChild(p);

	return li;
}

function CreateRadioButtonElement(obj, name) {
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

function UpdateServicesList() {
	var ul = document.getElementById("list");
	ul.innerHTML = "";

	db.queryAll("services").forEach(function (service) {
		ul.appendChild(CreateLiElement(service));
	});

	sortable.create(ul, {
		animation: 150,
		onUpdate: function (event) {
			var tableBackup = db.queryAll("services");
			var movedElement = tableBackup[event.oldIndex];

			tableBackup.splice(event.oldIndex, 1);
			tableBackup.splice(event.newIndex, 0, movedElement);

			db.dropTable("services");
			db.createTableWithData("services", tableBackup);
			db.commit();
		}
	});

	SubscribeToServicesListEvents();
}

function SubscribeToServicesListEvents() {
	var inputs = document.querySelectorAll('input[type="checkbox"]');

	for (var i = 0; i < inputs.length; i++) {
		inputs[i].onclick = function (event) {
			var obj = event.target;

			if (obj.value == "UnreadCounter") {
				db.update("configs", { title: obj.value }, function (row) {
					row.status = obj.checked;
					return row;
				});

				UpdateUnreadCount();
			} else {
				var idx = db.queryAll("services", { query: { short_name: obj.value } }).first().ID - 1;

				var tableBackup = db.queryAll("services");
				var changedElement = tableBackup[idx];
				changedElement.status = obj.checked;

				tableBackup.splice(idx, 1);

				obj.checked ? tableBackup.splice(tableBackup.lastActiveServiceIdx(), 0, changedElement) : tableBackup.splice(tableBackup.length, 0, changedElement);

				db.dropTable("services");
				db.createTableWithData("services", tableBackup);
			}
			db.commit();

			UpdateServicesList();
		};
	}
}

document.addEventListener('DOMContentLoaded', function () {
	UpdateServicesList();

	var styles = document.getElementById("styleList");
	db.queryAll("menuStyles").forEach(function (style) {
		styles.appendChild(CreateRadioButtonElement(style, "style"));
	});

	document.getElementById("showUnreadCountCheckbox").checked = db.queryAll("configs", { query: { title: "UnreadCounter" } }).first().status;
});

window.onload = function () {

	SubscribeToServicesListEvents();

	var styles = document.getElementsByName("style");
	for (var i = 0; i < styles.length; i++) {
		styles[i].onclick = function (event) {
			var obj = event.target;

			db.update("menuStyles", { status: true }, function (row) {
				row.status = false;
				return row;
			});

			db.update("menuStyles", { title: obj.value }, function (row) {
				row.status = obj.checked;
				return row;
			});

			db.commit();
		};
	}
};

document.addEventListener("contextmenu", function (event) {
	event.preventDefault();
});
