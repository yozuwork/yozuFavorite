import { useCallback, useEffect, useState } from "react";
import { STORAGE_KEYS, loadFromStorage, saveToStorage } from "../utils/storage";
import { DEFAULT_CATEGORIES } from "../data/defaultData";

function makeId() {
  return `cat-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function useCategories() {
  const [categories, setCategories] = useState(() =>
    loadFromStorage(STORAGE_KEYS.categories, DEFAULT_CATEGORIES)
  );

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.categories, categories);
  }, [categories]);

  const addCategory = useCallback((name) => {
    const trimmed = name.trim();
    if (!trimmed) return null;
    const id = makeId();
    setCategories((prev) => [
      ...prev,
      { id, name: trimmed, order: prev.length },
    ]);
    return id;
  }, []);

  const renameCategory = useCallback((id, name) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, name: trimmed } : c))
    );
  }, []);

  const deleteCategory = useCallback((id) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const reorderCategories = useCallback((orderedIds) => {
    setCategories((prev) => {
      const byId = new Map(prev.map((c) => [c.id, c]));
      return orderedIds
        .map((id, index) => {
          const cat = byId.get(id);
          return cat ? { ...cat, order: index } : null;
        })
        .filter(Boolean);
    });
  }, []);

  const replaceCategories = useCallback((next) => {
    setCategories(next);
  }, []);

  return {
    categories: [...categories].sort((a, b) => a.order - b.order),
    addCategory,
    renameCategory,
    deleteCategory,
    reorderCategories,
    replaceCategories,
  };
}
