<script setup>
import { box as ccBox } from '@warp-ds/component-classes';
import { computed } from 'vue';

const props = defineProps({
  as: { type: String, default: 'div' },
  bleed: Boolean,
  // TODO: clickable should be marked as deprecated in the docs (and refer to use card instead) and then be removed.
  clickable: Boolean,
  // TODO: According to the Figma design info, neutral and bordered are variants and shouldn't be combinable.
  //       It might be better to have a type/variant prop and have info or bordered as possible values?
  //       ...and then treat neutral as the default when type is not set?
  info: Boolean,
  neutral: Boolean,
  bordered: Boolean
});

const boxClasses = computed(() => [
  ccBox.box,
  {
    [ccBox.bleed]: props.bleed,
    'i-bg-$color-box-info-background': props.info,
    'i-bg-$color-box-neutral-background': props.neutral,
    'border-2 i-border-$color-box-bordered-border i-bg-$color-box-bordered-background': props.bordered,
    'hover:active:i-bg-$color-box-info-background-hover': props.clickable && props.info,
    'hover:active:i-bg-$color-box-neutral-background-hover': props.clickable && props.neutral,
    'hover:i-bg-$color-box-bordered-background-hover active:i-bg-$color-box-bordered-background-hover hover:i-border-$color-box-bordered-border-hover active:i-border-$color-box-bordered-border-hover': props.clickable && props.bordered
  }
]);
</script>

<template>
  <component :is="as" :class="boxClasses">
    <slot />
  </component>
</template>

<script>
export default { name: 'wBox' };
</script>
