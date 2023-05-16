
<script setup>
import { computed } from 'vue';
import { clickable as ccClickable } from '@warp-ds/component-classes';
import wToggleItem from './w-toggle-item.vue';

const props = defineProps({
  href: String,
  label: Boolean,
  radio: Boolean,
  checkbox: Boolean
});
const type = computed(() => props.radio ? 'radio' : 'checkbox');

const clickableClasses = computed(() => ({
  ['focus:focusable:focus focus-visible:focusable:focus-visible not-focus-visible:focusable:focus:not(:focus-visible) focusable-inset']: true,
  [ccClickable.clickable]: true,
}));
const labelClasses = computed(() => ({
  ['focus:focusable:focus focus-visible:focusable:focus-visible not-focus-visible:focusable:focus:not(:focus-visible) focusable-inset']: true,
  [ccClickable.label]: props.label,
}));

</script>

<template>
  <w-toggle-item v-if="radio || checkbox" :class="clickableClasses" :type="type" :label-class="labelClasses" v-bind="$attrs">
    <slot />
  </w-toggle-item>
  <component v-else :is="href ? 'a' : 'button'" :class="labelClasses" :href="href" :type="href ? undefined : ($attrs.type || 'button')">
    <span :class="clickableClasses" aria-hidden="true" />
    <slot />
  </component>
</template>

<script>
export default { name: 'wClickable' };
</script>
