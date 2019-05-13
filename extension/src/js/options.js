import sortable from 'sortablejs';
import db from './db.js';
import createElement from './helpers.js'

Array.prototype.lastActiveServiceIdx = function () {
	for (let i = this.length - 1; i !== 0; i--) {
		if (this[i].status) {
			return i + 1;
		}
	}
};

function UpdateServicesList() {
	let ul = document.getElementById("list");
	ul.innerHTML = "";

	db.queryAll("services").forEach(function (service) {
		const input = createElement('input', { 'type': 'checkbox', 'value': service.short_name, 'id': service.short_name, ...(service.status && { 'checked': true }) });
		const label = createElement('label', { 'for': service.short_name }, service.title);
		const p = createElement('p', {}, [input, label]);
		const li = createElement('li', { 'style': `background-image: url(${service.image_path});` }, p);

		ul.appendChild(li);
	});

	sortable.create(ul, {
		animation: 150,
		onUpdate: function (event) {
			let tableBackup = db.queryAll("services");
			let movedElement = tableBackup[event.oldIndex];

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

	for (let i = 0; i < inputs.length; i++) {
		inputs[i].onclick = function (event) {
			let obj = event.target;

			if (obj.value == "UnreadCounter") {
				db.update("configs", { title: obj.value }, function (row) {
					row.status = obj.checked;
					return row;
				});

				UpdateUnreadCount();
			} else {
				let idx = db.queryAll("services", { query: { short_name: obj.value } }).first().ID - 1;

				let tableBackup = db.queryAll("services");
				let changedElement = tableBackup[idx];
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

	let styles = document.getElementById("styleList");
	db.queryAll("menuStyles").forEach(function (style) {
		const input = createElement('input', { 'type': 'radio', 'name': 'style', 'value': style.title, 'id': style.title, ...(style.status && { 'checked': true }) });
		const label = createElement('label', { 'for': style.title }, style.title);
		const p = createElement('p', {}, [input, label]);

		styles.appendChild(p);
	});

	document.getElementById("showUnreadCountCheckbox").checked = db.queryAll("configs", { query: { title: "UnreadCounter" } }).first().status;
});

window.onload = function () {

	SubscribeToServicesListEvents();

	let styles = document.getElementsByName("style");
	for (let i = 0; i < styles.length; i++) {
		styles[i].onclick = function (event) {
			let obj = event.target;

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

document.addEventListener("contextmenu", (event) => event.preventDefault());
