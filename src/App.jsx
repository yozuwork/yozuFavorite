import { useMemo, useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import Sidebar from "./components/Sidebar";
import BookmarkDialog from "./components/BookmarkDialog";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import RecentPage from "./pages/RecentPage";
import SettingsPage from "./pages/SettingsPage";
import { useBookmarks } from "./hooks/useBookmarks";
import { useCategories } from "./hooks/useCategories";
import { colors } from "./theme/theme";

export default function App() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const {
    bookmarks,
    addBookmark,
    updateBookmark,
    deleteBookmark,
    toggleFavorite,
    moveToCategory,
    registerOpen,
    replaceBookmarks,
  } = useBookmarks();

  const {
    categories,
    addCategory,
    renameCategory,
    deleteCategory,
    reorderCategories,
    replaceCategories,
  } = useCategories();

  const [view, setView] = useState("all");
  const [activeCategoryId, setActiveCategoryId] = useState("all");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [editMode, setEditMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBookmark, setEditingBookmark] = useState(null);

  const categoriesById = useMemo(
    () => Object.fromEntries(categories.map((c) => [c.id, c])),
    [categories]
  );

  const counts = useMemo(() => {
    const map = {};
    for (const b of bookmarks) {
      if (!b.categoryId) continue;
      map[b.categoryId] = (map[b.categoryId] || 0) + 1;
    }
    return map;
  }, [bookmarks]);

  const handleNavigate = (key) => {
    setView(key);
    setMobileOpen(false);
    if (key !== "all") setActiveCategoryId("all");
  };

  const handleSelectCategory = (id) => {
    setActiveCategoryId(id);
    setMobileOpen(false);
  };

  const openAddDialog = () => {
    setEditingBookmark(null);
    setDialogOpen(true);
  };

  const openEditDialog = (bookmark) => {
    setEditingBookmark(bookmark);
    setDialogOpen(true);
  };

  const handleDialogSubmit = (form) => {
    if (editingBookmark) {
      updateBookmark(editingBookmark.id, form);
    } else {
      addBookmark(form);
    }
  };

  const handleOpenBookmark = (bookmark) => {
    registerOpen(bookmark.id);
    window.open(bookmark.url, "_blank", "noopener,noreferrer");
  };

  const handleDeleteBookmark = (bookmark) => {
    if (window.confirm(`確定要刪除「${bookmark.name}」嗎？`)) {
      deleteBookmark(bookmark.id);
    }
  };

  const handleDeleteCategory = (id) => {
    const category = categoriesById[id];
    if (!category) return;
    if (
      window.confirm(
        `確定要刪除分頁「${category.name}」嗎？此分頁下的收藏將變為未分類。`
      )
    ) {
      deleteCategory(id);
      if (activeCategoryId === id) setActiveCategoryId("all");
      replaceBookmarks(
        bookmarks.map((b) => (b.categoryId === id ? { ...b, categoryId: "" } : b))
      );
    }
  };

  const sidebarVariant = isDesktop ? "full" : isTablet ? "collapsed" : "mobile";

  const sidebarProps = {
    view,
    onNavigate: handleNavigate,
    categories,
    counts,
    totalCount: bookmarks.length,
    activeCategoryId,
    onSelectCategory: handleSelectCategory,
    onAddCategory: addCategory,
    onRenameCategory: renameCategory,
    onDeleteCategory: handleDeleteCategory,
    onReorderCategories: reorderCategories,
  };

  const sharedPageProps = {
    bookmarks,
    categories,
    categoriesById,
    search,
    onSearchChange: setSearch,
    viewMode,
    onViewModeChange: setViewMode,
    sortBy,
    onSortChange: setSortBy,
    editMode,
    onEditModeChange: setEditMode,
    onAddBookmark: openAddDialog,
    onOpenBookmark: handleOpenBookmark,
    onToggleFavorite: toggleFavorite,
    onEditBookmark: openEditDialog,
    onDeleteBookmark: handleDeleteBookmark,
    onMoveBookmark: moveToCategory,
    onOpenMobileMenu: () => setMobileOpen(true),
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: colors.cream }}>
      {sidebarVariant === "mobile" ? (
        <Sidebar
          variant="mobile"
          mobileOpen={mobileOpen}
          onCloseMobile={() => setMobileOpen(false)}
          {...sidebarProps}
        />
      ) : (
        <Sidebar variant={sidebarVariant} {...sidebarProps} />
      )}

      <Box
        component="main"
        sx={{
          flex: 1,
          minWidth: 0,
          p: { xs: 2, sm: 3, md: 4 },
        }}
      >
        {view === "all" && (
          <HomePage
            {...sharedPageProps}
            counts={counts}
            activeCategoryId={activeCategoryId}
            onSelectCategory={setActiveCategoryId}
            onAddCategory={addCategory}
          />
        )}
        {view === "favorites" && <FavoritesPage {...sharedPageProps} />}
        {view === "recent" && <RecentPage {...sharedPageProps} />}
        {view === "settings" && (
          <SettingsPage
            bookmarks={bookmarks}
            categories={categories}
            onReplaceBookmarks={replaceBookmarks}
            onReplaceCategories={replaceCategories}
          />
        )}
      </Box>

      <BookmarkDialog
        open={dialogOpen}
        bookmark={editingBookmark}
        categories={categories}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleDialogSubmit}
      />
    </Box>
  );
}
