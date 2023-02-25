<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import type { VNodeRef } from 'vue'
import { reactive, ref, watch } from 'vue'

const props = defineProps<{
  properties: string[]
  rule: string
}>()

const elRef = ref<HTMLElement>()

const functionRef: VNodeRef = (el) => {
  if (el instanceof HTMLElement)
    elRef.value = el
}

const { width } = useWindowSize()

const computedCssProperties: Record<string, string> = reactive({})

watch([width, elRef, () => props.properties], ([,, properties]) => {
  if (elRef.value) {
    const styles = getComputedStyle(elRef.value)
    for (const property of properties)
      computedCssProperties[property] = styles.getPropertyValue(property)
  }
})
</script>

<template>
  <div class="flex flex-col text-dark bg-light p-4 rounded-4 border-1 border-gray-2">
    <p><code>{{ rule }}</code></p>
    <div class="flex justify-center my-fluid-s">
      <slot :ref="functionRef" />
    </div>
    <p v-for="(value, property) in computedCssProperties" :key="property">
      <i>Computed {{ property }}: {{ value }}</i>
    </p>
  </div>
</template>
