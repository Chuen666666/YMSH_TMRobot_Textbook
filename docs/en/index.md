---
layout: home

hero:
  name: "TM Robot Textbook"
  text: "YMSH AI Program"
  tagline: A complete guide from zero basics to competition prep
  image:
    src: /tm-robot-logo.png
    alt: TM Robot
  actions:
    - theme: brand
      text: Site Guide
      link: /en/home/guide
    - theme: alt
      text: About Us
      link: /en/home/about

features:
  - title: Hall of Fame
    details: A list of YMSH students who won awards in TM Robot arm competitions.
    link: /en/home/award
    linkText: Go pay respect

  - title: Basic Lessons
    details: For complete beginners who want to get hands-on with the robot arm fast.
    link: /en/basic/1
    linkText: Start learning
  - title: Intermediate Lessons
    details: For newer competitors who want to learn the must-have skills for competition.
    link: /en/intermediate/1
    linkText: Enter intermediate
  - title: Advanced Lessons
    details: Experience and techniques for players who want strong competition results.
    link: /en/advanced/1
    linkText: Challenge advanced
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: linear-gradient(120deg, #8ec63f 0%, #006583 100%);
}

/* Position and size */
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
  if (typeof document === 'undefined') return

  nextTick(() => {
    const img = document.querySelector('.VPHero .image-src')
    if (!img) return

    const lightSrc = `${baseUrl}tm-robot-logo.png`
    const darkSrc = `${baseUrl}tm-robot-logo-darkmode.png`
    const targetSrc = isDark.value ? darkSrc : lightSrc

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
  if (typeof window !== 'undefined') {
    const images = [`${baseUrl}tm-robot-logo.png`, `${baseUrl}tm-robot-logo-darkmode.png`]
    images.forEach(src => {
      const img = new Image()
      img.src = src
    })
  }
  updateImage()
})

watchEffect(() => {
  if (typeof document !== 'undefined') {
    const _ = isDark.value
    updateImage()
  }
})
</script>
