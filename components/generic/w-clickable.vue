<script setup>
import { computed } from 'vue';

import { clickable as ccClickable } from '@warp-ds/css/component-classes';

import wToggleItem from './w-toggle-item.vue';

const props = defineProps({
  href: String,
  label: Boolean,
  radio: Boolean,
  checkbox: Boolean,
});
const type = computed(() => (props.radio ? 'radio' : 'checkbox'));
const labelClasses = computed(() => ({
  [ccClickable.label]: props.label,
}));
const buttonOrLinkClasses = computed(() => ({
  [ccClickable.buttonOrLink]: true,
  [ccClickable.label]: props.label,
}));
</script>

<template>
  <w-toggle-item v-if="radio || checkbox" :class="ccClickable.toggle" :type="type" :label-class="labelClasses" v-bind="$attrs">
    <slot />
  </w-toggle-item>
  <component
    :is="href ? 'a' : 'button'"
    v-else
    :class="buttonOrLinkClasses"
    :href="href"
    :type="href ? undefined : $attrs.type || 'button'">
    <span :class="[ccClickable.buttonOrLinkStretch]" aria-hidden="true" />
    <slot />
  </component>
</template>

<script>
export default { name: 'WClickable' };
</script>
