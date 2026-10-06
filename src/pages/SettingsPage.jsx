import { useRef, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Paper,
  Alert,
  Divider,
} from "@mui/material";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import { STORAGE_KEYS, loadFromStorage, saveToStorage } from "../utils/storage";

export default function SettingsPage({
  bookmarks,
  categories,
  onReplaceBookmarks,
  onReplaceCategories,
}) {
  const fileInputRef = useRef(null);
  const [message, setMessage] = useState(null);

  const handleExport = () => {
    const settings = loadFromStorage(STORAGE_KEYS.settings, {});
    const payload = { bookmarks, categories, settings };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `yuzu-bookmarks-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setMessage({ type: "success", text: "已匯出 JSON 檔案" });
  };

  const handleImportClick = () => fileInputRef.current?.click();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (!Array.isArray(data.bookmarks) || !Array.isArray(data.categories)) {
          throw new Error("格式錯誤");
        }
        onReplaceBookmarks(data.bookmarks);
        onReplaceCategories(data.categories);
        if (data.settings) saveToStorage(STORAGE_KEYS.settings, data.settings);
        setMessage({ type: "success", text: "匯入成功" });
      } catch {
        setMessage({ type: "error", text: "匯入失敗，請確認 JSON 格式是否正確" });
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <Box sx={{ maxWidth: 640 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        設定
      </Typography>

      {message && (
        <Alert severity={message.type} sx={{ mb: 2 }} onClose={() => setMessage(null)}>
          {message.text}
        </Alert>
      )}

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
          資料統計
        </Typography>
        <Typography variant="body2" color="text.secondary">
          目前共有 {bookmarks.length} 筆收藏，{categories.length} 個分頁。
        </Typography>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
          資料備份
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          所有資料都儲存在瀏覽器 localStorage 中。建議定期匯出備份，或在不同裝置間透過 JSON 檔案搬移資料。
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<FileDownloadRoundedIcon />}
            onClick={handleExport}
          >
            Export JSON
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<FileUploadRoundedIcon />}
            onClick={handleImportClick}
          >
            Import JSON
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            hidden
            onChange={handleFileChange}
          />
        </Stack>
        <Divider sx={{ my: 2 }} />
        <Typography variant="caption" color="text.secondary">
          匯入會覆蓋目前所有收藏與分頁資料，請先匯出備份再匯入。
        </Typography>
      </Paper>
    </Box>
  );
}
