<script setup>
import { computed } from 'vue';

// eslint-disable-next-line vue/no-dupe-keys
import { suffix, prefix } from '@warp-ds/css/component-classes';
import IconClose16 from '@warp-ds/icons/vue/close-16';
import IconSearch16 from '@warp-ds/icons/vue/search-16';

const props = defineProps({
  prefix: Boolean,
  suffix: Boolean,
  clear: Boolean,
  search: Boolean,
  label: String,
});

const classBase = computed(() => (props.prefix ? prefix : suffix));

const wrapperClass = computed(() => ({
  [classBase.value.wrapper]: true,
  [props.label ? classBase.value.wrapperWithLabel : classBase.value.wrapperWithIcon]: true,
}));

const labelClass = computed(() => classBase.value.label);
</script>

<template>
  <component :is="label ? 'div' : 'button'" :class="wrapperClass">
    <icon-close-16 v-if="clear" />
    <icon-search-16 v-else-if="search" />
    <span v-else-if="label" :class="labelClass">{{ label }}</span>
  </component>
</template>

<script>
export default { name: 'wAffix' };
</script>
