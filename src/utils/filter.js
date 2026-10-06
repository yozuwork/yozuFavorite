export function searchBookmarks(bookmarks, query, categoriesById) {
  const q = query.trim().toLowerCase();
  if (!q) return bookmarks;
  return bookmarks.filter((b) => {
    const categoryName = categoriesById[b.categoryId]?.name || "";
    const haystack = [
      b.name,
      b.url,
      b.description,
      categoryName,
      ...(b.tags || []),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function sortBookmarks(bookmarks, sortBy) {
  const list = [...bookmarks];
  switch (sortBy) {
    case "oldest":
      return list.sort((a, b) => a.createdAt - b.createdAt);
    case "name":
      return list.sort((a, b) => a.name.localeCompare(b.name, "zh-Hant"));
    case "mostUsed":
      return list.sort((a, b) => (b.openCount || 0) - (a.openCount || 0));
    case "newest":
    default:
      return list.sort((a, b) => b.createdAt - a.createdAt);
  }
}
