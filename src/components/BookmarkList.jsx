import { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Avatar,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Tooltip,
} from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DriveFileMoveRoundedIcon from "@mui/icons-material/DriveFileMoveRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import { getDomain } from "../utils/url";
import { colors } from "../theme/theme";

function ListRow({
  bookmark,
  categoryName,
  categories,
  editMode,
  onOpen,
  onToggleFavorite,
  onEdit,
  onDelete,
  onMove,
}) {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [moveAnchor, setMoveAnchor] = useState(null);
  const domain = getDomain(bookmark.url);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(bookmark.url);
    } catch {
      // clipboard unavailable
    }
    setMenuAnchor(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        p: 1.5,
        border: `2px solid ${colors.ink}`,
        borderRadius: 3,
        backgroundColor: colors.paper,
      }}
    >
      <Avatar
        src={bookmark.favicon}
        variant="rounded"
        sx={{ width: 32, height: 32, border: `1px solid ${colors.ink}`, flexShrink: 0 }}
      >
        <LanguageRoundedIcon fontSize="small" />
      </Avatar>

      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
          >
            {bookmark.name}
          </Typography>
          <Typography variant="caption" sx={{ color: colors.muted, flexShrink: 0 }}>
            {domain}
          </Typography>
        </Stack>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "block" }}
        >
          {bookmark.description}
        </Typography>
      </Box>

      <Stack direction="row" spacing={0.5} sx={{ display: { xs: "none", md: "flex" } }}>
        {categoryName && (
          <Chip label={categoryName} size="small" sx={{ backgroundColor: colors.yellow, height: 22, fontSize: 11 }} />
        )}
        {bookmark.tags?.slice(0, 2).map((tag) => (
          <Chip key={tag} label={tag} size="small" sx={{ height: 22, fontSize: 11 }} />
        ))}
      </Stack>

      <IconButton size="small" onClick={() => onToggleFavorite(bookmark.id)}>
        {bookmark.favorite ? (
          <StarRoundedIcon fontSize="small" sx={{ color: colors.yellowDark }} />
        ) : (
          <StarBorderRoundedIcon fontSize="small" />
        )}
      </IconButton>

      <Tooltip title="開啟網站">
        <IconButton
          size="small"
          onClick={() => onOpen(bookmark)}
          sx={{ backgroundColor: colors.ink, color: colors.yellow, "&:hover": { backgroundColor: colors.ink } }}
        >
          <OpenInNewRoundedIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      {editMode && (
        <IconButton size="small" onClick={() => onDelete(bookmark)} sx={{ border: `1.5px solid ${colors.ink}` }}>
          <DeleteRoundedIcon fontSize="small" />
        </IconButton>
      )}

      <IconButton size="small" onClick={(e) => setMenuAnchor(e.currentTarget)}>
        <MoreVertRoundedIcon fontSize="small" />
      </IconButton>

      <Menu anchorEl={menuAnchor} open={!!menuAnchor} onClose={() => setMenuAnchor(null)}>
        <MenuItem
          onClick={() => {
            onEdit(bookmark);
            setMenuAnchor(null);
          }}
        >
          <ListItemIcon>
            <EditRoundedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>編輯</ListItemText>
        </MenuItem>
        <MenuItem onClick={(e) => setMoveAnchor(e.currentTarget)}>
          <ListItemIcon>
            <DriveFileMoveRoundedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>移動到其他分頁</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleCopy}>
          <ListItemIcon>
            <ContentCopyRoundedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>複製網址</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            onDelete(bookmark);
            setMenuAnchor(null);
          }}
          sx={{ color: "error.main" }}
        >
          <ListItemIcon>
            <DeleteRoundedIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>刪除</ListItemText>
        </MenuItem>
      </Menu>

      <Menu anchorEl={moveAnchor} open={!!moveAnchor} onClose={() => setMoveAnchor(null)}>
        {categories.map((cat) => (
          <MenuItem
            key={cat.id}
            selected={cat.id === bookmark.categoryId}
            onClick={() => {
              onMove(bookmark.id, cat.id);
              setMoveAnchor(null);
              setMenuAnchor(null);
            }}
          >
            {cat.name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export default function BookmarkList({
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
    <Stack spacing={1.5}>
      {bookmarks.map((bookmark) => (
        <ListRow
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
    </Stack>
  );
}
