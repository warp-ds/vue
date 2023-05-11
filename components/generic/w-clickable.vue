<template>
  <w-toggle-item v-if="radio || checkbox" class="focus-ring focus-ring-inset" :class="clickableClasses" :type="type" :label-class="labelClasses" v-bind="$attrs">
    <slot />
  </w-toggle-item>
  <component v-else :is="href ? 'a' : 'button'" class="focus-ring focus-ring-inset" :class="labelClasses" :href="href" :type="href ? undefined : ($attrs.type || 'button')">
    <span :class="clickableClasses" aria-hidden="true" />
    <slot />
  </component>
</template>

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
  [ccClickable.clickable]: props.label,
}));
const labelClasses = computed(() => ({
  [ccClickable.label]: props.label,
}));

</script>


<script>
export default { name: 'wClickable' };
</script>
