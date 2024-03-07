<script setup>
import { computed } from 'vue';
import { id as uniqueId } from '#util';
import { modelProps, createModel } from 'create-v-model';
import { toggle as ccToggle } from '@warp-ds/css/component-classes';
const p = defineProps({
  id: { ...uniqueId },
  label: String,
  type: String,
  class: String,
  disabled: Boolean,
  indeterminate: Boolean,
  equalWidth: Boolean,
  invalid: Boolean,
  radioButton: Boolean,
  labelClass: null,
  ...modelProps()
});

const emit = defineEmits(['update:modelValue']);
const model = createModel({ props: p, emit });

const isRadio = computed(() => p.type === 'radio');
const isCheckbox = computed(() => p.type === 'checkbox');
const labelClasses = computed(() => (p.labelClass || {
  [ccToggle.label]: !p.radioButton,
  [ccToggle.labelBefore]: !p.radioButton && !p.indeterminate,
  [ccToggle.checkbox]: isCheckbox.value && !p.indeterminate && !p.invalid && !p.disabled ,
  [ccToggle.checkboxInvalid]: isCheckbox.value && !p.indeterminate && p.invalid && !p.disabled,
  [ccToggle.checkboxDisabled] : isCheckbox.value && !p.indeterminate && !p.invalid && p.disabled ,
  [ccToggle.indeterminate]: isCheckbox.value && p.indeterminate && !p.invalid && !p.disabled,
  [ccToggle.indeterminateInvalid]: isCheckbox.value && p.indeterminate && p.invalid && !p.disabled,
  [ccToggle.indeterminateDisabled]: isCheckbox.value && p.indeterminate && !p.invalid && p.disabled,
  [ccToggle.radio]: isRadio.value && !p.invalid && !p.disabled && !p.radioButton,
  [ccToggle.radioInvalid]: isRadio.value && p.invalid && !p.disabled && !p.radioButton,
  [ccToggle.radioDisabled] : isRadio.value && !p.invalid && p.disabled && !p.radioButton,
  [ccToggle.radioButtonsLabel]: p.radioButton,
  [ccToggle.radioButtonsRegular]: p.radioButton && !p.small,
  [ccToggle.radioButtonsSmall]: p.radioButton && p.small,
}));
const inputClasses = {
  [ccToggle.input]: true,
  [p.class || ccToggle.a11y]: true,
};

</script>

<template>
  <input 
    :id="id" 
    v-model="model" 
    :type="type"
    :radioButton="radioButton"
    :disabled="disabled"
    :invalid="invalid"
    :indeterminate="indeterminate"
    :equalWidth="equalWidth"
    v-bind="$attrs" 
    :class="[inputClasses]"
  />
  <label v-if="label" :for="id" v-html="label" :class="labelClasses" />
  <label v-else :for="id" :class="labelClasses"><slot /></label>
</template>

<script>
export default { name: 'wToggleItem' };
</script>