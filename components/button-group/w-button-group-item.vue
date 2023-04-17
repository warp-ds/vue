<script setup>
import { inject, computed } from 'vue'

const props = defineProps({ selected: Boolean });
const outlined = inject('outlined', false);

const wrapperClass = computed(() => [
  'relative last-child:mb-0 hover:i-bg-$gray-50 active:i-bg-$bg-gray-100',
  outlined.value ? 'i-border-$gray-300' : 'border-transparent',
  props.selected ? 'i-bg-$gray-200 hover:i-bg-$gray-300 active:i-bg-$gray-400' : 'i-bg-$white'
]);
</script>

<template>
  <div :class="wrapperClass">
    <slot />
  </div>
</template>

<script>
export default { name: 'wButtonGroupItem' }
</script>
