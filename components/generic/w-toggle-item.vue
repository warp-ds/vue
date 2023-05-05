<template>
  <input :id="id" v-model="model" v-bind="{ ...$attrs, ...$props }" :class="inputClasses" />
  <label v-if="label" :for="id" v-html="label" :class="[labelClass, labelComponentClasses]" />
  <label v-else :for="id" :class="[labelClass, labelComponentClasses]"><slot /></label>
</template>

<script setup>
import { computed } from 'vue';
import { id as uniqueId } from '#util';
import { modelProps, createModel } from 'create-v-model';
import { toggle as ccToggle } from '@warp-ds/component-classes';
const props = defineProps({
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
const model = createModel({ props, emit });

const isRadio = computed(() => props.type === 'radio');
const isCheckbox = computed(() => props.type === 'checkbox');
const isInvalid = props.invalid;
const isDisabled = props.disabled;
const isRadioButton = props.radioButton;
const labelComponentClasses = computed(() => ({
  [ccToggle.label]: !isRadioButton,
  [`${ccToggle.labelDisabled} ${isCheckbox.value ? ccToggle.checkboxDisabled : ccToggle.radioDisabled}`] : isDisabled,
  [ccToggle.focusable]: !isRadioButton,
  [ccToggle.noContent]: !isRadioButton,
  [ccToggle.radioDisabled]: isRadio.value && isDisabled,
  [ccToggle.labelRadioColors] : isRadio.value && !isRadioButton,
  [ccToggle.radio]: isRadio.value,
  [ccToggle.radioInvalid]: isRadio.value && isInvalid,
  [ccToggle.checkboxInvalid]: isCheckbox.value && isInvalid,
  [`${ccToggle.checkbox} ${ccToggle.labelCheckboxColors} ${ccToggle.icon} ${isDisabled ? '' : ccToggle.checkboxChecked}`]: isCheckbox.value,
  [ccToggle.scLabel]: isRadioButton,
  [ccToggle.scLabelJustified]: props.equalWidth,
  [ccToggle.scLabelSmall]: props.small,
}));
const inputClasses = computed(() => ({
  [ccToggle.input]: true,
}));

</script>

<script>
export default { name: 'wToggleItem' };

</script>