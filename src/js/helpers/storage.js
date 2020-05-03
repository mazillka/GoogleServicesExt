import extensionizer from "extensionizer";

export const get = (key) => {
    return new Promise(
        (resolve) => extensionizer.storage.sync.get([key], item => resolve(item[key] || null))
    )
};

export const set = async (key, value) => extensionizer.storage.sync.set({ [key]: value });
export const remove = async (key) => extensionizer.storage.sync.remove(key);
export const clear = async () => extensionizer.storage.sync.clear();
export const onChange = (cb) => extensionizer.storage.onChanged.addListener((changes, namespace) => namespace === "sync" ? cb(changes) : false);

export default {
    get,
    set,
    remove,
    clear,
    onChange,
}
