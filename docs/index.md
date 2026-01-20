---
# https://vitepress.dev/reference/default-theme-home-page
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
  - title: 由淺入深
    details: 教材分為初階、中階、高階，帶你一步步變強。
  - title: 內容詳盡
    details: 以盡可能詳細的操作說明，讓你能僅透過教材就學會使用機械手臂。
  - title: 經驗傳承
    details: 提及學長姐們的參賽經驗與技巧，讓 AI 班學生能在賽場發光發熱。
---

<style>
:root {
  /* 使用 Logo 的綠色與深藍色做漸層 */
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: linear-gradient(120deg, #8ec63f 0%, #006583 100%);
  
  /* 讓 Logo 有淡淡的綠色外光暈，更有科技感 */
  --vp-home-hero-image-filter: drop-shadow(0 0 30px rgba(142, 198, 63, 0.3));
}

/* 讓 Logo 緩慢浮動，增加生動感 */
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

:deep(.VPImage.image-src) {
  animation: float 4s ease-in-out infinite;
}
</style>