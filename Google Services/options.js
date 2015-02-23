function SaveOptions() {
	var checkedOptions = new Array();
	var mailService = document.getElementsByName("mailService");
	for(var i = 0; i < mailService.length; i++){
		if(mailService[i].checked){
			checkedOptions.push(mailService[i].value);
		}
	}
	
	var googleService = document.getElementsByName("googleService");
	for(var i = 0; i < googleService.length; i++){
		if(googleService[i].checked){
			checkedOptions.push(googleService[i].value);
		}
	}

	chrome.storage.sync.set({
		options: checkedOptions
	}, function() {
		var status = document.getElementById('saveButton');
		status.value = "Options saved...";
		setTimeout(function() {
			status.value = "Save";
		}, 750);
	});
}

function RestoreOptions() {
	chrome.storage.sync.get({
		options: ["mail", "translate", "drive", "search", "play", "youtube", "shortener", "gmail"]
	}, function(items) {
		
		for(var i = 0; i < items.options.length; i++){
			switch(items.options[i]){
				case "mail":
					document.getElementById("mailOption").checked = true;
				break;
				case "translate":
					document.getElementById("translateOption").checked = true;
				break;
				case "drive":
					document.getElementById("driveOption").checked = true;
				break;
				case "search":
					document.getElementById("searchOption").checked = true;
				break;
				case "play":
					document.getElementById("playOption").checked = true;
				break;
				case "youtube":
					document.getElementById("youtubeOption").checked = true;
				break;
				case "shortener":
					document.getElementById("shortenerOption").checked = true;
				break;
				case "gmail":
					document.getElementById("gmailOption").checked = true;
				break;
				case "inbox":
					document.getElementById("inboxOption").checked = true;
				break;
			}		
		}
	});
}

document.addEventListener('DOMContentLoaded', RestoreOptions);

document.addEventListener("contextmenu", function(event){ event.preventDefault(); });