# 陽明高中達明機械手臂教材

這是一套提供臺北市立陽明高中 AI 專班使用的達明機械手臂教材。網站以 VitePress 建置，內容包含初階、中階與高階課程，並提供繁體中文及英文版本。

網站：<https://chuen666666.github.io/YMSH_TMRobot_Textbook/>

> 本教材僅供校內教學使用，請勿公開教材內容、網站密碼或其他受限制資訊。

## 開發環境

- Node.js 18 以上版本
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

| 指令                   | 用途               |
| ---------------------- | ------------------ |
| `npm run docs:dev`     | 啟動本機開發伺服器 |
| `npm run docs:build`   | 建置正式版網站     |
| `npm run docs:preview` | 預覽正式版建置結果 |

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
├─ .github/workflows/   # GitHub Pages 自動部署流程
└─ package.json         # 相依套件與 npm 指令
```

## 編輯與驗證

教材頁面使用 Markdown 撰寫。新增頁面後，請同步更新
`docs/.vitepress/config.mts` 中對應語言的導覽列或側邊欄設定；圖片請放在
`docs/public/`，並以網站根目錄路徑引用，例如 `/robot_arm.png`。

完成修改後，執行以下指令確認網站可正常建置：

```bash
npm run docs:build
```

推送至 `main` 分支後，GitHub Actions 會使用儲存庫中的 `SITE_PASSWORD` Secret 建置並部署至 GitHub Pages。
