import { getFaviconUrl } from "../utils/url";

export const DEFAULT_CATEGORIES = [
  { id: "cat-acgn", name: "ACGN", order: 0 },
  { id: "cat-frontend", name: "前端", order: 1 },
  { id: "cat-design", name: "設計", order: 2 },
];

const now = Date.now();
const daysAgo = (n) => now - n * 24 * 60 * 60 * 1000;

function makeBookmark({
  id,
  name,
  url,
  description,
  categoryId,
  tags,
  favorite = false,
  createdDaysAgo,
  openCount = 0,
}) {
  const createdAt = daysAgo(createdDaysAgo);
  return {
    id,
    name,
    url,
    description,
    categoryId,
    tags,
    favorite,
    favicon: getFaviconUrl(url),
    previewImage: "",
    createdAt,
    updatedAt: createdAt,
    openCount,
    lastOpenedAt: openCount > 0 ? createdAt + 1000 * 60 * 60 : null,
  };
}

export const DEFAULT_BOOKMARKS = [
  makeBookmark({
    id: "bm-squoosh",
    name: "Squoosh",
    url: "https://squoosh.app",
    description: "線上圖片壓縮與格式轉換工具，可即時比較壓縮前後畫質。",
    categoryId: "cat-design",
    tags: ["圖片工具", "壓縮"],
    favorite: true,
    createdDaysAgo: 2,
    openCount: 5,
  }),
  makeBookmark({
    id: "bm-figma",
    name: "Figma Community",
    url: "https://www.figma.com/community",
    description: "Figma 社群資源，提供大量免費 UI 範本與設計系統。",
    categoryId: "cat-design",
    tags: ["範本", "UI"],
    favorite: true,
    createdDaysAgo: 10,
    openCount: 12,
  }),
  makeBookmark({
    id: "bm-mdn",
    name: "MDN Web Docs",
    url: "https://developer.mozilla.org",
    description: "前端與 Web API 權威文件，查語法與瀏覽器相容性的首選。",
    categoryId: "cat-frontend",
    tags: ["文件", "學習"],
    favorite: true,
    createdDaysAgo: 30,
    openCount: 40,
  }),
  makeBookmark({
    id: "bm-github",
    name: "GitHub",
    url: "https://github.com",
    description: "程式碼託管與版本控制平台，收藏喜歡的開源專案。",
    categoryId: "cat-frontend",
    tags: ["GitHub", "工具"],
    createdDaysAgo: 45,
    openCount: 28,
  }),
  makeBookmark({
    id: "bm-excalidraw",
    name: "Excalidraw",
    url: "https://excalidraw.com",
    description: "手繪風格線上白板工具，適合畫流程圖與示意圖。",
    categoryId: "cat-design",
    tags: ["繪圖", "工具"],
    createdDaysAgo: 5,
    openCount: 8,
  }),
  makeBookmark({
    id: "bm-googlefonts",
    name: "Google Fonts",
    url: "https://fonts.google.com",
    description: "免費開源字體庫，支援多國語言與網頁嵌入。",
    categoryId: "cat-design",
    tags: ["字體", "資源"],
    createdDaysAgo: 20,
    openCount: 6,
  }),
  makeBookmark({
    id: "bm-uipatterns",
    name: "UI Patterns",
    url: "https://ui-patterns.com",
    description: "整理常見 UI 互動模式與設計範例的參考網站。",
    categoryId: "cat-frontend",
    tags: ["UI", "參考"],
    createdDaysAgo: 1,
    openCount: 2,
  }),
  makeBookmark({
    id: "bm-pixiv",
    name: "Pixiv",
    url: "https://www.pixiv.net",
    description: "插畫與創作分享社群，收藏喜歡的畫師與作品集。",
    categoryId: "cat-acgn",
    tags: ["插畫", "ACGN"],
    favorite: true,
    createdDaysAgo: 15,
    openCount: 18,
  }),
];
