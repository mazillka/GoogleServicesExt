import "./helpers/prototypes";
import { initializeData, resetData } from "./helpers/initialize-storage-data";
import { refreshBadgeVisibility, storage, updateUnreadCounter } from "./helpers";
import extensionizer from "extensionizer";

// set up listeners
storage.onChange(changes => {
	if (changes.hasOwnProperty("showBadge")) {
		refreshBadgeVisibility(changes.showBadge.newValue);
	}
});

extensionizer.extension.onMessage.addListener(request => {
	if (request.message === "UpdateUnreadCounter") {
		updateUnreadCounter();
	}
});

extensionizer.runtime.onInstalled.addListener(async details => {
	switch (details.reason) {
		case "install":
			await initializeData();
			extensionizer.tabs.create({ url: extensionizer.extension.getURL("html/options.html") });
			break;

		case "update":
			// TODO: merge lists or compare them to prevent clearing

			// get options from storage and add options that not in storage
			// update existing

			await resetData();
			break;
	}
});

extensionizer.tabs.onUpdated.addListener(updateUnreadCounter);
extensionizer.tabs.onActivated.addListener(updateUnreadCounter);
extensionizer.tabs.onRemoved.addListener(updateUnreadCounter);
extensionizer.tabs.onHighlighted.addListener(updateUnreadCounter);
extensionizer.windows.onFocusChanged.addListener(updateUnreadCounter);

document.addEventListener("DOMContentLoaded", updateUnreadCounter);
