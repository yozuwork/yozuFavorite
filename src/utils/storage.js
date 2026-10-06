export const STORAGE_KEYS = {
  bookmarks: "yuzu_bookmarks",
  categories: "yuzu_categories",
  settings: "yuzu_settings",
};

export function loadFromStorage(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

export function saveToStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage unavailable or full; ignore
  }
}
