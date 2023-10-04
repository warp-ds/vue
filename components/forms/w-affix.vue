<template>
  <component :is="label ? 'div' : 'button'" :class="wrapperClass">
    <icon-close16 v-if="clear" />
    <icon-search16 v-else-if="search" />
    <span :class="labelClass" v-else-if="label">{{ label }}</span>
  </component>
</template>

<script setup>
import { suffix, prefix } from "@warp-ds/css/component-classes";
import { computed } from "vue";
import { IconClose16, IconSearch16 } from "@warp-ds/icons/vue";

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
  [props.label
    ? classBase.value.wrapperWithLabel
    : classBase.value.wrapperWithIcon]: true,
}));

const labelClass = computed(() => classBase.value.label);
</script>

<script>
export default { name: "wAffix" };
</script>
