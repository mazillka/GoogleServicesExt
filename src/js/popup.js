import "../scss/popup.scss"
import "./helpers/prototypes";
import { createElement, storage } from "./helpers";
import extensionizer from "extensionizer";

document.addEventListener("DOMContentLoaded", async () => {
    const style = (await storage.get("menuStyles")).find(style => style.status).style;
    const ul = document.querySelector("#list");

    await storage.get("services")
        .then((services) => {
            services.filter((service) => service.status)
                .forEach((service) => {
                    const attributes = {
                        style: `background-image: url(${service.image_path});`,
                        class: `${style}Style`,
                        onclick: () => extensionizer.tabs.create({ url: service.url }),
                    };

                    const li = createElement("li", attributes, (style === "grid" ? "&zwnj;" : service.title));

                    ul.appendChild(li);
                });
        });
});

document.addEventListener("contextmenu", (event) => event.preventDefault());
