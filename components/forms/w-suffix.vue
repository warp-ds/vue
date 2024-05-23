<script setup>
import { onMounted } from 'vue';

import { suffix as c } from '@warp-ds/css/component-classes';
import IconClose16 from '@warp-ds/icons/vue/close-16';
import IconSearch16 from '@warp-ds/icons/vue/search-16';

defineOptions({
  name: 'wSuffix',
});

const props = defineProps({
  clear: Boolean,
  search: Boolean,
  label: String,
});

onMounted(() => {
  console.warn('w-suffix is deprecated and will be removed in a future version, please switch to w-affix');
});
</script>

<template>
  <component
    :is="props.label ? 'div' : 'button'"
    :class="{ [c.wrapper]: true, [props.label ? c.wrapperWithIcon : c.wrapperWithLabel]: true }">
    <icon-close-16 v-if="props.clear" />
    <icon-search-16 v-else-if="props.search" />
    <span v-else-if="props.label" :class="c.label">{{ props.label }}</span>
  </component>
</template>
