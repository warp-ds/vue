<script setup>
defineOptions({
  name: 'wBadge',
});

//import { badge as ccBadge } from '@warp-ds/css/component-classes';
const ccBadge = {
  base: 'py-4 px-8 border-0 rounded-4 text-xs inline-flex',
  neutral: 'i-bg-$color-badge-neutral-background i-text-$color-badge-neutral-text',
  info: 'i-bg-$color-badge-info-background i-text-$color-badge-info-text',
  positive: 'i-bg-$color-badge-positive-background i-text-$color-badge-positive-text',
  warning: 'i-bg-$color-badge-warning-background i-text-$color-badge-warning-text',
  negative: 'i-bg-$color-badge-negative-background i-text-$color-badge-negative-text',
  disabled: 'i-bg-$color-badge-disabled-background i-text-$color-badge-disabled-text',
  price: 'i-bg-$color-badge-price-background i-text-$color-badge-price-text',
  notification: 'i-bg-$color-badge-notification-background i-text-$color-badge-notification-text',
  positionBase: 'absolute backdrop-blur',
  positionTL: 'rounded-tl-0 rounded-tr-0 rounded-bl-0 top-0 left-0',
  positionTR: 'rounded-tl-0 rounded-tr-0 rounded-br-0 top-0 right-0',
  positionBR: 'rounded-tr-0 rounded-br-0 rounded-bl-0 bottom-0 right-0',
  positionBL: 'rounded-tl-0 rounded-br-0 rounded-bl-0 bottom-0 left-0',
};

import { computed } from 'vue';

const props = defineProps({
  as: { type: String, default: 'div' },
  type: {
    type: String,
    default: 'neutral',
    validator: (value) => ['neutral', 'info', 'positive', 'warning', 'negative', 'disabled', 'notification', 'price'].includes(value)
  },
  position: {
    type: String,
    validator: (value) => ['tl', 'tr', 'br', 'bl'].includes(value)
  },
});

const badgeClasses = computed(() => [
  ccBadge.base,
  ccBadge[props.type],
  {
    [ccBadge.positionBase]: props.position,
    [ccBadge.positionTL]: props.position === 'tl',
    [ccBadge.positionTR]: props.position === 'tr',
    [ccBadge.positionBR]: props.position === 'br',
    [ccBadge.positionBL]: props.position === 'bl',
  }
]);
</script>

<template>
  <component :is="as" :class="badgeClasses">
    <slot />
  </component>
</template>
