chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.method == "getSelection") {
		if (window.getSelection().toString() != "") {
			sendResponse({ selected: window.getSelection().toString() });
		}
	}
});
