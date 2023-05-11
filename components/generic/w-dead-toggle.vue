<script setup>
import { toggle as ccToggle } from '@warp-ds/component-classes';
import wToggleItem from './w-toggle-item.vue';
import { computed } from 'vue';

const props = defineProps({
  radio: Boolean,
  checkbox: Boolean,
})
const type = computed(() => props.radio ? 'radio' : 'checkbox');

const labelClasses = computed(() => ({
    [ccToggle.label]: true,
    [ccToggle.focusable]: true,
    [ccToggle.noContent]: true,
    [ccToggle.deadToggleLabel]: true,
    [`${ccToggle.radio} ${ccToggle.labelRadioBorder} ${ccToggle.radioChecked}`]: props.radio,
    [`${ccToggle.checkbox} ${ccToggle.labelCheckboxBorder} ${ccToggle.checkboxChecked}`]: props.checkbox,
    [ccToggle.icon]: props.checkbox,
  }));

  const wrapperClasses = {
    [ccToggle.wrapper]: true,
    [ccToggle.deadToggleWrapper]: true,
  };

</script>

<template>
  <div :class="wrapperClasses" aria-hidden="true">
    <w-toggle-item :class="ccToggle.deadToggleInput" :label-class="labelClasses" :type="type" v-bind="$attrs" />
  </div>
</template>

<script>
export default { name: 'wDeadToggle' };
</script>