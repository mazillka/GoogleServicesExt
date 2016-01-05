var DB = new localStorageDB("library", localStorage);

if(DB.isNew()){
	DB.createTable("services", ["short_name", "title", "url", "image_path", "status"]);

	DB.insert("services", {short_name: "mail", title: "Google Mail", url: "none", image_path: "../img/gmail.png", status: true});
	DB.insert("services", {short_name: "drive", title: "Google Drive", url: "https://drive.google.com", image_path: "../img/drive.png", status: true});
	DB.insert("services", {short_name: "translate", title: "Google Translate", url: "https://translate.google.com", image_path: "../img/translate.png", status: true});
	DB.insert("services", {short_name: "search", title: "Google Search", url: "https://google.com", image_path: "../img/search.png", status: true});
	DB.insert("services", {short_name: "store", title: "Chrome Web Store", url: "https://chrome.google.com/webstore", image_path: "../img/store.png", status: true});
	DB.insert("services", {short_name: "play", title: "Google Play", url: "https://play.google.com", image_path: "../img/play.png", status: true});
	DB.insert("services", {short_name: "plus", title: "Google Plus", url: "https://plus.google.com", image_path: "../img/plus.png", status: true});
	DB.insert("services", {short_name: "maps", title: "Google Maps", url: "https://maps.google.com", image_path: "../img/maps.png", status: true});
	DB.insert("services", {short_name: "news", title: "Google News", url: "https://news.google.com", image_path: "../img/news.png", status: true});
	DB.insert("services", {short_name: "contacts", title: "Google Contacts", url: "https://contacts.google.com", image_path: "../img/contacts.png", status: true});
	DB.insert("services", {short_name: "photos", title: "Google Photos", url: "https://photos.google.com", image_path: "../img/photos.png", status: true});
	DB.insert("services", {short_name: "keep", title: "Google Keep", url: "https://keep.google.com", image_path: "../img/keep.png", status: true});
	DB.insert("services", {short_name: "hangouts", title: "Google Hangouts", url: "https://hangouts.google.com", image_path: "../img/hangouts.png", status: true});
	DB.insert("services", {short_name: "music", title: "Google Play Music", url: "https://music.google.com", image_path: "../img/music.png", status: true});
	DB.insert("services", {short_name: "youtube", title: "Youtube", url: "https://youtube.com", image_path: "../img/youtube.png", status: true});
	DB.insert("services", {short_name: "shortener", title: "URL Shortener", url: "none", image_path: "../img/shortener.png", status: true});

	DB.createTable("menuStyles", ["title", "style", "status"]);
	DB.insert("menuStyles", {title: "Grid Menu", style: "grid", status: true});
	DB.insert("menuStyles", {title: "Line Menu", style: "line", status: false});

	DB.createTable("mailServices", ["title", "url", "status"]);
	DB.insert("mailServices", {title: "Gmail", url: "https://mail.google.com/", status: true});
	DB.insert("mailServices", {title: "Inbox", url: "https://inbox.google.com/", status: false});

	DB.createTable("configs", ["title", "status"]);
	DB.insert("configs", {title: "UrlShortener", status: true});
	DB.insert("configs", {title: "UnreadCounter", status: true});

	DB.commit();
}