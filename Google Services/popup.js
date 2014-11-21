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
});

document.addEventListener("contextmenu", function(event){ event.preventDefault(); }, false);