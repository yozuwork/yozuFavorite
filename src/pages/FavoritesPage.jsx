import { useMemo } from "react";
import Header from "../components/Header";
import BookmarkGrid from "../components/BookmarkGrid";
import BookmarkList from "../components/BookmarkList";
import { searchBookmarks, sortBookmarks } from "../utils/filter";

export default function FavoritesPage({
  bookmarks,
  categories,
  categoriesById,
  search,
  onSearchChange,
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange,
  editMode,
  onEditModeChange,
  onAddBookmark,
  onOpenBookmark,
  onToggleFavorite,
  onEditBookmark,
  onDeleteBookmark,
  onMoveBookmark,
  onOpenMobileMenu,
}) {
  const favorites = useMemo(() => bookmarks.filter((b) => b.favorite), [bookmarks]);

  const visible = useMemo(() => {
    const filtered = searchBookmarks(favorites, search, categoriesById);
    return sortBookmarks(filtered, sortBy);
  }, [favorites, search, sortBy, categoriesById]);

  const ListComponent = viewMode === "list" ? BookmarkList : BookmarkGrid;

  return (
    <>
      <Header
        title="我的最愛"
        search={search}
        onSearchChange={onSearchChange}
        showTabs={false}
        viewMode={viewMode}
        onViewModeChange={onViewModeChange}
        sortBy={sortBy}
        onSortChange={onSortChange}
        editMode={editMode}
        onEditModeChange={onEditModeChange}
        onAddBookmark={onAddBookmark}
        onOpenMobileMenu={onOpenMobileMenu}
      />
      <ListComponent
        bookmarks={visible}
        categoriesById={categoriesById}
        categories={categories}
        editMode={editMode}
        onOpen={onOpenBookmark}
        onToggleFavorite={onToggleFavorite}
        onEdit={onEditBookmark}
        onDelete={onDeleteBookmark}
        onMove={onMoveBookmark}
      />
    </>
  );
}
