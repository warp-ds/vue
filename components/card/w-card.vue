<script setup>
import { computed } from 'vue';

import { card as ccCard } from '@warp-ds/css/component-classes';

defineOptions({
  name: 'wCard',
});

const props = defineProps({
  as: { type: String, default: 'div' },
  selected: Boolean,
  flat: Boolean,
});

const containerClasses = computed(() => [
  ccCard.base,
  props.flat ? ccCard.flat : ccCard.shadow,
  props.selected && !props.flat && ccCard.selected,
  props.selected && props.flat ? ccCard.flatSelected : ccCard.flatUnselected,
]);

const outlineClasses = computed(() => [ccCard.outline, props.selected ? ccCard.outlineSelected : ccCard.outlineUnselected]);
</script>

<template>
  <component :is="as" :class="containerClasses">
    <div v-if="!flat" :class="outlineClasses" />
    <slot />
  </component>
</template>
