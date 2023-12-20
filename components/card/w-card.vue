<script setup>
import { card as ccCard } from '@warp-ds/css/component-classes';
import { computed } from 'vue';

const props = defineProps({
  as: { type: String, default: 'div' },
  selected: Boolean,
  flat: Boolean
})

const outerClasses = computed(() => ({
  [ccCard.card]: true,
  [ccCard.cardShadow]: !props.flat,
  [props.selected ? ccCard.cardSelected : ccCard.cardUnselected]: !props.flat,
  [ccCard.cardFlat]: props.flat,
  [props.selected ? ccCard.cardFlatSelected : ccCard.cardFlatUnselected]: props.flat
}))
const innerClasses = computed(() => ({
  [ccCard.cardOutline]: true,
  [props.selected ? ccCard.cardOutlineSelected : ccCard.cardOutlineUnselected]: true
}))
</script>

<template>
  <component :is="as" :class="outerClasses">
    <div v-if="!flat" :class="innerClasses" />
    <slot />
  </component>
</template>

<script>
export default { name: 'wCard' }
</script>