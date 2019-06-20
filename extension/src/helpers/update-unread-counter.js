import {throttle} from "./trottle";

const isBadgeActive = () => new Promise(resolve => chrome.storage.sync.get(['showBadge'], item => resolve(item.showBadge)));
const SetBadgeText = text => chrome.browserAction.setBadgeText({text});
const counter = {
    number: null,
};
const localUnreadCounter = new Proxy(
    counter,
    {
        set: async (target, objectKey, value) => {
            target[objectKey] = value;
            if (objectKey === 'number' && !Number.isNaN(value) && await isBadgeActive()) {
                SetBadgeText(value > 0 ? value.toString() : '');
            }
            return true;
        },
        get: (object, key) => {
            return object[key];
        },
    }
);

export const refreshBadgeVisibility = (visibility) => SetBadgeText(visibility && localUnreadCounter.number !== null ? localUnreadCounter.number.toString() : '');

export const updateUnreadCounter = throttle(() => {
    fetch('https://mail.google.com/mail/feed/atom')
        .then(response => response.text())
        .then(xmlString => (new window.DOMParser()).parseFromString(xmlString, "text/xml"))
        .then(xmlDoc => {
            const unreadString = xmlDoc.getElementsByTagName("fullcount").first().textContent;
            const unreadNumber = Number(unreadString);
            if (!Number.isNaN(unreadNumber) && unreadNumber !== localUnreadCounter.number) {
                localUnreadCounter.number = unreadNumber;
            }
        });
}, 10000);
