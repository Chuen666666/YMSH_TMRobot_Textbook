<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

const isEditableTarget = (target: EventTarget | null) => {
  if (!(target instanceof HTMLElement)) return false

  const tagName = target.tagName.toLowerCase()
  return (
    tagName === 'input' ||
    tagName === 'textarea' ||
    tagName === 'select' ||
    target.isContentEditable
  )
}

const getPagerLink = (direction: 'prev' | 'next') => {
  return document.querySelector<HTMLAnchorElement>(`.pager-link.${direction}[href]`)
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return
  if (event.isComposing || isEditableTarget(event.target)) return
  if (document.querySelector('.lock-screen')) return

  const direction = event.key === 'ArrowLeft'
    ? 'prev'
    : event.key === 'ArrowRight'
      ? 'next'
      : null

  if (!direction) return

  const link = getPagerLink(direction)
  if (!link) return

  event.preventDefault()
  link.click()
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>
