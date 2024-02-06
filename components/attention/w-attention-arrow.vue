<script setup>
  import { computed } from 'vue'
  import { opposites, rotation } from '@warp-ds/core/attention'
  import { props as attentionProps, getVariantClasses } from './attentionUtil.js'
  import { attention as ccAttention } from '@warp-ds/css/component-classes'
  
  const props = defineProps({
    ...attentionProps,
    direction: String
  })

  const arrowDirectionClassname = computed(() => {
    let direction;
    if (/-/.test(arrowDirection.value)) {
      direction = arrowDirection.value
        .split('-')
        .map((d) => d.charAt(0).toUpperCase() + d.slice(1))
        .join('')
    } else {
    direction = arrowDirection.value?.charAt(0).toUpperCase() + arrowDirection.value?.slice(1);
    }
    return `arrowDirection${direction}`;
  })

  const arrowDirection = computed(() => opposites[props.direction])

  const arrowClasses = computed(() => [
    ccAttention.arrowBase,
    ccAttention[arrowDirectionClassname.value],
    getVariantClasses(props).arrow
  ]);

  const arrowStyle = computed(() => ({
    // border alignment is off by a fraction of a pixel, this fixes it
    [`margin-${arrowDirection.value}`]: '-0.5px',
    transform: `rotate(${rotation[arrowDirection.value]}deg)`,
  }))
</script>

<template>
  <div :class="arrowClasses" :style="arrowStyle" />
</template>

<script>
export default { name: 'wAttentionArrow' };
</script>

