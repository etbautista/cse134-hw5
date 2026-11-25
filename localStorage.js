
export function load(key, allowed, fallback) {
    try {
        const saved = localStorage.getItem(key);
        return allowed.includes(saved) ? saved : fallback;
    } catch (error) {
        return fallback;
    }
}

export function save(key, value){
    try {
        localStorage.setItem(key, value);
    } catch(err) {
        console.warn("Couldn't save to local storage due to", err);
    }
}