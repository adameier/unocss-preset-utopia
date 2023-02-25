<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { ref, watch } from 'vue'

defineProps<{
  scale: number
}>()

const { width } = useWindowSize()

const textEl = ref<HTMLElement>()

const computedFontSize = ref<string>()

watch([width, textEl], () => {
  if (textEl.value) {
    const { fontSize } = getComputedStyle(textEl.value)
    computedFontSize.value = fontSize
  }
})
</script>

<template>
  <div class="text-dark bg-light p-4 rounded-4 border-1 border-gray-2">
    <p><code>text-fluid-{{ scale }}</code></p>
    <p
      ref="textEl"
      class="leading-none font-bold pb-0.2em"
      :class="`text-fluid-${scale}`"
    >
      Step {{ scale }}
    </p>
    <p v-if="computedFontSize">
      <i> Computed font-size: {{ computedFontSize }}</i>
    </p>
  </div>
</template>
