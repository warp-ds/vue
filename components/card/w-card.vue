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

const backgroundClass = computed(() => {
  if (props.selected) {
    return props.flat ? ccCard.cardFlatSelected : ccCard.cardSelected;
  } else {
    return props.flat ? ccCard.cardFlatUnselected : ccCard.cardShadowBackground;
  }
});

const containerClasses = computed(() => [ccCard.card, props.flat ? ccCard.cardFlat : ccCard.cardShadow, backgroundClass.value]);

const outlineClasses = computed(() => [ccCard.cardOutline, props.selected ? ccCard.cardOutlineSelected : ccCard.cardOutlineUnselected]);
</script>

<template>
  <component :is="as" :class="containerClasses">
    <div v-if="!flat" :class="outlineClasses" />
    <slot />
  </component>
</template>
