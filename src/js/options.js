import "../scss/options.scss";
import "./helpers/prototypes";
import sortable from "sortablejs";
import { createElement, storage } from "./helpers";

async function renderServicesList() {
	const ul = document.querySelector("#list");
	while (ul.firstChild) {
		ul.removeChild(ul.firstChild);
	}

	const services = await storage.get("services");
	services.forEach(service => {
		const input = createElement("input", {
			type: "checkbox",
			value: service.short_name,
			id: service.short_name,
			...(service.status && { checked: true }),
		});
		const label = createElement("label", { for: service.short_name }, service.title);
		const p = createElement("p", {}, [input, label]);
		const li = createElement("li", { style: `background-image: url(${service.image_path});` }, p);

		ul.appendChild(li);
	});

	sortable.create(ul, {
		animation: 150,
		onUpdate: async event => {
			const services = await storage.get("services");
			const movedElement = services[event.oldIndex];

			services.splice(event.oldIndex, 1);
			services.splice(event.newIndex, 0, movedElement);

			await storage.set("services", services);
		},
	});

	addServiceCheckboxesEventListeners();
}

function addServiceCheckboxesEventListeners() {
	const inputs = document.querySelectorAll(`input[type="checkbox"]`);
	[...inputs].forEach(input => {
		input.addEventListener("click", async event => {
			const element = event.target;
			if (element.value === "UnreadCounter") {
				storage.set("showBadge", element.checked);
			} else {
				const services = await storage.get("services");
				const changedServices = services
					.map(service => {
						if (service.short_name === element.value) {
							service.status = element.checked;
						}
						return service;
					})
					.sort((x, y) => (x.status === y.status ? 0 : x.status ? -1 : 1));
				await storage.set("services", changedServices);
				await renderServicesList();
			}
		});
	});
}

document.addEventListener("DOMContentLoaded", async () => {
	await renderServicesList();
	await renderStyleList();
	document.querySelector("#showUnreadCountCheckbox").checked = await storage.get("showBadge");
	initializeTabs();
});

async function renderStyleList() {
	const styles = document.querySelector("#styleList");
	const menuStyles = await storage.get("menuStyles");
	menuStyles.forEach(style => {
		const input = createElement("input", {
			type: "radio",
			name: "style",
			value: style.title,
			id: style.title,
			...(style.status && { checked: true }),
		});
		const label = createElement("label", { for: style.title }, style.title);
		const p = createElement("p", {}, [input, label]);
		input.addEventListener("click", async event => {
			const storageStyles = await storage.get("menuStyles");
			const changedStyles = storageStyles.map(style => {
				style.status = style.title === event.target.value;
				return style;
			});
			await storage.set("menuStyles", changedStyles);
		});
		styles.appendChild(p);
	});
}

function initializeTabs() {
	const tabLinks = document.querySelectorAll(".tab-links");
	[...tabLinks].forEach(element => {
		element.addEventListener("click", event => openTab(event, event.target.value));
	});
	tabLinks[0].click();
}

function openTab(event, tabName) {
	const tabContent = document.querySelectorAll(".tab-content");
	const tabLinks = document.querySelectorAll(".tab-links");

	[...tabContent].forEach(element => (element.style.display = "none"));
	[...tabLinks].forEach(element => element.classList.remove("active"));

	document.getElementById(tabName).style.display = "block";
	event.currentTarget.classList.add("active");
}

document.addEventListener("contextmenu", event => event.preventDefault());
