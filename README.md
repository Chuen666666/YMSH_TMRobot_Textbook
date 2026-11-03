# 陽明高中達明機械手臂教材

這是一套提供臺北市立陽明高中 AI 專班使用的達明機械手臂教材。網站以 VitePress 建置，內容包含初階、中階與高階課程，並提供繁體中文及英文版本。

網站：<https://tm.chuen666666.com/>

舊網址 <https://chuen666666.com/YMSH_TMRobot_Textbook/> 會自動導向主網址。

> 本教材僅供校內教學使用，請勿公開教材內容、網站密碼或其他受限制資訊。

## 開發環境

- Node.js 22.14 以上版本
- npm

## 本機執行

```bash
npm install
npm run docs:dev
```

啟動後，依終端機顯示的網址開啟本機網站。

網站預設密碼為 `123456`。如需使用其他密碼，可在啟動或建置前設定 `VITE_SITE_PASSWORD` 環境變數：

```powershell
$env:VITE_SITE_PASSWORD = "your-password"
npm run docs:dev
```

## 常用指令

| 指令                     | 用途                   |
| ------------------------ | ---------------------- |
| `npm run docs:dev`       | 啟動本機開發伺服器     |
| `npm run docs:build`     | 建置正式版網站         |
| `npm run docs:preview`   | 預覽正式版建置結果     |
| `npm run lint:md`        | 檢查 Markdown 規範     |
| `npm run format:md`      | 格式化所有 Markdown    |
| `npm run format`         | 格式化受支援的專案檔案 |
| `npm run format:check`   | 檢查專案檔案格式       |
| `npm run validate:names` | 驗證雙語姓名登錄檔     |
| `npm run check`          | 執行格式、lint 與建置  |

## 專案結構

```text
TMRobot/
├─ docs/
│  ├─ basic/            # 繁體中文初階教材
│  ├─ intermediate/     # 繁體中文中階教材
│  ├─ advanced/         # 繁體中文高階教材
│  ├─ en/               # 英文版教材
│  ├─ home/             # 首頁相關頁面
│  ├─ public/           # 圖片等靜態資源
│  └─ .vitepress/       # VitePress 設定與自訂元件
├─ schemas/             # JSON Schema
├─ scripts/             # 專案驗證腳本
├─ name-translations.json # 雙語姓名與來源登錄檔
├─ .github/workflows/   # GitHub Pages 自動部署流程
└─ package.json         # 相依套件與 npm 指令
```

## 編輯與驗證

教材頁面使用 Markdown 撰寫。新增頁面後，請同步更新
`docs/.vitepress/config.mts` 中對應語言的導覽列或側邊欄設定；圖片請放在
`docs/public/`，並以網站根目錄路徑引用，例如 `/robot_arm.png`。

翻譯人名以前，請先查閱 `name-translations.json`，並直接沿用其中已確認的顯示值。
若要修改既有人名，請先更新登錄檔的翻譯、來源與狀態，再同步修改所有引用頁面。
變更後可執行 `npm run validate:names`，檢查 Schema、重複姓名、來源路徑及登錄值是否
與頁面一致。

建議在 VS Code 安裝專案推薦的 Prettier 與 markdownlint 擴充套件；Markdown 檔案會在儲存時格式化並顯示 lint 問題。完成修改後，執行以下指令同時檢查 Markdown 格式、lint 與網站建置：

```bash
npm run check
```

推送至 `main` 分支後，GitHub Actions 會使用儲存庫中的 `SITE_PASSWORD` Secret 建置並部署至 GitHub Pages，並將自訂網域設為 `tm.chuen666666.com`。DNS 需將 `tm` 的 CNAME 指向 `chuen666666.github.io`。

## PWA 與離線瀏覽

網站支援安裝為 PWA。使用支援的瀏覽器開啟正式網站後，可以透過瀏覽器的
「安裝應用程式」或「加入主畫面」功能安裝。

第一次在線上完整載入網站後，Service Worker 會快取教材頁面與圖片，之後可在
離線時閱讀已快取的內容。網站有新版本時，頁面右下角會顯示更新提示，由使用者
決定何時重新載入。

PWA manifest 與 Service Worker 會在執行 `npm run docs:build` 時產生。若更新
`docs/public/logo.png`，請執行 `npm run pwa:assets` 重新產生各尺寸應用程式圖示，
並將更新後的圖示提交至版本控制。
