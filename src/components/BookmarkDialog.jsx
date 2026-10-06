import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Autocomplete,
  Stack,
} from "@mui/material";

const EMPTY_FORM = {
  url: "",
  name: "",
  description: "",
  categoryId: "",
  tags: [],
  previewImage: "",
};

export default function BookmarkDialog({ open, bookmark, categories, onClose, onSubmit }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [urlError, setUrlError] = useState("");

  useEffect(() => {
    if (!open) return;
    if (bookmark) {
      setForm({
        url: bookmark.url || "",
        name: bookmark.name || "",
        description: bookmark.description || "",
        categoryId: bookmark.categoryId || "",
        tags: bookmark.tags || [],
        previewImage: bookmark.previewImage || "",
      });
    } else {
      setForm({ ...EMPTY_FORM, categoryId: categories[0]?.id || "" });
    }
    setUrlError("");
  }, [open, bookmark, categories]);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = () => {
    if (!form.url.trim()) {
      setUrlError("請輸入網址");
      return;
    }
    onSubmit(form);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{bookmark ? "編輯收藏" : "新增收藏"}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 0.5 }}>
          <TextField
            label="URL"
            placeholder="https://example.com"
            value={form.url}
            onChange={handleChange("url")}
            error={!!urlError}
            helperText={urlError}
            required
            fullWidth
            autoFocus
          />
          <TextField
            label="網站名稱"
            placeholder="留空將自動從網址解析"
            value={form.name}
            onChange={handleChange("name")}
            fullWidth
          />
          <TextField
            label="描述"
            value={form.description}
            onChange={handleChange("description")}
            fullWidth
            multiline
            minRows={2}
          />
          <TextField
            select
            label="分頁"
            value={form.categoryId}
            onChange={handleChange("categoryId")}
            fullWidth
          >
            <MenuItem value="">未分類</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </TextField>
          <Autocomplete
            multiple
            freeSolo
            options={[]}
            value={form.tags}
            onChange={(e, value) => setForm((prev) => ({ ...prev, tags: value }))}
            renderInput={(params) => (
              <TextField {...params} label="Tags" placeholder="輸入後按 Enter" />
            )}
          />
          <TextField
            label="預覽圖片 URL"
            placeholder="選填"
            value={form.previewImage}
            onChange={handleChange("previewImage")}
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} color="secondary">
          取消
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {bookmark ? "儲存" : "新增"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
