document.addEventListener('DOMContentLoaded', function () {
	document.getElementById("gmail").addEventListener("click", function(){
		chrome.tabs.getAllInWindow(null, function(tabs) {
			for (var i = 0; i < tabs.length; i++) {
				if (tabs[i].url && isMailUrl(tabs[i].url)) {
					chrome.tabs.update(tabs[i].id, {selected: true});
					return;
				}
			}
			chrome.tabs.create({url: mailUrl});
		});
	});
	
	document.getElementById("shortener").addEventListener("click", function(){
		var li = document.getElementById("shortener");
		chrome.tabs.getSelected(null, function(tab){
			chrome.storage.sync.get({
				shortUrl: "google.com",
				longUrl: "google.com"
			}, function(items) {
				if(tab.url == items.longUrl){
					li.innerHTML = "<hr>" + items.shortUrl;
				} else {
					GetShortUrl(tab.url);
				}
			});		
		});	
	});
});

function RestoreOptions() {
	chrome.storage.sync.get({
		options: ["mail", "translate", "drive", "search", "play", "youtube", "shortener", "gmail"]
	}, function(items) {
		
		for(var i = 0; i < items.options.length; i++){
			switch(items.options[i]){
				case "mail":
					document.getElementById("gmail").style.display = "block";
				break;
				case "translate":
					document.getElementById("translate").style.display = "block";
				break;
				case "drive":
					document.getElementById("drive").style.display = "block";
				break;
				case "search":
					document.getElementById("search").style.display = "block";
				break;
				case "play":
					document.getElementById("play").style.display = "block";
				break;
				case "youtube":
					document.getElementById("youtube").style.display = "block";
				break;
				case "shortener":
					document.getElementById("shortener").style.display = "block";
				break;			
				case "gmail":
					mailUrl = "https://mail.google.com/mail/";
				break;
				case "inbox":
					mailUrl = "https://inbox.google.com/";
				break;	
			}		
		}
	});
}

document.addEventListener('DOMContentLoaded', RestoreOptions);

document.addEventListener("contextmenu", function(event){ event.preventDefault(); });