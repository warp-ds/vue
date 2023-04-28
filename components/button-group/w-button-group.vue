<template>
  <div class="inline-flex rounded-4 overflow-hidden" :class="classes">
    <slot />
  </div>
</template>

<script>
export default { name: 'wButtonGroup' }
</script>

<script setup>
import { provide, computed, toRef } from 'vue'

const props = defineProps({
  outlined: Boolean,
  raised: Boolean,
  vertical: Boolean
})

provide('outlined', toRef(props, 'outlined'))
provide('vertical', toRef(props, 'vertical'))

const classes = computed(() => ({
  ['shadow-small']: props.raised,
  [props.vertical ? 'divide-y' : 'divide-x']: !props.outlined,
  ['flex-col']: props.vertical
}))
</script>
