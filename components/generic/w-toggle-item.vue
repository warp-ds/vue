<template>
  <input 
    :id="id" 
    v-model="model" 
    :type="type"
    v-bind="$attrs" 
    :class="inputClasses" 
  />
  <label v-if="label" :for="id" v-html="label" :class="[labelClass, labelComponentClasses]" />
  <label v-else :for="id" :class="[labelClass, labelComponentClasses]"><slot /></label>
</template>

<script setup>
import { computed } from 'vue';
import { id as uniqueId } from '#util';
import { modelProps, createModel } from 'create-v-model';
import { toggle as ccToggle } from '@warp-ds/component-classes';
const p = defineProps({
  id: { ...uniqueId },
  label: String,
  type: String,
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
const labelComponentClasses = computed(() => ({
  [ccToggle.label]: !p.radioButton,
  [`${ccToggle.labelDisabled} ${isCheckbox.value ? ccToggle.checkboxDisabled : ccToggle.radioDisabled}`] : p.disabled,
  [ccToggle.focusable]: !p.radioButton,
  [ccToggle.noContent]: !p.radioButton,
  [ccToggle.radioDisabled]: isRadio.value && p.disabled,
  [ccToggle.labelRadioColors] : isRadio.value && !p.radioButton,
  [ccToggle.radio]: isRadio.value,
  [ccToggle.radioInvalid]: isRadio.value && p.invalid,
  [ccToggle.checkboxInvalid]: isCheckbox.value && p.invalid,
  [`${ccToggle.checkbox} ${ccToggle.labelCheckboxColors} ${ccToggle.icon} ${p.disabled ? '' : ccToggle.checkboxChecked}`]: isCheckbox.value,
  [ccToggle.scLabel]: p.radioButton,
  [ccToggle.scLabelJustified]: p.equalWidth,
  [ccToggle.scLabelSmall]: p.small,
}));
const inputClasses = {
  [ccToggle.input]: true,
};

</script>

<script>
export default { name: 'wToggleItem' };

</script>