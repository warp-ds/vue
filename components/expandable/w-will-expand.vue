<script>
// eslint-disable-next-line vue/no-reserved-props
import { id as key } from '#util';

export default {
  name: 'wWillExpand',
  // eslint-disable-next-line vue/no-reserved-props
  props: { key },
};
</script>

<template>
  <div :key="key">
    <slot />
  </div>
</template>
