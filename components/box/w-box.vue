<script setup>
import { computed } from 'vue';

import { box as ccBox } from '@warp-ds/css/component-classes';

defineOptions({
  name: 'wBox',
});

const props = defineProps({
  as: { type: String, default: 'div' },
  bleed: Boolean,
  // TODO: According to the Figma design info, neutral and bordered are variants and shouldn't be combinable.
  //       It might be better to have a type/variant prop and have info or bordered as possible values?
  //       ...and then treat neutral as the default when type is not set?
  info: Boolean,
  neutral: Boolean,
  bordered: Boolean,
  role: String,
});

const boxClasses = computed(() => [
  ccBox.base,
  props.bleed && ccBox.bleed,
  props.info && ccBox.info,
  props.neutral && ccBox.neutral,
  props.bordered && ccBox.bordered,
]);

const optOutRoleWithDefault = computed(() => (props.role === '' ? null : props.role ?? 'region'));
</script>

<template>
  <component :is="as" :role="optOutRoleWithDefault" :class="boxClasses">
    <slot />
  </component>
</template>
