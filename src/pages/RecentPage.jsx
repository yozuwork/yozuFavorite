import { useMemo } from "react";
import Header from "../components/Header";
import BookmarkGrid from "../components/BookmarkGrid";
import BookmarkList from "../components/BookmarkList";
import { searchBookmarks } from "../utils/filter";

export default function RecentPage({
  bookmarks,
  categories,
  categoriesById,
  search,
  onSearchChange,
  viewMode,
  onViewModeChange,
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
  const recent = useMemo(
    () => [...bookmarks].sort((a, b) => b.createdAt - a.createdAt),
    [bookmarks]
  );

  const visible = useMemo(
    () => searchBookmarks(recent, search, categoriesById),
    [recent, search, categoriesById]
  );

  const ListComponent = viewMode === "list" ? BookmarkList : BookmarkGrid;

  return (
    <>
      <Header
        title="最近加入"
        search={search}
        onSearchChange={onSearchChange}
        showTabs={false}
        viewMode={viewMode}
        onViewModeChange={onViewModeChange}
        showSort={false}
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
