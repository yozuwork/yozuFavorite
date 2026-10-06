import { useMemo } from "react";
import Header from "../components/Header";
import BookmarkGrid from "../components/BookmarkGrid";
import BookmarkList from "../components/BookmarkList";
import { searchBookmarks, sortBookmarks } from "../utils/filter";

export default function HomePage({
  bookmarks,
  categories,
  categoriesById,
  counts,
  search,
  onSearchChange,
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange,
  editMode,
  onEditModeChange,
  activeCategoryId,
  onSelectCategory,
  onAddCategory,
  onAddBookmark,
  onOpenBookmark,
  onToggleFavorite,
  onEditBookmark,
  onDeleteBookmark,
  onMoveBookmark,
  onOpenMobileMenu,
}) {
  const visible = useMemo(() => {
    let list = bookmarks;
    if (activeCategoryId !== "all") {
      list = list.filter((b) => b.categoryId === activeCategoryId);
    }
    list = searchBookmarks(list, search, categoriesById);
    return sortBookmarks(list, sortBy);
  }, [bookmarks, activeCategoryId, search, sortBy, categoriesById]);

  const ListComponent = viewMode === "list" ? BookmarkList : BookmarkGrid;

  return (
    <>
      <Header
        title="全部收藏"
        search={search}
        onSearchChange={onSearchChange}
        showTabs
        categories={categories}
        counts={counts}
        totalCount={bookmarks.length}
        activeCategoryId={activeCategoryId}
        onSelectCategory={onSelectCategory}
        onAddCategory={onAddCategory}
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
