<script setup>
import { ref, onMounted } from 'vue'

const isLocked = ref(true)
const inputPassword = ref('')
const EXPIRE_TIME = 3 * 60 * 60 * 1000 // 3 小時（ms）

// 簡單的雜湊函數，增加破解難度
const hashPassword = (str) => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0 
  }
  return hash.toString(36)
}

const checkLock = () => {
  const authData = localStorage.getItem('site_auth')
  if (authData) {
    try {
      const { token, timestamp } = JSON.parse(authData)
      const now = new Date().getTime()
      
      // 檢查是否過期且 Token 是否符合
      if (now - timestamp < EXPIRE_TIME && token === hashPassword(__SITE_PASSWORD_HASH__)) {
        isLocked.ref = false
        return
      }
    } catch (e) {
      localStorage.removeItem('site_auth')
    }
  }
  isLocked.value = true
}

const login = () => {
  // 這裡的邏輯：將使用者輸入進行雜湊，與 config.mts 傳進來的加密值比對
  // 注意：__SITE_PASSWORD_HASH__ 是你在 config.mts 裡定義的
  const inputHash = hashPassword(inputPassword.value)
  const targetHash = hashPassword(window.atob(__SITE_PASSWORD_HASH__).split('').reverse().join(''))

  if (inputHash === targetHash) {
    const authData = {
      token: hashPassword(__SITE_PASSWORD_HASH__),
      timestamp: new Date().getTime()
    }
    localStorage.setItem('site_auth', JSON.stringify(authData))
    isLocked.value = false
  } else {
    alert('密碼錯誤！')
  }
}

onMounted(() => {
  checkLock()
})
</script>