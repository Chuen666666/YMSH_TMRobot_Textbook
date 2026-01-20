import { defineConfig } from 'vitepress'

/**
 * 產生混淆後的雜湊值（Base64 + 字串反轉）
 * 這裡的邏輯必須與 PageLock.vue 裡的 hash 函數完全一致
 */
const generateHash = (str: string) => {
  return Buffer.from(str).toString('base64').split('').reverse().join('');
}

export default defineConfig({
  // 1. 基本網站資訊
  base: '/YMSH_TMRobot_Textbook/',
  title: "達明機械手臂",
  description: "陽明高中 AI 專班專屬教材",
  
  // 讓網頁在搜尋引擎中不被索引
  head: [
    ['meta', { name: 'robots', content: 'noindex, nofollow' }]
  ],

  // 2. 主題設定
  themeConfig: {
    // 導覽列
    outline: 'deep',
    nav: [
      { text: '首頁', link: '/' },
      { text: '教材',
        items: [
          { text: '初階：基礎操作', link: '/basic/test' },
          { text: '中階：初賽必備', link: '/intermediate/test' },
          { text: '高階：決賽法寶', link: '/advanced/test' }
        ]
      }
    ],

    // 側邊欄（教材目錄）
    sidebar: {
      '/basic/': [
          {
            text: '初階教材',
            items: [
              { text: '開機與安全', link: '/basic/test' },
              { text: '手動教導點位', link: '/basic/test' },
              { text: '基礎運動指令', link: '/basic/test' }
            ]
          }
        ],
      '/intermediate/': [
          {
            text: '中階教材',
            items: [
              { text: '開機與安全', link: '/basic/test' },
              { text: '手動教導點位', link: '/basic/test' },
              { text: '基礎運動指令', link: '/basic/test' }
            ]
          }
        ],
      '/advanced/': [
          {
            text: '高階教材',
            items: [
              { text: '開機與安全', link: '/basic/test' },
              { text: '手動教導點位', link: '/basic/test' },
              { text: '基礎運動指令', link: '/basic/test' }
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

  // 3. Vite 配置：注入加密所需的變數
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