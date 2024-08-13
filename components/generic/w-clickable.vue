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
const labelClasses = computed(() => [props.label && ccClickable.label]);
const buttonOrLinkClasses = computed(() => [ccClickable.buttonOrLink, props.label && ccClickable.label]);
</script>

<script>
export default { name: 'wClickable' };
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
