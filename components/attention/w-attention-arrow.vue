<script setup>
  import { computed } from 'vue'
  import { opposites, arrowDirectionClassname } from '@warp-ds/core/attention'
  import { props as attentionProps, getVariantClasses } from './attentionUtil.js'
  import { attention as ccAttention } from '@warp-ds/css/component-classes'
  
  const props = defineProps({
    ...attentionProps,
    direction: String
  })
  const arrowDirection = computed(() => opposites[props.direction])

  const arrowClasses = computed(() => [
    ccAttention.arrowBase,
    ccAttention[`arrowDirection${arrowDirectionClassname(arrowDirection.value)}`],
    getVariantClasses(props).arrow
  ]);
</script>

<template>
  <div :class="arrowClasses"/>
</template>

<script>
export default { name: 'wAttentionArrow' };
</script>

