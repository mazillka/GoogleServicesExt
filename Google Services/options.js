function save_options() {
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
		status.textContent = "Options saved...";
		setTimeout(function() {
			status.textContent = "Save";
		}, 750);
	});
}

function restore_options() {
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

document.addEventListener('DOMContentLoaded', function () {
	document.getElementById("saveButton").addEventListener("click", save_options);
	
	document.getElementById("mailText").addEventListener("click", function(){
		var option = document.getElementById("mailOption");	
		option.checked == true ? option.checked = false : option.checked = true;
	});
	
	document.getElementById("translateText").addEventListener("click", function(){
		var option = document.getElementById("translateOption");	
		option.checked == true ? option.checked = false : option.checked = true;
	});
	
	document.getElementById("driveText").addEventListener("click", function(){
		var option = document.getElementById("driveOption");	
		option.checked == true ? option.checked = false : option.checked = true;
	});
	
	document.getElementById("searchText").addEventListener("click", function(){
		var option = document.getElementById("searchOption");	
		option.checked == true ? option.checked = false : option.checked = true;
	});
	
	document.getElementById("playText").addEventListener("click", function(){
		var option = document.getElementById("playOption");	
		option.checked == true ? option.checked = false : option.checked = true;
	});
	
	document.getElementById("youtubeText").addEventListener("click", function(){
		var option = document.getElementById("youtubeOption");	
		option.checked == true ? option.checked = false : option.checked = true;
	});
	
	document.getElementById("shortenerText").addEventListener("click", function(){
		var option = document.getElementById("shortenerOption");	
		option.checked == true ? option.checked = false : option.checked = true;
	});
	
	document.getElementById("gmailText").addEventListener("click", function(){
		var option = document.getElementById("gmailOption").checked = true;
	});
	
	document.getElementById("inboxText").addEventListener("click", function(){
		var option = document.getElementById("inboxOption").checked = true;
	});
});

document.addEventListener('DOMContentLoaded', restore_options);

// document.addEventListener("contextmenu", function(event){ event.preventDefault(); });