import {
  Box,
  Typography,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Select,
  MenuItem,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SearchBar from "./SearchBar";
import FilterTabs from "./FilterTabs";
import { colors } from "../theme/theme";

export const SORT_OPTIONS = [
  { value: "newest", label: "最新加入" },
  { value: "oldest", label: "最早加入" },
  { value: "name", label: "名稱 A-Z" },
  { value: "mostUsed", label: "最常使用" },
];

export default function Header({
  title,
  search,
  onSearchChange,
  showTabs,
  categories,
  counts,
  totalCount,
  activeCategoryId,
  onSelectCategory,
  onAddCategory,
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange,
  editMode,
  onEditModeChange,
  onAddBookmark,
  onOpenMobileMenu,
  showSort = true,
}) {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Box sx={{ mb: 3 }}>
      <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 2 }}>
        {isMobile && (
          <IconButton onClick={onOpenMobileMenu} sx={{ border: `2px solid ${colors.ink}` }}>
            <MenuRoundedIcon />
          </IconButton>
        )}
        <Typography variant="h5" sx={{ flex: 1 }}>
          {title}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddRoundedIcon />}
          onClick={onAddBookmark}
        >
          新增收藏
        </Button>
      </Stack>

      <Box sx={{ mb: showTabs ? 2 : 0 }}>
        <SearchBar value={search} onChange={onSearchChange} />
      </Box>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1.5}
        sx={{
          alignItems: { xs: "stretch", sm: "center" },
          justifyContent: "space-between",
        }}
      >
        {showTabs ? (
          <FilterTabs
            categories={categories}
            counts={counts}
            totalCount={totalCount}
            activeId={activeCategoryId}
            onSelect={onSelectCategory}
            onAddCategory={onAddCategory}
          />
        ) : (
          <Box />
        )}

        <Stack direction="row" spacing={1} sx={{ alignItems: "center", flexShrink: 0 }}>
          {showSort && (
            <Select
              size="small"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              sx={{ backgroundColor: colors.paper, minWidth: 130 }}
            >
              {SORT_OPTIONS.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          )}

          <ToggleButtonGroup
            size="small"
            exclusive
            value={viewMode}
            onChange={(e, val) => val && onViewModeChange(val)}
            sx={{ backgroundColor: colors.paper }}
          >
            <ToggleButton value="grid" sx={{ border: `2px solid ${colors.ink}` }}>
              <GridViewRoundedIcon fontSize="small" />
            </ToggleButton>
            <ToggleButton value="list" sx={{ border: `2px solid ${colors.ink}` }}>
              <ViewListRoundedIcon fontSize="small" />
            </ToggleButton>
          </ToggleButtonGroup>

          <Button
            variant={editMode ? "contained" : "outlined"}
            color={editMode ? "primary" : "secondary"}
            size="small"
            startIcon={<EditRoundedIcon />}
            onClick={() => onEditModeChange(!editMode)}
            sx={{ backgroundColor: editMode ? undefined : colors.paper }}
          >
            編輯模式
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
