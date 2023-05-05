<template>
  <input :id="id" v-model="model" v-bind="$attrs" :class="inputClasses" />
  <label v-if="label" :for="id" v-html="label" :class="labelClasses" />
  <label v-else :for="id" :class="labelClasses"><slot /></label>
</template>

<script setup>
import { computed, useAttrs } from 'vue';
import { id as uniqueId } from '#util';
import { modelProps, createModel } from 'create-v-model';
import { toggle as ccToggle } from '@warp-ds/component-classes';
const props = defineProps({
  id: { ...uniqueId },
  label: String,
  labelClass: null,
  ...modelProps()
});

const emit = defineEmits(['update:modelValue']);
const model = createModel({ props, emit });
const attrs = useAttrs();
const isInvalid = attrs.invalid;
const isDisabled = attrs.disabled;
const isRadioButton = attrs.radioButton;
const isRadio = attrs.type === 'radio';
const isCheckbox = attrs.type === 'checkbox';
const labelClasses = computed(() => ({
  [ccToggle.label]: !isRadioButton,
  [`${ccToggle.labelDisabled} ${isCheckbox ? ccToggle.checkboxDisabled : ccToggle.radioDisabled}`] : isDisabled,
  [ccToggle.focusable]: !isRadioButton,
  [ccToggle.noContent]: !isRadioButton,
  [ccToggle.radioDisabled]: isRadio && isDisabled,
  [ccToggle.labelRadioColors] : isRadio && !isRadioButton,
  [ccToggle.radio]: isRadio,
  [ccToggle.radioInvalid]: isRadio && isInvalid,
  [ccToggle.checkboxInvalid]: isCheckbox && isInvalid,
  [`${ccToggle.checkbox} ${ccToggle.labelCheckboxColors} ${ccToggle.icon} ${isDisabled ? '' : ccToggle.checkboxChecked}`]: isCheckbox,
  [ccToggle.scLabel]: isRadioButton,
  [ccToggle.scLabelJustified]: attrs.equalWidth,
  [ccToggle.scLabelSmall]: props.small,
}));
const inputClasses = computed(() => ({
  [ccToggle.input]: true,
}));

</script>

<script>
export default { name: 'wToggleItem' };

</script>