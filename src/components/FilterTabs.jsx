import { useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { colors } from "../theme/theme";
import CategoryDialog from "./CategoryDialog";

export default function FilterTabs({
  categories,
  counts,
  totalCount,
  activeId,
  onSelect,
  onAddCategory,
}) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const tabs = [{ id: "all", name: "全部", count: totalCount }, ...categories.map((c) => ({
    id: c.id,
    name: c.name,
    count: counts[c.id] || 0,
  }))];

  return (
    <Box sx={{ overflowX: "auto", pb: 0.5 }}>
      <Stack direction="row" spacing={1} sx={{ minWidth: "max-content" }}>
        {tabs.map((tab) => {
          const active = activeId === tab.id;
          return (
            <Button
              key={tab.id}
              onClick={() => onSelect(tab.id)}
              variant={active ? "contained" : "outlined"}
              color={active ? "primary" : "secondary"}
              size="small"
              sx={{
                flexShrink: 0,
                backgroundColor: active ? colors.yellow : colors.paper,
              }}
            >
              {tab.name} {tab.count}
            </Button>
          );
        })}
        <Button
          onClick={() => setDialogOpen(true)}
          variant="outlined"
          color="secondary"
          size="small"
          startIcon={<AddRoundedIcon />}
          sx={{ flexShrink: 0, backgroundColor: colors.paper }}
        >
          新增分頁
        </Button>
      </Stack>

      <CategoryDialog
        open={dialogOpen}
        title="新增分頁"
        onClose={() => setDialogOpen(false)}
        onSubmit={onAddCategory}
      />
    </Box>
  );
}
