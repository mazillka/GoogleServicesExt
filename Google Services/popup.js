document.addEventListener('DOMContentLoaded', function () {
	document.getElementById("search").addEventListener("click", function(){
		var tab = window.open('https://google.com', '_blank'); 
        tab.focus();
	});

	document.getElementById("play").addEventListener("click", function(){
		var tab = window.open('https://play.google.com', '_blank'); 
        tab.focus();
	});
	
	document.getElementById("drive").addEventListener("click", function(){
		var tab = window.open('https://drive.google.com', '_blank'); 
        tab.focus();
	});

	document.getElementById("translate").addEventListener("click", function(){
		var tab = window.open('https://translate.google.com', '_blank'); 
        tab.focus();
	});

	document.getElementById("youtube").addEventListener("click", function(){
		var tab = window.open('https://youtube.com', '_blank'); 
        tab.focus();
	});
	
	document.getElementById("gmail").addEventListener("click", function(){
		chrome.tabs.getAllInWindow(null, function(tabs) {
			for (var i = 0; i < tabs.length; i++) {
				if (tabs[i].url && isGmailUrl(tabs[i].url)) {
					chrome.tabs.update(tabs[i].id, {selected: true});
					return;
				}
			}
			chrome.tabs.create({url: gMailUrl});
		});
	});
	
	document.getElementById("shortener").addEventListener("click", function(){
		var li = document.getElementById("shortener");
		chrome.tabs.getSelected(null, function(tab){
			if(tab.url == localStorage.getItem("mazillkaLongUrl")){
				li.innerHTML = localStorage.getItem("mazillkaSortUrl");
			} else {
				GetShortUrl(tab.url);
			}
		});
	});
});

document.addEventListener("contextmenu", function(event){ event.preventDefault(); });
