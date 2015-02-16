chrome.extension.onMessage.addListener(
	function(request, sender, send_response) {
		var updateTimer = setInterval(function(){	
			updateUnreadCount();
			}, 2000);
		setTimeout(function(){
			clearInterval(updateTimer);
		}, 300000);
	}
);
var gMailUrl = "https://mail.google.com/mail/";

function isGmailUrl(url) {
	return url.indexOf(gMailUrl) == 0;
}

function updateUnreadCount(){
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "https://mail.google.com/mail/feed/atom", true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if(xhr.status == 200) {
				var xmlDoc = xhr.responseXML;				
				var unreadCount = xmlDoc.getElementsByTagName("fullcount")[0].innerHTML;
				
				if(unreadCount > 0){
					chrome.browserAction.setBadgeText({text: unreadCount});
					try{
						document.getElementById("unreadCount").innerHTML = "(" + unreadCount + ")";
					}catch(e) {}
					xhr.abort();
				} else {
					chrome.browserAction.setBadgeText({text: ""});
					try{
						document.getElementById("unreadCount").innerHTML = "";
					} catch(e) {}
					xhr.abort();
				}
			} else {
				// TODO: need auth message
				xhr.abort();				
			}
		}
	}
	xhr.send(null);
}

// URL Shortener //
function copyToClipboard(element) {
	var selection = window.getSelection();            
	var range = document.createRange();
	range.selectNodeContents(element);
	selection.removeAllRanges();
	selection.addRange(range);
	document.execCommand('copy', false, null);
	selection.removeAllRanges();
}

function GetShortUrl(longUrl){
	var liElement = document.getElementById("shortener");
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "https://www.googleapis.com/urlshortener/v1/url", true);
	xhr.setRequestHeader("Content-Type", "application/JSON");
	xhr.send(JSON.stringify({longUrl: longUrl}));
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if(xhr.status == 200) {
				var shortUrl = JSON.parse(xhr.responseText).id;

				localStorage.setItem("googleServicesLongUrl", longUrl);
				localStorage.setItem("googleServicesShortUrl", shortUrl);	
				
				liElement.innerHTML = shortUrl;
				
				copyToClipboard(liElement);
				xhr.abort();
			} else {
				liElement.innerHTML = "Invalid Value";
				xhr.abort();
			}
		}
	}
}

// ... //
document.addEventListener('DOMContentLoaded', updateUnreadCount);

if (chrome.runtime && chrome.runtime.onStartup) {
	chrome.runtime.onStartup.addListener(function(){
		setInterval(updateUnreadCount, 60000);
	});
} else {
	chrome.windows.onCreated.addListener(function(){
		setInterval(updateUnreadCount, 60000);	
	});
}









