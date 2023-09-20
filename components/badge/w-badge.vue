<script setup>
defineOptions({
  name: 'wBadge',
});

import { badge as ccBadge } from '@warp-ds/css/component-classes';
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
