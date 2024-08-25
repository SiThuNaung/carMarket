export const getFromLocalStorage = (key) => {
    const value = localStorage.getItem(key);
    if (value) {
        try {
            return JSON.parse(value);
        } catch (e) {
            console.error(`Error parsing JSON from localStorage for key "${key}":`, e);
            return null;
        }
    }
    return null;
};

export const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};