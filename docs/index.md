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
  --vp-home-hero-image-filter: drop-shadow(0 0 30px rgba(142, 198, 63, 0.3));
}

/* 調整圖片位置與動畫 */
.VPHero .image-src {
  animation: float 4s ease-in-out infinite;
  transition: content 0.3s ease;
  transform: translate(-40px, -30px);
}

/* 暗色模式圖 */
.dark .VPHero .image-src {
  content: url('/tm-robot-logo-darkmode.png');
}

.VPHero .image-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

@keyframes float {
  0%, 100% { transform: translate(-40px, -30px); }
  50% { transform: translate(-40px, -45px); }
}

.dark :root {
  --vp-home-hero-image-filter: drop-shadow(0 0 40px rgba(142, 198, 63, 0.5));
}

/* 行動裝置適應：手機上通常建議置中，不要位移 */
@media (max-width: 640px) {
  .VPHero .image-src {
    transform: translate(0, 0);
  }
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
}
</style>