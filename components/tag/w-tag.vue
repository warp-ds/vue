<script setup>
import { ribbon as ccRibbon } from '@warp-ds/css/component-classes'
import { computed, onMounted } from 'vue'

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
});

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

onMounted(() => {
  console.warn('w-tag is deprecated and will be removed in a future version, please switch to w-badge')
});
</script>

<template>
  <div :class="baseClasses">
    <slot />
  </div>
</template>

<script>
export default { name: 'wTag' }
</script>


