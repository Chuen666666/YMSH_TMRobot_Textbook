import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'

// 自動抓取資料夾內檔案的函式
function getSidebarItems(dirName: string) {
  // 取得該資料夾的絕對路徑
  const dirPath = path.resolve(__dirname, `../${dirName}`);

  // 讀取檔案列表
  return fs.readdirSync(dirPath)
      .filter(file => file.endsWith('.md') && file !== 'index.md') // 只抓 .md，排除首頁
      .map(file => {
        const name = file.replace('.md', '');
        return {
          text: name, // 這裡暫時用檔名當文字
          link: `/${dirName}/${name}`
        };
      });
  }

/**
 * 產生混淆後的雜湊值（Base64 + 字串反轉）
 * 這裡的邏輯必須與 PageLock.vue 裡的 hash 函數完全一致
 */
const generateHash = (str: string) => {
  return Buffer.from(str).toString('base64').split('').reverse().join('');
}

export default defineConfig({
  // 基本網站資訊
  base: '/YMSH_TMRobot_Textbook/',
  title: "機械手臂教學",
  description: "給陽明高中 AI 學生專班專屬的達明機械手臂教材",
  
  // 讓網頁在搜尋引擎中不被索引
  head: [
    ['meta', { name: 'robots', content: 'noindex, nofollow' }]
  ],

  // 主題設定
  themeConfig: {
    // 導覽列
    outline: 'deep',
    nav: [
      { text: '首頁', link: '/' },
      { text: '說明', link: '/home/guide' },
      { text: '關於', link: '/home/about' },
      { text: '教材',
        items: [
          { text: '初階', link: '/basic/test' },
          { text: '中階', link: '/intermediate/test' },
          { text: '高階', link: '/advanced/test' }
        ]
      },
      { text: '獲獎', link: '/home/award' }
    ],

    // 側邊欄（教材目錄）
    sidebar: {
      '/basic/': [
          {
            text: '初階教材',
            items: getSidebarItems('basic')
          }
        ],
      '/intermediate/': [
          {
            text: '中階教材',
            items: getSidebarItems('intermediate')
          }
        ],
      '/advanced/': [
          {
            text: '高階教材',
            items: getSidebarItems('advanced')
          }
          ]
            },

    // 搜尋功能
    search: {
      provider: 'local'
    },

    // 頁尾
    footer: {
      message: '陽明高中 AI 專班專屬教材',
      copyright: `Copyright © ${new Date().getFullYear()} 陽明高中 AI 專班`
    }
  },

  // Vite 配置：注入加密所需的變數
  vite: {
    define: {
      // 這裡會讀取系統環境變數 SITE_PASSWORD，若無則預設為 123456
      __SITE_PASSWORD_HASH__: JSON.stringify(
        generateHash(process.env.SITE_PASSWORD || '123456')
      )
    },
    // 如果你有使用自定義組件，這能確保編譯順暢
    ssr: {
      noExternal: ['@vue/repl']
    }
  }
})