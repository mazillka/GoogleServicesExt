import localStorageDB from 'localstoragedb';

class DB {
    constructor() {
        this.instance = null;
    }

    static queryAll(...args) {
        return this.getInstance().queryAll(...args);
    }

    static update(...args) {
        return this.getInstance().update(...args);
    }

    static commit(...args) {
        return this.getInstance().commit(...args);
    }

    static dropTable(...args) {
        return this.getInstance().dropTable(...args);
    }

    static createTableWithData(...args) {
        return this.getInstance().createTableWithData(...args);
    }

    static getInstance() {
        if (!this.instance) {
            this.createDB();
        }
        return this.instance;
    }

    static createDB() {
        let db = new localStorageDB("library", localStorage);

        if (db.isNew()) {
            db.createTable("services", ["short_name", "title", "url", "image_path", "status"]);

            db.insert("services", { short_name: "mail", title: "Google Mail", url: "https://mail.google.com/", image_path: "../img/gmail.png", status: true });
            db.insert("services", { short_name: "drive", title: "Google Drive", url: "https://drive.google.com", image_path: "../img/drive.png", status: true });
            db.insert("services", { short_name: "translate", title: "Google Translate", url: "https://translate.google.com", image_path: "../img/translate.png", status: true });
            db.insert("services", { short_name: "search", title: "Google Search", url: "https://google.com", image_path: "../img/search.png", status: true });
            db.insert("services", { short_name: "store", title: "Chrome Web Store", url: "https://chrome.google.com/webstore", image_path: "../img/store.png", status: true });
            db.insert("services", { short_name: "play", title: "Google Play", url: "https://play.google.com", image_path: "../img/play.png", status: true });
            db.insert("services", { short_name: "plus", title: "Google Plus", url: "https://plus.google.com", image_path: "../img/plus.png", status: true });
            db.insert("services", { short_name: "maps", title: "Google Maps", url: "https://maps.google.com", image_path: "../img/maps.png", status: true });
            db.insert("services", { short_name: "news", title: "Google News", url: "https://news.google.com", image_path: "../img/news.png", status: true });
            db.insert("services", { short_name: "contacts", title: "Google Contacts", url: "https://contacts.google.com", image_path: "../img/contacts.png", status: true });
            db.insert("services", { short_name: "photos", title: "Google Photos", url: "https://photos.google.com", image_path: "../img/photos.png", status: true });
            db.insert("services", { short_name: "keep", title: "Google Keep", url: "https://keep.google.com", image_path: "../img/keep.png", status: true });
            db.insert("services", { short_name: "calendar", title: "Google Calendar", url: "https://calendar.google.com", image_path: "../img/calendar.png", status: true });
            db.insert("services", { short_name: "hangouts", title: "Google Hangouts", url: "https://hangouts.google.com", image_path: "../img/hangouts.png", status: true });
            db.insert("services", { short_name: "music", title: "Google Play Music", url: "https://music.google.com", image_path: "../img/music.png", status: true });
            db.insert("services", { short_name: "youtube", title: "Youtube", url: "https://youtube.com", image_path: "../img/youtube.png", status: true });

            db.createTable("menuStyles", ["title", "style", "status"]);
            db.insert("menuStyles", { title: "Grid Menu", style: "grid", status: true });
            db.insert("menuStyles", { title: "Line Menu", style: "line", status: false });

            db.createTable("configs", ["title", "status"]);
            db.insert("configs", { title: "UnreadCounter", status: true });

            db.commit();
        }

        this.instance = db;
    }

    static resetDB() {
        if (this.instance) {
            this.instance.drop();
            this.instance = null;
        }
        this.createDB();
    }
}


export default DB;
export const resetDB = () => DB.resetDB();
export const createDB = () => DB.createDB();
