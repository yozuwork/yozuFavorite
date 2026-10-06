import { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  IconButton,
  Tooltip,
  TextField,
  Stack,
} from "@mui/material";
import InboxRoundedIcon from "@mui/icons-material/InboxRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { colors } from "../theme/theme";

const NAV_ITEMS = [
  { key: "all", label: "全部收藏", icon: InboxRoundedIcon },
  { key: "favorites", label: "我的最愛", icon: StarRoundedIcon },
  { key: "recent", label: "最近加入", icon: AccessTimeRoundedIcon },
  { key: "settings", label: "設定", icon: SettingsRoundedIcon },
];

export const SIDEBAR_WIDTH = 264;
export const SIDEBAR_WIDTH_COLLAPSED = 84;

function CategoryRow({
  category,
  count,
  active,
  collapsed,
  onSelect,
  onRename,
  onDelete,
  onMoveUp,
  onMoveDown,
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(category.name);

  if (collapsed) {
    return (
      <Tooltip title={`${category.name} (${count})`} placement="right">
        <ListItemButton
          onClick={onSelect}
          selected={active}
          sx={{
            borderRadius: 2,
            justifyContent: "center",
            mb: 0.5,
            color: colors.yellow,
            "&.Mui-selected": {
              backgroundColor: colors.sidebarHover,
            },
          }}
        >
          <Typography variant="caption" sx={{ fontWeight: 700 }}>
            {category.name.slice(0, 2)}
          </Typography>
        </ListItemButton>
      </Tooltip>
    );
  }

  if (editing) {
    return (
      <Stack direction="row" spacing={0.5} sx={{ alignItems: "center", px: 1, mb: 0.5 }}>
        <TextField
          size="small"
          value={draft}
          autoFocus
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onRename(draft);
              setEditing(false);
            }
            if (e.key === "Escape") setEditing(false);
          }}
          sx={{
            flex: 1,
            "& .MuiOutlinedInput-root": {
              backgroundColor: colors.sidebarHover,
              color: "#fff",
              "& fieldset": { borderColor: colors.yellow },
            },
            input: { color: "#fff", py: 0.6 },
          }}
        />
        <IconButton
          size="small"
          sx={{ color: colors.yellow }}
          onClick={() => {
            onRename(draft);
            setEditing(false);
          }}
        >
          <CheckRoundedIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" sx={{ color: "#999" }} onClick={() => setEditing(false)}>
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      </Stack>
    );
  }

  return (
    <ListItemButton
      onClick={onSelect}
      selected={active}
      sx={{
        borderRadius: 2,
        mb: 0.5,
        pr: 0.5,
        "&.Mui-selected": {
          backgroundColor: colors.sidebarHover,
        },
        "&:hover": { backgroundColor: colors.sidebarHover },
        "&:hover .cat-actions": { opacity: 1 },
      }}
    >
      <ListItemText
        primary={category.name}
        slotProps={{
          primary: {
            sx: { color: "#F2EEE4", fontWeight: active ? 700 : 500, fontSize: 14 },
          },
        }}
      />
      <Typography
        variant="caption"
        sx={{
          color: active ? colors.yellow : "#8A8577",
          fontWeight: 700,
          mr: 0.5,
          minWidth: 18,
          textAlign: "right",
        }}
      >
        {count}
      </Typography>
      {category.id !== "all" && (
        <Stack
          direction="row"
          className="cat-actions"
          sx={{ opacity: 0, transition: "opacity 0.15s" }}
        >
          {onMoveUp && (
            <IconButton
              size="small"
              sx={{ color: "#8A8577", p: 0.3 }}
              onClick={(e) => {
                e.stopPropagation();
                onMoveUp();
              }}
            >
              <ArrowUpwardRoundedIcon sx={{ fontSize: 14 }} />
            </IconButton>
          )}
          {onMoveDown && (
            <IconButton
              size="small"
              sx={{ color: "#8A8577", p: 0.3 }}
              onClick={(e) => {
                e.stopPropagation();
                onMoveDown();
              }}
            >
              <ArrowDownwardRoundedIcon sx={{ fontSize: 14 }} />
            </IconButton>
          )}
          <IconButton
            size="small"
            sx={{ color: "#8A8577", p: 0.3 }}
            onClick={(e) => {
              e.stopPropagation();
              setEditing(true);
            }}
          >
            <EditRoundedIcon sx={{ fontSize: 14 }} />
          </IconButton>
          <IconButton
            size="small"
            sx={{ color: "#8A8577", p: 0.3 }}
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <DeleteRoundedIcon sx={{ fontSize: 14 }} />
          </IconButton>
        </Stack>
      )}
    </ListItemButton>
  );
}

function SidebarContent({
  collapsed,
  view,
  onNavigate,
  categories,
  counts,
  totalCount,
  activeCategoryId,
  onSelectCategory,
  onAddCategory,
  onRenameCategory,
  onDeleteCategory,
  onReorderCategories,
}) {
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState("");

  const commitAdd = () => {
    if (newName.trim()) onAddCategory(newName.trim());
    setNewName("");
    setAdding(false);
  };

  const moveCategory = (index, dir) => {
    const ids = categories.map((c) => c.id);
    const target = index + dir;
    if (target < 0 || target >= ids.length) return;
    [ids[index], ids[target]] = [ids[target], ids[index]];
    onReorderCategories(ids);
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: colors.sidebar,
        color: "#fff",
        px: collapsed ? 1 : 2,
        py: 3,
      }}
    >
      <Box sx={{ px: collapsed ? 0 : 1, mb: 3, textAlign: collapsed ? "center" : "left" }}>
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: collapsed ? 16 : 22,
            color: colors.yellow,
            lineHeight: 1.2,
          }}
        >
          {collapsed ? "柚子" : "柚子收藏庫"}
        </Typography>
        {!collapsed && (
          <Typography
            sx={{
              fontFamily: '"Kalam", cursive',
              fontSize: 13,
              letterSpacing: 2,
              color: "#8A8577",
            }}
          >
            BOOKMARKS
          </Typography>
        )}
      </Box>

      <List dense sx={{ mb: 1 }}>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = view === item.key;
          return (
            <Tooltip
              key={item.key}
              title={collapsed ? item.label : ""}
              placement="right"
            >
              <ListItemButton
                onClick={() => onNavigate(item.key)}
                selected={active}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  justifyContent: collapsed ? "center" : "flex-start",
                  "&.Mui-selected": {
                    backgroundColor: colors.yellow,
                    color: colors.ink,
                    "& .MuiListItemIcon-root": { color: colors.ink },
                    "&:hover": { backgroundColor: colors.yellow },
                  },
                  "&:hover": { backgroundColor: colors.sidebarHover },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: active ? colors.ink : "#F2EEE4",
                    minWidth: collapsed ? "auto" : 40,
                  }}
                >
                  <Icon fontSize="small" />
                </ListItemIcon>
                {!collapsed && (
                  <ListItemText
                    primary={item.label}
                    slotProps={{
                      primary: { sx: { fontWeight: active ? 700 : 500, fontSize: 14 } },
                    }}
                  />
                )}
              </ListItemButton>
            </Tooltip>
          );
        })}
      </List>

      <Divider sx={{ borderColor: "#3A372F", my: 1 }} />

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 1, mb: 1 }}>
        {!collapsed && (
          <Typography variant="caption" sx={{ color: "#8A8577", fontWeight: 700, letterSpacing: 1 }}>
            分頁
          </Typography>
        )}
        <Tooltip title="新增分頁">
          <IconButton
            size="small"
            onClick={() => setAdding(true)}
            sx={{ color: colors.yellow, mx: collapsed ? "auto" : 0 }}
          >
            <AddRoundedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      <Box sx={{ flex: 1, overflowY: "auto" }}>
        <List dense disablePadding>
          <CategoryRow
            category={{ id: "all", name: "全部" }}
            count={totalCount}
            active={activeCategoryId === "all" && view === "all"}
            collapsed={collapsed}
            onSelect={() => {
              onNavigate("all");
              onSelectCategory("all");
            }}
          />
          {categories.map((cat, index) => (
            <CategoryRow
              key={cat.id}
              category={cat}
              count={counts[cat.id] || 0}
              active={activeCategoryId === cat.id && view === "all"}
              collapsed={collapsed}
              onSelect={() => {
                onNavigate("all");
                onSelectCategory(cat.id);
              }}
              onRename={(name) => onRenameCategory(cat.id, name)}
              onDelete={() => onDeleteCategory(cat.id)}
              onMoveUp={index > 0 ? () => moveCategory(index, -1) : null}
              onMoveDown={index < categories.length - 1 ? () => moveCategory(index, 1) : null}
            />
          ))}
        </List>

        {adding && !collapsed && (
          <Stack direction="row" spacing={0.5} sx={{ px: 1, mt: 1 }}>
            <TextField
              size="small"
              autoFocus
              placeholder="新分頁名稱"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") commitAdd();
                if (e.key === "Escape") setAdding(false);
              }}
              sx={{
                flex: 1,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: colors.sidebarHover,
                  color: "#fff",
                  "& fieldset": { borderColor: colors.yellow },
                },
                input: { color: "#fff", py: 0.6 },
              }}
            />
            <IconButton size="small" sx={{ color: colors.yellow }} onClick={commitAdd}>
              <CheckRoundedIcon fontSize="small" />
            </IconButton>
          </Stack>
        )}
      </Box>
    </Box>
  );
}

export default function Sidebar({
  variant,
  mobileOpen,
  onCloseMobile,
  ...contentProps
}) {
  if (variant === "mobile") {
    return (
      <Drawer
        open={mobileOpen}
        onClose={onCloseMobile}
        ModalProps={{ keepMounted: true }}
        slotProps={{ paper: { sx: { width: SIDEBAR_WIDTH, border: "none" } } }}
      >
        <SidebarContent collapsed={false} {...contentProps} />
      </Drawer>
    );
  }

  const collapsed = variant === "collapsed";
  const width = collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width,
          boxSizing: "border-box",
          border: "none",
        },
      }}
    >
      <SidebarContent collapsed={collapsed} {...contentProps} />
    </Drawer>
  );
}
