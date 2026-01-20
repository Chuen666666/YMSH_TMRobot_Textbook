import { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Icon from './components/Icon.vue'
import PageLock from './components/PageLock.vue'
import { h } from 'vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    // 將 PageLock 放在 Layout 最上方
    return h(DefaultTheme.Layout, null, {
      'layout-top': () => h(PageLock) 
    })
  },
  enhanceApp({ app }) {
    app.component('Icon', Icon)
  }
} satisfies Theme