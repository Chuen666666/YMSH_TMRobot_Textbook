import { defineConfig } from 'vitepress'

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
      { text: '教材',
        items: [
          { text: '初階', link: '/basic/1' },
          { text: '中階', link: '/intermediate/1' },
          { text: '高階', link: '/advanced/1' }
        ]
      },
      { text: '獲獎', link: '/home/award' },
      { text: '說明', link: '/home/guide' },
      { text: '關於', link: '/home/about' }
    ],

    // 側邊欄（教材目錄）
    sidebar: {
      '/basic/': [
          {
            text: '初階教材',
            items: [
              { 'text': '1. 控制器介紹', link: '/basic/1' },
              { 'text': '2. 手臂基礎', link: '/basic/2' },
              { 'text': '3. 收納重點', link: '/basic/3' },
              { 'text': '4. 登入並取得權限', link: '/basic/4' },
              { 'text': '5. 軟體基礎篇', link: '/basic/5' },
              { 'text': '6. 自主練習', link: '/basic/6' }
            ]
          }
        ],
      '/intermediate/': [
          {
            text: '中階教材',
            items: [
              { 'text': '1. 開始練習前與結束後', link: '/intermediate/1' },
              { 'text': '2. 控制器上的紅色大按鈕', link: '/intermediate/2' },
              { 'text': '3. 軟體精熟篇', link: '/intermediate/3' },
              { 'text': '4. 初賽經驗談', link: '/intermediate/4' },
              { 'text': '5. 自主練習', link: '/intermediate/5' }
            ]
          }
        ],
      '/advanced/': [
          {
            text: '高階教材',
            items: [
              { 'text': '1. 軟體大師篇', link: '/advanced/1' },
              { 'text': '2. 決賽經驗談', link: '/advanced/2' },
              { 'text': '3. 更多比賽細節', link: '/advanced/3' },
              { 'text': '4. 一些心裡話', link: '/advanced/4' },
              { 'text': '5. 自主練習', link: '/advanced/5' }
            ]
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