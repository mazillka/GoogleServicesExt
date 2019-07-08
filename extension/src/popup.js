import './scss/popup.scss'
import './helpers/prototypes';
import {createElement, storage} from './helpers';

document.addEventListener('DOMContentLoaded', async function () {
    const style = (await storage.get('menuStyles')).find(style => style.status).style;
    const listWrapper = document.querySelector("#popup-wrapper .list");
    if (!listWrapper.classList.contains(`is-${style}`)) {
        listWrapper.classList.remove('is-list');
        listWrapper.classList.remove('is-grid');
        listWrapper.classList.add(`is-${style}`);
    }

    const services = await storage.get('services');
    services
        .filter(service => service.status)
        .forEach((service) => {
            const img = createElement('img', {src: service.image_path});
            const imageWrapper = createElement('div', {class: 'image-wrapper'}, img);
            const span = createElement('span', {}, service.title);
            const listItem = createElement(
                'article',
                {onclick: () => chrome.tabs.create({url: service.url})},
                [imageWrapper, span]
            );
            listWrapper.appendChild(listItem);
        });
});

// document.addEventListener("contextmenu", (event) => event.preventDefault());
