<script setup lang="ts">
import {computed, onBeforeMount, ref} from 'vue';
import {useData} from 'vitepress';

const {lang} = useData();
const offlineReady = ref(false);
const needRefresh = ref(false);
let updateServiceWorker: (() => Promise<void>) | undefined;

const isEnglish = computed(() => lang.value.startsWith('en'));
const message = computed(() => {
  if (needRefresh.value) {
    return isEnglish.value ? 'New textbook content is available.' : '教材已有新版本可供更新。';
  }

  return isEnglish.value ? 'The textbook is ready for offline use.' : '教材已可離線瀏覽。';
});

function close() {
  offlineReady.value = false;
  needRefresh.value = false;
}

async function refresh() {
  await updateServiceWorker?.();
}

onBeforeMount(async () => {
  const {registerSW} = await import('virtual:pwa-register');
  updateServiceWorker = registerSW({
    immediate: true,
    onOfflineReady: () => {
      offlineReady.value = true;
    },
    onNeedRefresh: () => {
      needRefresh.value = true;
    },
    onRegisterError: (error) => {
      console.error('Service worker registration failed:', error);
    }
  });
});
</script>

<template>
  <Transition name="pwa-toast">
    <aside v-if="offlineReady || needRefresh" class="pwa-prompt" role="status" aria-live="polite">
      <p>{{ message }}</p>
      <div class="pwa-actions">
        <button v-if="needRefresh" class="pwa-primary" type="button" @click="refresh">
          {{ isEnglish ? 'Update now' : '立即更新' }}
        </button>
        <button type="button" @click="close">
          {{ isEnglish ? (needRefresh ? 'Later' : 'Close') : needRefresh ? '稍後' : '關閉' }}
        </button>
      </div>
    </aside>
  </Transition>
</template>

<style scoped>
.pwa-prompt {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 90;
  width: min(360px, calc(100vw - 32px));
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: var(--vp-c-bg-elv);
  box-shadow: var(--vp-shadow-4);
}

.pwa-prompt p {
  margin: 0 0 12px;
  color: var(--vp-c-text-1);
  font-size: 14px;
  font-weight: 600;
}

.pwa-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.pwa-actions button {
  padding: 7px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-weight: 600;
}

.pwa-actions .pwa-primary {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-1);
  color: var(--vp-c-white);
}

.pwa-toast-enter-active,
.pwa-toast-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.pwa-toast-enter-from,
.pwa-toast-leave-to {
  opacity: 0;
  transform: translateY(12px);
}

@media (max-width: 640px) {
  .pwa-prompt {
    right: 16px;
    bottom: 16px;
  }
}
</style>
