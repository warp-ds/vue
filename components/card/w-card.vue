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

const containerClasses = computed(() => ({
  [ccCard.card]: true,
  [ccCard.cardShadow]: !props.flat,
  [ccCard.cardSelected]: !props.flat && props.selected,
  [ccCard.cardFlat]: props.flat,
  [props.selected ? ccCard.cardFlatSelected : ccCard.cardFlatUnselected]: props.flat,
}));

// eslint-disable-next-line
const outlineClasses = computed(() => [
  ccCard.cardOutline,
  props.selected ? ccCard.cardOutlineSelected : ccCard.cardOutlineUnselected,
]);
</script>

<template>
  <component :is="as" :class="containerClasses">
    <div v-if="!flat" :class="outlineClasses" />
    <slot />
  </component>
</template>
