<template>
  <div :class="baseClasses">
    <slot />
  </div>
</template>

<script>
export default { name: 'wTag' }
</script>

<script setup>
import { ribbon as ccRibbon } from '@fabric-ds/css/component-classes'
import { computed } from 'vue'

const props = defineProps({
  primary: {
    type: Boolean,
    required: true
  },
  topLeft: Boolean,
  topRight: Boolean,
  bottomLeft: Boolean,
  bottomRight: Boolean,
  info: Boolean,
  success: Boolean,
  warning: Boolean,
  error: Boolean,
  disabled: Boolean,
  sponsored: Boolean,
  neutral: Boolean
})

const baseClasses = computed(() => ({
  [ccRibbon.base]: props.primary,
  [ccRibbon.roundedTopRightBottomLeft]: props.topLeft || props.bottomRight,
  [ccRibbon.roundedTopLeftBottomRight]: props.topRight || props.bottomLeft,
  [ccRibbon.info]: props.info,
  [ccRibbon.success]: props.success,
  [ccRibbon.warning]: props.warning,
  [ccRibbon.error]: props.error,
  [ccRibbon.disabled]: props.disabled,
  [ccRibbon.sponsored]: props.sponsored,
  [ccRibbon.neutral]: props.neutral
}))
</script>
