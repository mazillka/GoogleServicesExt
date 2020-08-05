import "../scss/popup.scss";
import "./helpers/prototypes";
import { createElement, storage } from "./helpers";
import extensionizer from "extensionizer";

document.addEventListener("DOMContentLoaded", async () => {
	const style = (await storage.get("menuStyles")).find(style => style.enabled).style;
	const ul = document.querySelector("#list");

	await storage.get("services").then(services => {
		services
			.filter(service => service.enabled)
			.forEach(service => {
				const attributes = {
					rel: "noopener",
					style: `background-image: url(${service.icon});`,
					class: `${style}-style`,
					onclick: () => extensionizer.tabs.create({ url: service.url }),
				};

				const li = createElement("li", attributes, style === "grid" ? "&zwnj;" : service.name);

				ul.appendChild(li);
			});
	});
});

document.addEventListener("contextmenu", event => event.preventDefault());
