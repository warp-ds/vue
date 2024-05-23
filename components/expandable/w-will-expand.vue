<script setup>
import { id as uniqueKey } from '#util';

defineOptions({
  name: 'wWillExpand',
});

const props = defineProps({
  // eslint-disable-next-line vue/no-reserved-props
  key: {
    type: String,
    default: uniqueKey,
  },
});
</script>

<template>
  <div :key="props.key">
    <slot />
  </div>
</template>
