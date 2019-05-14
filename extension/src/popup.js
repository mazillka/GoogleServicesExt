import './helpers/prototypes';
import db from './helpers/db.js';
import {createElement} from './helpers';

document.addEventListener('DOMContentLoaded', function () {
    let style = db.queryAll("menuStyles", { query: { status: true } }).first().style;

    let ul = document.getElementById("list");

    db.queryAll("services", {
        query: { status: true }
    }).forEach(function (service) {
        const attributes = {
            'style': `background-image: url(${service.image_path});`,
            'class': `${style}Style`,
            'onclick': function () {
                chrome.tabs.create({ url: service.url })
            }
        };

        const li = createElement('li', attributes, (style == 'grid' ? '&zwnj;' : service.title));

        ul.appendChild(li);
    });
});

document.addEventListener("contextmenu", (event) => event.preventDefault());

