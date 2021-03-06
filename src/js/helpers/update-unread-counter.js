import { throttle } from "./trottle";
import extensionizer from "extensionizer";

const isBadgeActive = () => new Promise(resolve => extensionizer.storage.sync.get(["showBadge"], item => resolve(item.showBadge)));
const setBadgeText = text => extensionizer.browserAction.setBadgeText({ text });
const counter = { number: null };

const localUnreadCounter = new Proxy(counter, {
	set: async (target, objectKey, value) => {
		target[objectKey] = value;
		if (objectKey === "number" && !Number.isNaN(value) && (await isBadgeActive())) {
			setBadgeText(value > 0 ? value.toString() : "");
		}
		return true;
	},
	get: (object, key) => {
		return object[key];
	},
});

export const refreshBadgeVisibility = visibility => setBadgeText(visibility && localUnreadCounter.number ? localUnreadCounter.number.toString() : "");

export const updateUnreadCounter = throttle(() => {
	fetch("https://mail.google.com/mail/feed/atom")
		.then(response => response.text())
		.then(xmlString => new window.DOMParser().parseFromString(xmlString, "text/xml"))
		.then(xmlDoc => {
			if (xmlDoc) {
				const tag = xmlDoc.querySelector("fullcount");
				if (tag) {
					const unreadNumber = Number(tag.textContent);

					if (!Number.isNaN(unreadNumber) && unreadNumber !== localUnreadCounter.number) {
						localUnreadCounter.number = unreadNumber;
					}
				}
			}
		});
}, 1000);
