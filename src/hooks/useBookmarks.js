import { useCallback, useEffect, useState } from "react";
import { STORAGE_KEYS, loadFromStorage, saveToStorage } from "../utils/storage";
import { DEFAULT_BOOKMARKS } from "../data/defaultData";
import { getFaviconUrl, getDomain, guessNameFromUrl, normalizeUrl } from "../utils/url";

function makeId() {
  return `bm-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState(() =>
    loadFromStorage(STORAGE_KEYS.bookmarks, DEFAULT_BOOKMARKS)
  );

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.bookmarks, bookmarks);
  }, [bookmarks]);

  const addBookmark = useCallback((input) => {
    const url = normalizeUrl(input.url);
    if (!url) return null;
    const id = makeId();
    const now = Date.now();
    const name = input.name?.trim() || guessNameFromUrl(url) || getDomain(url);
    const bookmark = {
      id,
      name,
      url,
      description: input.description?.trim() || "",
      categoryId: input.categoryId || "",
      tags: input.tags || [],
      favorite: false,
      favicon: getFaviconUrl(url),
      previewImage: input.previewImage?.trim() || "",
      createdAt: now,
      updatedAt: now,
      openCount: 0,
      lastOpenedAt: null,
    };
    setBookmarks((prev) => [bookmark, ...prev]);
    return id;
  }, []);

  const updateBookmark = useCallback((id, input) => {
    setBookmarks((prev) =>
      prev.map((b) => {
        if (b.id !== id) return b;
        const url = normalizeUrl(input.url ?? b.url);
        const name = input.name?.trim() || guessNameFromUrl(url) || getDomain(url);
        return {
          ...b,
          name,
          url,
          description: input.description?.trim() ?? b.description,
          categoryId: input.categoryId ?? b.categoryId,
          tags: input.tags ?? b.tags,
          previewImage: input.previewImage?.trim() ?? b.previewImage,
          favicon: getFaviconUrl(url),
          updatedAt: Date.now(),
        };
      })
    );
  }, []);

  const deleteBookmark = useCallback((id) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  }, []);

  const toggleFavorite = useCallback((id) => {
    setBookmarks((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, favorite: !b.favorite, updatedAt: Date.now() } : b
      )
    );
  }, []);

  const moveToCategory = useCallback((id, categoryId) => {
    setBookmarks((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, categoryId, updatedAt: Date.now() } : b
      )
    );
  }, []);

  const registerOpen = useCallback((id) => {
    setBookmarks((prev) =>
      prev.map((b) =>
        b.id === id
          ? { ...b, openCount: (b.openCount || 0) + 1, lastOpenedAt: Date.now() }
          : b
      )
    );
  }, []);

  const replaceBookmarks = useCallback((next) => {
    setBookmarks(next);
  }, []);

  return {
    bookmarks,
    addBookmark,
    updateBookmark,
    deleteBookmark,
    toggleFavorite,
    moveToCategory,
    registerOpen,
    replaceBookmarks,
  };
}
