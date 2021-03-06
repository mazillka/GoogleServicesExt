import "./helpers/prototypes";
import { initializeData, updateData } from "./helpers/initialize-storage-data";
import { refreshBadgeVisibility, storage, updateUnreadCounter } from "./helpers";
import extensionizer from "extensionizer";

// set up listeners
storage.onChange(changes => {
	if (changes.hasOwnProperty("showBadge")) {
		refreshBadgeVisibility(changes.showBadge.newValue);
	}
});

extensionizer.extension.onMessage.addListener(request => {
	if (request.message === "update-unread-counter") {
		updateUnreadCounter();
	}
});

extensionizer.runtime.onInstalled.addListener(async details => {
	switch (details.reason) {
		case "install":
			await initializeData();
			extensionizer.tabs.create({ url: extensionizer.extension.getURL("options.html") });
			break;

		case "update":
			await updateData();
			break;
	}
});

extensionizer.tabs.onUpdated.addListener(updateUnreadCounter);
extensionizer.tabs.onActivated.addListener(updateUnreadCounter);
extensionizer.tabs.onRemoved.addListener(updateUnreadCounter);
extensionizer.tabs.onHighlighted.addListener(updateUnreadCounter);
extensionizer.windows.onFocusChanged.addListener(updateUnreadCounter);

document.addEventListener("DOMContentLoaded", updateUnreadCounter);
