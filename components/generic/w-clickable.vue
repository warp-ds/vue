
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
const labelClasses = computed(() => ({
  [ccClickable.label]: props.label,
}));

</script>

<template>
  <w-toggle-item v-if="radio || checkbox" :class="ccClickable.clickable" :type="type" :label-class="labelClasses" v-bind="$attrs">
    <slot />
  </w-toggle-item>
  <component v-else :is="href ? 'a' : 'button'" :class="labelClasses" :href="href" :type="href ? undefined : ($attrs.type || 'button')">
    <span :class="ccClickable.clickable" aria-hidden="true" />
    <slot />
  </component>
</template>

<script>
export default { name: 'wClickable' };
</script>
