import { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Icon from './components/Icon.vue'
import PageLock from './components/PageLock.vue'
import KeyboardPager from './components/KeyboardPager.vue'
import { h } from 'vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'doc-before': () => [h(PageLock), h(KeyboardPager)],
      'home-hero-before': () => h(PageLock)
    })
  },
  enhanceApp({ app }) {
    app.component('Icon', Icon)
    app.component('PageLock', PageLock)
    app.component('KeyboardPager', KeyboardPager)
  }
} satisfies Theme
