<script setup>
import { computed } from 'vue';

import { badge as ccBadge } from '@warp-ds/css/component-classes';

defineOptions({
  name: 'WBadge',
});

const props = defineProps({
  as: {
    type: String,
    default: 'div',
  },
  variant: {
    type: String,
    default: 'neutral',
    validator: (value) => ['neutral', 'info', 'positive', 'warning', 'negative', 'disabled', 'notification', 'price'].includes(value),
  },
  position: {
    type: String,
    validator: (value) => ['top-left', 'top-right', 'bottom-right', 'bottom-left'].includes(value),
  },
});

const badgeClasses = computed(() => [
  ccBadge.base,
  ccBadge[props.variant],
  {
    [ccBadge.positionBase]: props.position,
    [ccBadge.positionTL]: props.position === 'top-left',
    [ccBadge.positionTR]: props.position === 'top-right',
    [ccBadge.positionBR]: props.position === 'bottom-right',
    [ccBadge.positionBL]: props.position === 'bottom-left',
  },
]);
</script>

<template>
  <component :is="as" :class="badgeClasses">
    <slot />
  </component>
</template>
