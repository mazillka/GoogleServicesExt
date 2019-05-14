import db from "./db";
import {throttle} from "./trottle";

const isBadgeActive = () => db.queryAll("configs", {query: {title: "UnreadCounter"}}).first().status;
const SetBadgeText = (text) => chrome.browserAction.setBadgeText({text});
const counter = {
    number: 0,
};
const localUnreadCounter = new Proxy(
    counter,
    {
        set: (target, objectKey, value) => {
            target[objectKey] = value;
            if (objectKey === 'number' && !Number.isNaN(value) && isBadgeActive()) {
                console.info(target, objectKey, value);
                SetBadgeText(value > 0 ? value.toString() : '');
            }
            return true;
        },
        get: (object, key) => {
            console.info(key, object[key])
            return object[key];
        },
    }
);

export const refreshBadgeVisibility = () => {
    console.info(isBadgeActive(), db.queryAll("configs", {query: {title: "UnreadCounter"}}), localUnreadCounter.number, counter.number);
    return SetBadgeText(isBadgeActive() && localUnreadCounter.number > 0 ? localUnreadCounter.number.toString() : '');
};
const makeUpdateCounterRequest = () => {
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
};

export const updateUnreadCounter = throttle(makeUpdateCounterRequest, 10000);
