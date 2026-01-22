---
layout: home

hero:
  name: "達明機械手臂教材"
  text: "陽明高中 AI 專班"
  tagline: 從零基礎到參賽的完整教材
  image:
    src: /tm-robot-logo.png
    alt: TM Robot
  actions:
    - theme: brand
      text: 網站說明
      link: /home/guide
    - theme: alt
      text: 關於我們
      link: /home/about

features:
  - title: 歷年電神
    details: 陽明高中歷屆學生於達明舉辦的機械手臂競賽中獲獎的名單。
    link: /home/award
    linkText: 前往膜拜

  - title: 初階教材
    details: 給零基礎的人快速上手機械手臂的操作。
    link: /basic/test
    linkText: 開始學習
  - title: 中階教材
    details: 給想參加比賽的新手學習比賽必備操作技巧。
    link: /intermediate/test
    linkText: 進入中階
  - title: 高階教材
    details: 整合經驗與技巧，專為想在競賽中取得好成績的選手。
    link: /advanced/test
    linkText: 挑戰高階
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: linear-gradient(120deg, #8ec63f 0%, #006583 100%);
}

/* 位置與大小 */
:deep(.VPHero .image-src) {
  transform: translate(-125px, -80px) !important;
  max-width: none !important;
  width: 320px !important;
  height: auto !important;
  transition: opacity 0.2s ease-in-out;
}

:deep(.VPHero .image-container) {
  overflow: visible !important;
}

.dark :root {
  --vp-home-hero-image-filter: drop-shadow(0 0 40px rgba(142, 198, 63, 0.5));
}
</style>

<script setup>
import { onMounted, watchEffect, nextTick } from 'vue'
import { useData } from 'vitepress'

const { isDark } = useData()
const baseUrl = '/YMSH_TMRobot_Textbook/'

const updateImage = () => {
  // 判斷是否在瀏覽器環境 (SSR 安全檢查)
  if (typeof document === 'undefined') return

  nextTick(() => {
    const img = document.querySelector('.VPHero .image-src')
    if (!img) return

    const lightSrc = `${baseUrl}tm-robot-logo.png`
    const darkSrc = `${baseUrl}tm-robot-logo-darkmode.png`
    const targetSrc = isDark.value ? darkSrc : lightSrc

    // 使用 URL 建構子比對路徑，避免比對到完整的 URL 導致失效
    const currentUrl = new URL(img.src, window.location.origin).pathname
    if (currentUrl !== targetSrc) {
      img.style.opacity = '0.5'
      img.src = targetSrc
      img.onload = () => {
        img.style.opacity = '1'
      }
    }
  })
}

onMounted(() => {
  // 預載圖片
  if (typeof window !== 'undefined') {
    const images = [`${baseUrl}tm-robot-logo.png`, `${baseUrl}tm-robot-logo-darkmode.png`]
    images.forEach(src => {
      const img = new Image()
      img.src = src
    })
  }
  updateImage()
})

// 監控切換，確保不影響 SSR 構建
watchEffect(() => {
  if (typeof document !== 'undefined') {
    const _ = isDark.value 
    updateImage()
  }
})
</script>