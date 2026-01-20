<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 宣告由 Vite 注入的全域變數
declare const __SITE_PASSWORD_HASH__: string

const isUnlocked = ref(false)
const inputPassword = ref('')
const error = ref(false)

/**
 * 簡易雜湊函式：Base64 編碼後反轉字串
 * 目的：防止密碼以明文形式存在 LocalStorage 或原始碼中
 */
const hash = (str: string) => {
  return btoa(str).split('').reverse().join('')
}

onMounted(() => {
  // 檢查瀏覽器是否已有正確的解鎖紀錄
  if (localStorage.getItem('site_unlocked') === __SITE_PASSWORD_HASH__) {
    isUnlocked.value = true
  }
})

const checkPassword = () => {
  if (hash(inputPassword.value) === __SITE_PASSWORD_HASH__) {
    localStorage.setItem('site_unlocked', __SITE_PASSWORD_HASH__)
    isUnlocked.value = true
    error.value = false
  } else {
    error.value = true
    inputPassword.value = '' // 清空輸入框
  }
}
</script>

<template>
  <Transition name="fade">
    <div v-if="!isUnlocked" class="lock-overlay">
      <div class="lock-card">
        <div class="icon-header">🔒</div>
        <h2>達明機械手臂教材</h2>
        <p>陽明高中 AI 專班專屬內容</p>
        
        <div class="input-group">
          <input 
            v-model="inputPassword" 
            type="password" 
            @keyup.enter="checkPassword"
            placeholder="請輸入訪問密碼"
            autofocus
          />
          <button @click="checkPassword">
            驗證並進入
          </button>
        </div>

        <Transition name="shake">
          <p v-if="error" class="error-msg">
            ⚠️ 密碼錯誤，請向陽明高中圖書館詢問
          </p>
        </Transition>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* 背景遮罩：科技感深藍漸層 */
.lock-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: radial-gradient(circle at center, #1e293b 0%, #0f172a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
}

/* 登入卡片：毛玻璃效果 */
.lock-card {
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  padding: 3rem 2.5rem;
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  max-width: 420px;
  width: 90%;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.icon-header {
  font-size: 3rem;
  margin-bottom: 1rem;
}

h2 {
  color: #f8fafc;
  font-size: 1.75rem;
  font-weight: 800;
  margin: 0;
  letter-spacing: -0.025em;
}

p {
  color: #94a3b8;
  font-size: 0.95rem;
  margin-top: 0.5rem;
  margin-bottom: 2rem;
}

/* 輸入框與按鈕組合 */
.input-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

input {
  width: 100%;
  padding: 1rem 1.2rem;
  background: rgba(15, 23, 42, 0.8);
  border: 2px solid #334155;
  border-radius: 14px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.2s ease;
  outline: none;
}

input:focus {
  border-color: #38bdf8;
  box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.15);
}

button {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #38bdf8 0%, #0284c7 100%);
  color: white;
  border: none;
  border-radius: 14px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

button:hover {
  filter: brightness(1.1);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(2, 132, 199, 0.3);
}

button:active {
  transform: translateY(0);
}

.error-msg {
  color: #fb7185;
  font-size: 0.85rem;
  margin-top: 1.5rem;
  margin-bottom: 0;
  font-weight: 600;
}

/* 進出場動畫 */
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-leave-to {
  opacity: 0;
}

/* 錯誤抖動動畫 */
.shake-enter-active {
  animation: shake 0.4s;
}
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-6px); }
  75% { transform: translateX(6px); }
}
</style>