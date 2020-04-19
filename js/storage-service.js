export const storageService = {
    saveToStorage,
    loadFromStorage,
    removeFromLocalStorage,
}

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
    var val = localStorage.getItem(key)
    return JSON.parse(val)
}

function removeFromLocalStorage(key) {
    localStorage.removeItem(key)
}