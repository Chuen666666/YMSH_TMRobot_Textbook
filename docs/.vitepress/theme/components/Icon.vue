<template>
  <img 
    :src="withBase(`/${name}.png`)" 
    class="tm-icon"
    :alt="name"
  />
</template>

<script setup lang="ts">
import { withBase } from 'vitepress'
defineProps<{
  name: string
}>()
</script>

<style scoped>
.tm-icon {
  height: 1.4em; /* 比字體稍微大一點點 */
  display: inline-block;
  vertical-align: middle;
  margin: 0 3px;
  border-radius: 3px;
  /* 視情況加入陰影或邊框 */
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}
</style>