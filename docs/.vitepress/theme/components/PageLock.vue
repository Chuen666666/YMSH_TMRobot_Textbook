<template>
  <Transition name="fade">
    <div v-if="isLocked" class="lock-screen">
      <div class="lock-box">
        <div class="lock-icon">🔐</div>
        <h2>專班教材存取限制</h2>
        <p>請輸入授權密碼以繼續閱覽</p>
        
        <div class="input-group">
          <input 
            v-model="inputPassword" 
            type="password" 
            placeholder="請輸入密碼" 
            @keyup.enter="login"
          />
          <button @click="login" class="login-btn">進入網站</button>
        </div>
        
        <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>
      </div>
    </div>
  </Transition>

  <Transition name="slide">
    <button 
      v-if="showBackButton" 
      class="back-floating-btn" 
      @click="goBack"
    >
      <span class="arrow">&larr;</span> 返回上一頁
    </button>
  </Transition>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vitepress'

const route = useRoute()
const router = useRouter()
const isLocked = ref(true)
const inputPassword = ref('')
const errorMsg = ref('')

// 設定區
const EXPIRE_MS = 10800000 // 3 小時
const BASE_URL = '/YMSH_TMRobot_Textbook/'

// 【關鍵邏輯】精準判定首頁
const isHomePage = computed(() => {
  let path = route.path
  
  // 1. 移除路徑中的 base 前綴
  if (path.startsWith(BASE_URL)) {
    path = path.substring(BASE_URL.length - 1) 
  }
  
  // 2. 移除常見的首頁後綴與斜槓
  const cleanPath = path
    .replace(/index\.html$/, '')
    .replace(/\.html$/, '')
    .replace(/\/$/, '')
  
  // 3. 如果清理後為空，代表是首頁 (docs/index.md)
  return cleanPath === '' || cleanPath === '/'
})

// 【顯示控制】確定解鎖且不是首頁才顯示按鈕
const showBackButton = computed(() => {
  return !isLocked.value && !isHomePage.value
})

// 安全驗證相關函式
const getHash = (str) => {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) hash = (hash * 33) ^ str.charCodeAt(i);
  return (hash >>> 0).toString(36);
}

const getTarget = () => {
  return import.meta.env.SITE_PASSWORD || '123456'
}

const checkAuth = () => {
  const saved = localStorage.getItem('site_auth')
  if (!saved) {
    isLocked.value = true
    return
  }
  
  try {
    const { hash, time } = JSON.parse(saved)
    const target = getTarget()
    if (hash === getHash(target) && (Date.now() - time) < EXPIRE_MS) {
      isLocked.value = false
    } else {
      localStorage.removeItem('site_auth')
      isLocked.value = true
    }
  } catch (e) {
    isLocked.value = true
  }
}

// 監控路由，切換頁面時立即重新判定
watch(() => route.path, () => {
  checkAuth()
}, { immediate: true })

const login = () => {
  const target = getTarget()
  if (inputPassword.value === target) {
    const authData = {
      hash: getHash(target),
      time: Date.now()
    }
    localStorage.setItem('site_auth', JSON.stringify(authData))
    isLocked.value = false
    errorMsg.value = ''
  } else {
    errorMsg.value = '密碼錯誤'
    inputPassword.value = ''
  }
}

const goBack = () => {
  if (isHomePage.value) return 
  if (window.history.length > 1) {
    window.history.back()
  } else {
    router.go(BASE_URL)
  }
}

onMounted(checkAuth)
</script>

<style scoped>
/* 鎖定層 */
.lock-screen {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background-color: var(--vp-c-bg);
  z-index: 9999;
  display: flex;
  align-items: center; justify-content: center;
}

.lock-box {
  width: 90%; max-width: 400px;
  padding: 40px 30px;
  text-align: center;
  border-radius: 20px;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  box-shadow: var(--vp-shadow-5);
}

.lock-icon { font-size: 48px; margin-bottom: 20px; }
h2 { margin: 0 0 10px; color: var(--vp-c-text-1); }
p { color: var(--vp-c-text-2); font-size: 14px; }

.input-group { margin-top: 30px; }
input {
  width: 100%; padding: 12px 15px; border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg); color: var(--vp-c-text-1);
  margin-bottom: 15px; outline: none;
}
input:focus { border-color: var(--vp-c-brand-1); }

.login-btn {
  width: 100%; padding: 12px; border-radius: 8px;
  background-color: var(--vp-c-brand-1); color: white;
  font-weight: bold; cursor: pointer; border: none;
}

.error-msg { color: #e74c3c; margin-top: 15px; font-weight: bold; }

/* 懸浮返回按鈕 */
.back-floating-btn {
  position: fixed;
  bottom: 40px; left: 40px;
  z-index: 100;
  padding: 12px 24px;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  border-radius: 50px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  display: flex;
  align-items: center; gap: 10px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.back-floating-btn:hover {
  background-color: var(--vp-c-brand-1);
  color: white;
  transform: translateY(-5px);
}

.arrow { font-size: 20px; }

/* 動畫效果 */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.slide-enter-active, .slide-leave-active { transition: all 0.3s ease; }
.slide-enter-from, .slide-leave-to { opacity: 0; transform: translateX(-30px); }

@media (max-width: 768px) {
  .back-floating-btn { bottom: 25px; left: 20px; padding: 10px 18px; font-size: 14px; }
}
</style>