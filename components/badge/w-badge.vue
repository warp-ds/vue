<script setup>
import { computed } from 'vue';

import { badge as ccBadge } from '@warp-ds/css/component-classes';

defineOptions({
  name: 'wBadge',
});

const props = defineProps({
  as: {
    type: String,
    default: 'div',
  },
  variant: {
    type: String,
    default: 'neutral',
    validator: (value) => {
      return ['neutral', 'info', 'positive', 'warning', 'negative', 'disabled', 'price', 'sponsored'].includes(value);
    },
  },
  position: {
    type: String,
    validator: (value) => ['top-left', 'top-right', 'bottom-right', 'bottom-left'].includes(value),
  },
});

const badgeClasses = computed(() => [
  ccBadge.base,
  ccBadge[props.variant],
  !!props.position && ccBadge.positionBase,
  props.position === 'top-left' && ccBadge.positionTL,
  props.position === 'top-right' && ccBadge.positionTR,
  props.position === 'bottom-right' && ccBadge.positionBR,
  props.position === 'bottom-left' && ccBadge.positionBL,
]);
</script>

<template>
  <component :is="as" :class="badgeClasses">
    <slot />
  </component>
</template>
