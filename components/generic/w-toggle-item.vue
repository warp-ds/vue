<script setup>
import { computed } from 'vue';
import { id as uniqueId } from '#util';
import { modelProps, createModel } from 'create-v-model';
import { toggle as ccToggle } from '@warp-ds/component-classes';
const p = defineProps({
  id: { ...uniqueId },
  label: String,
  type: String,
  class: String,
  disabled: Boolean,
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
  [`${ccToggle.labelDisabled} ${isCheckbox.value ? ccToggle.checkboxDisabled : ccToggle.radioDisabled}`] : p.disabled,
  [ccToggle.focusable]: !p.radioButton,
  [ccToggle.noContent]: !p.radioButton,
  [ccToggle.labelRadioColors] : isRadio.value && !p.radioButton,
  [`${ccToggle.radio} ${p.disabled ? '' : ccToggle.radioChecked}`]: isRadio.value,
  [ccToggle.radioInvalid]: isRadio.value && p.invalid,
  [ccToggle.checkboxInvalid]: isCheckbox.value && p.invalid,
  [`${ccToggle.checkbox} ${ccToggle.labelCheckboxColors} ${ccToggle.icon} ${p.disabled ? '' : ccToggle.checkboxChecked}`]: isCheckbox.value,
  [ccToggle.radioButtonsLabel]: p.radioButton,
  [ccToggle.radioButtonsLabelSmall]: p.small,
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