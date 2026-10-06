# 柚子收藏庫 BOOKMARKS

個人網站與資源收藏管理工具。收藏外部網站、工具、GitHub 專案、AI 工具、ACGN 網站、前端 / 設計資源、學習資源等各種網路連結，並以卡片式介面分類管理。

純前端專案，資料儲存在瀏覽器 `localStorage`，無須後端或資料庫。

## 技術棧

- React + Vite
- MUI (Material UI)
- JavaScript / JSX
- localStorage

## 開發

```bash
npm install
npm run dev
```

## 建置

```bash
npm run build
```

建置輸出位於 `dist/`，可直接部署到 Cloudflare Pages（Build command: `npm run build`，Build output directory: `dist`）。

## 功能

- 全部收藏 / 我的最愛 / 最近加入 / 設定
- 自訂分頁（新增、修改、刪除、排序）
- 新增 / 編輯 / 刪除收藏
- 搜尋（名稱、URL、描述、Tags、分頁）
- Grid / List 檢視、排序、編輯模式
- Favicon 自動帶入（`google.com/s2/favicons`）
- Import / Export JSON 備份
- Responsive：桌面固定側欄、平板縮小側欄、手機側欄改為 Drawer

# yozuFavorite
