import "../scss/popup.scss"
import "./helpers/prototypes";
import { createElement, storage } from "./helpers";

document.addEventListener("DOMContentLoaded", async function () {
    const style = (await storage.get("menuStyles")).find(style => style.status).style;
    const ul = document.getElementById("list");

    const services = await storage.get("services");
    services
        .filter(service => service.status)
        .forEach((service) => {
            const attributes = {
                style: `background-image: url(${service.image_path});`,
                class: `${style}Style`,
                onclick: () => chrome.tabs.create({ url: service.url }),
            };
            const li = createElement("li", attributes, (style === "grid" ? "&zwnj;" : service.title));
            ul.appendChild(li);
        });
});

document.addEventListener("contextmenu", (event) => event.preventDefault());
