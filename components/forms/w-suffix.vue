<template>
  <component :is="label ? 'div' : 'button'" :class="{ [c.wrapper]: true, [label ? c.wrapperWithIcon : c.wrapperWithLabel]: true }">
    <icon-close-16 v-if="clear" />
    <icon-search-16 v-else-if="search" />
    <span v-else-if="label" :class="c.label">{{ label }}</span>
  </component>
</template>

<script>
import { onMounted } from 'vue';

import { suffix as c } from '@warp-ds/css/component-classes';
// eslint-disable-next-line no-unused-vars
import IconClose16 from '@warp-ds/icons/vue/close-16';
// eslint-disable-next-line no-unused-vars
import IconSearch16 from '@warp-ds/icons/vue/search-16';

export default {
  name: 'WSuffix',
  props: {
    clear: Boolean,
    search: Boolean,
    label: String,
  },
  setup: () => {
    onMounted(() => {
      console.warn('w-suffix is deprecated and will be removed in a future version, please switch to w-affix');
    });
    return { c };
  },
};
</script>
