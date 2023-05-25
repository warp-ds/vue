<script setup>
  import { computed } from 'vue'
  import { props as attentionProps, opposites, rotation } from './attentionUtil.js'
  import { attention as ccAttention } from '@warp-ds/component-classes'
  
  const props = defineProps({
    ...attentionProps,
    direction: String
  })

  const arrowDirectionClassname = (dir) => {
    const direction = dir?.charAt(0).toUpperCase() + dir?.slice(1);

    return `arrowDirection${direction}`;
  }

  const arrowDirection = computed(() => opposites[props.direction])

  const arrowClasses = computed(() => ({
    [ccAttention.arrowBase]: true,
    [ccAttention[arrowDirectionClassname(arrowDirection.value)]]: true,  
    [ccAttention.arrowTooltip]: props.tooltip,
    [ccAttention.arrowCallout]: props.callout,
    [ccAttention.arrowPopover]: props.popover
}));

  const arrowStyle = computed(() => ({
    // TW doesn't let us specify exactly one corner, only whole sides
    borderTopLeftRadius: '4px',
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

