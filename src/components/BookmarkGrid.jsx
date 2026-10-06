import { Box, Typography } from "@mui/material";
import BookmarkCard from "./BookmarkCard";

export default function BookmarkGrid({
  bookmarks,
  categoriesById,
  categories,
  editMode,
  onOpen,
  onToggleFavorite,
  onEdit,
  onDelete,
  onMove,
}) {
  if (bookmarks.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography color="text.secondary">目前沒有符合條件的收藏</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "grid",
        gap: 2,
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
          xl: "repeat(4, 1fr)",
        },
      }}
    >
      {bookmarks.map((bookmark) => (
        <BookmarkCard
          key={bookmark.id}
          bookmark={bookmark}
          categoryName={categoriesById[bookmark.categoryId]?.name}
          categories={categories}
          editMode={editMode}
          onOpen={onOpen}
          onToggleFavorite={onToggleFavorite}
          onEdit={onEdit}
          onDelete={onDelete}
          onMove={onMove}
        />
      ))}
    </Box>
  );
}
