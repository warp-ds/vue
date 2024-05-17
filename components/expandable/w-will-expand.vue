<template>
  <div :key="key">
    <slot />
  </div>
</template>

<script>
// eslint-disable-next-line vue/no-reserved-props
import { id as key } from '#util';

export default {
  name: 'WWillExpand',
  // eslint-disable-next-line vue/no-reserved-props
  props: { key },
};
</script>
