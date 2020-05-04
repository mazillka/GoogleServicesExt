import { storage } from "./";

const initializeServicesState = async () => {
	return await storage.set("services", [
		{
			short_name: "mail",
			title: "Google Mail",
			url: "https://mail.google.com/",
			image_path: "../images/gmail.png",
			status: true,
		},
		{
			short_name: "drive",
			title: "Google Drive",
			url: "https://drive.google.com",
			image_path: "../images/drive.png",
			status: true,
		},
		{
			short_name: "translate",
			title: "Google Translate",
			url: "https://translate.google.com",
			image_path: "../images/translate.png",
			status: true,
		},
		{
			short_name: "search",
			title: "Google Search",
			url: "https://google.com",
			image_path: "../images/search.png",
			status: true,
		},
		{
			short_name: "store",
			title: "Chrome Web Store",
			url: "https://chrome.google.com/webstore",
			image_path: "../images/store.png",
			status: true,
		},
		{
			short_name: "play",
			title: "Google Play",
			url: "https://play.google.com",
			image_path: "../images/play.png",
			status: true,
		},
		{
			short_name: "maps",
			title: "Google Maps",
			url: "https://maps.google.com",
			image_path: "../images/maps.png",
			status: true,
		},
		{
			short_name: "news",
			title: "Google News",
			url: "https://news.google.com",
			image_path: "../images/news.png",
			status: true,
		},
		{
			short_name: "contacts",
			title: "Google Contacts",
			url: "https://contacts.google.com",
			image_path: "../images/contacts.png",
			status: true,
		},
		{
			short_name: "photos",
			title: "Google Photos",
			url: "https://photos.google.com",
			image_path: "../images/photos.png",
			status: true,
		},
		{
			short_name: "keep",
			title: "Google Keep",
			url: "https://keep.google.com",
			image_path: "../images/keep.png",
			status: true,
		},
		{
			short_name: "calendar",
			title: "Google Calendar",
			url: "https://calendar.google.com",
			image_path: "../images/calendar.png",
			status: true,
		},
		{
			short_name: "hangouts",
			title: "Google Hangouts",
			url: "https://hangouts.google.com",
			image_path: "../images/hangouts.png",
			status: true,
		},
		{
			short_name: "music",
			title: "Google Play Music",
			url: "https://music.google.com",
			image_path: "../images/music.png",
			status: true,
		},
		{
			short_name: "youtube",
			title: "Youtube",
			url: "https://youtube.com",
			image_path: "../images/youtube.png",
			status: true,
		},
		{
			short_name: "duo",
			title: "Duo",
			url: "https://duo.google.com",
			image_path: "../images/duo.png",
			status: true,
		},
	]);
};

const initializeMenuStylesState = async () => {
	return await storage.set("menuStyles", [
		{ title: "Grid Menu", style: "grid", status: true },
		{ title: "Line Menu", style: "line", status: false },
	]);
};

const initializeBadgeVisibilityState = async () => {
	return await storage.set("showBadge", true);
};

export const initializeData = async () => {
	if (!(await storage.get("services"))) {
		await initializeServicesState();
	}

	if (!(await storage.get("menuStyles"))) {
		await initializeMenuStylesState();
	}

	if (!(await storage.get("showBadge"))) {
		await initializeBadgeVisibilityState();
	}
};

export const resetData = async () => {
	await initializeServicesState();
	await initializeMenuStylesState();
	await initializeBadgeVisibilityState();
};
