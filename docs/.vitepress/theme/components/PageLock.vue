<template>
  <Transition name="fade">
    <div v-if="isLocked && !isWhiteList" class="lock-screen">
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
          
          <div class="helper-link">
            <a :href="guideUrl">忘記密碼或需要協助？</a>
          </div>
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
const guideUrl = `${BASE_URL}home/recovery`

// 【白名單判定】讓忘記密碼頁面可以直接開啟
const isWhiteList = computed(() => {
  return route.path.includes('/home/recovery')
})

// 【關鍵邏輯】精準判定首頁
const isHomePage = computed(() => {
  let path = route.path
  if (path.startsWith(BASE_URL)) {
    path = path.substring(BASE_URL.length - 1) 
  }
  const cleanPath = path
    .replace(/index\.html$/, '')
    .replace(/\.html$/, '')
    .replace(/\/$/, '')
  return cleanPath === '' || cleanPath === '/'
})

// 【顯示控制】確定解鎖、不是首頁、也不是白名單頁面才顯示按鈕
const showBackButton = computed(() => {
  return !isLocked.value && !isHomePage.value && !isWhiteList.value
})

/**
 * 瀏覽器原生 Web Crypto API 計算 SHA-256
 */
async function sha256(message) {
  const msgUint8 = new TextEncoder().encode(message)
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

// 取得由 Vite 注入的 SHA-256 目標值
const getTargetHash = () => {
  try {
    return __SITE_PASSWORD_HASH__
  } catch (e) {
    // 降級備用：如果 vite 變數未注入，則用 '123456' 的 SHA-256 值
    return '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92'
  }
}

const checkAuth = async () => {
  // 核心修正：如果是 SSR 環境（伺服器編譯中），直接跳出，不執行瀏覽器 API
  if (typeof window === 'undefined') return

  const saved = localStorage.getItem('site_auth')
  if (!saved) {
    isLocked.value = true
    return
  }
  
  try {
    const { hash, time } = JSON.parse(saved)
    const targetHash = getTargetHash()
    
    if (hash === targetHash && (Date.now() - time) < EXPIRE_MS) {
      isLocked.value = false
    } else {
      localStorage.removeItem('site_auth')
      isLocked.value = true
    }
  } catch (e) {
    isLocked.value = true
  }
}

// 監控路由
watch(() => route.path, () => {
  // 只有在瀏覽器環境才執行
  if (typeof window !== 'undefined') {
    checkAuth()
  }
}, { immediate: true })

const login = async () => {
  if (!inputPassword.value) return

  const inputHash = await sha256(inputPassword.value)
  const targetHash = getTargetHash()

  if (inputHash === targetHash) {
    const authData = {
      hash: inputHash,
      time: Date.now()
    }
    localStorage.setItem('site_auth', JSON.stringify(authData))
    isLocked.value = false
    errorMsg.value = ''
    inputPassword.value = '' // 清除暫存密碼
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
h2 { margin: 0 0 10px; color: var(--vp-c-text-1); font-size: 1.5rem; }
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
  transition: background-color 0.2s;
}
.login-btn:hover { background-color: var(--vp-c-brand-2); }

/* 忘記密碼連結樣式 */
.helper-link {
  margin-top: 20px;
  font-size: 13px;
}
.helper-link a {
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition: color 0.2s;
}
.helper-link a:hover {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
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