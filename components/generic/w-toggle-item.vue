<template>
  <input :id="id" v-model="model" v-bind="$attrs" :class="inputClasses" />
  <label v-if="label" :for="id" v-html="label" :class="labelClasses" />
  <label v-else :for="id" :class="labelClasses"><slot /></label>
</template>

<script setup>
import { computed, useAttrs } from 'vue';
import { id as uniqueId } from '#util';
import { modelProps, createModel } from 'create-v-model';
// import { toggle as ccToggle } from '@warp-ds/component-classes';
const props = defineProps({
  id: { ...uniqueId },
  label: String,
  labelClass: null,
  ...modelProps()
});

const ccToggle = {
    field: 'text-16 relative',
    wrapper: 'relative py-1',
    input: 'sr-only peer',
    inputDisabled: 'pointer-events-none',
    focusable: 'peer-focus:focusable:focus peer-focus-visible:focusable:focus-visible peer-not-focus-visible:focusable:focus:not(:focus-visible)',
    focusableWithin: 'focus-within:focusable:focus focus-within:focusable:focus-visible',
    label: 'cursor-pointer text-16 i-text-$color-label-text py-2 pl-28 select-none relative block before:block before:border before:absolute before:transition-all before:left-0 before:w-20 before:h-20 before:top-2',
    noContent: `before:content-['']`,
    indeterminate: `before:i-text-$color-text-inverted before:text-center before:font-bold before:content-['–'] peer-indeterminate:before:i-border-$color-checkbox-border-active peer-indeterminate:before:i-bg-$color-checkbox-background-active peer-indeterminate:hover:before:i-border-$color-checkbox-border-hover peer-indeterminate:hover:before:i-bg-$color-checkbox-background-active-hover`,
    labelDisabled: 'pointer-events-none',
    checkbox: 'before:rounded-2 hover:before:i-border-$color-checkbox-border-hover hover:before:i-bg-$color-checkbox-background-hover',
    checkboxDisabled: 'peer-checked:before:i-border-$color-checkbox-border-active-disabled peer-checked:before:i-bg-$color-checkbox-background-active-disabled before:i-bg-$color-checkbox-background-disabled before:i-border-$color-checkbox-border-disabled',
    checkboxChecked: 'peer-checked:before:i-border-$color-checkbox-border-active peer-checked:before:i-bg-$color-checkbox-background-active peer-checked:peer-hover:before:i-border-$color-checkbox-border-active-hover peer-checked:peer-hover:before:i-bg-$color-checkbox-background-active-hover',
    checkboxInvalid: 'before:i-bg-$color-checkbox-negative-background hover:before:i-bg-$color-checkbox-negative-background-hover peer-checked:before:i-border-$color-checkbox-negative-border-active hover:before:i-border-$color-checkbox-negative-border-hover peer-checked:before:i-bg-$color-checkbox-negative-background-active peer-checked:peer-hover:before:i-bg-$color-checkbox-negative-background-active-hover peer-checked:peer-hover:before:i-border-$color-checkbox-negative-border-active-hover',
    labelCheckboxColors: 'i-bg-$color-checkbox-background i-border-$color-checkbox-border',
    radio: 'before:rounded-full peer-checked:before:i-border-$color-radio-border-active peer-checked:before:border-[6] peer-checked:peer-hover:before:i-border-$color-radio-border-active-hover peer-hover:before:i-border-$color-radio-border-hover peer-hover:before:i-bg-$color-radio-background-hover',
    radioInvalid: 'before:i-bg-$color-radio-negative-background peer-hover:before:i-bg-$color-radio-negative-background-hover before:i-border-$color-radio-negative-border peer-hover:before:i-border-$color-radio-negative-border-hover peer-checked:before:i-border-$color-radio-negative-border-active peer-checked:peer-hover:before:i-border-$color-radio-negative-border-active-hover ',
    radioDisabled: 'before:i-bg-$color-radio-background-disabled! before:i-border-$color-radio-border-disabled! peer-checked:before:i-border-$color-radio-border-active-disabled!',
    labelRadioColors: 'i-bg-$color-radio-background i-border-$color-radio-border',
    segmentControl: 'inline-flex relative font-bold rounded-8',
    scLabel: 'peer-hover:i-bg-$color-buttongroup-background-hover peer-checked:i-text-$color-buttongroup-text-active peer-checked:i-bg-$color-buttongroup-background-active peer-checked:peer-hover:i-bg-$color-buttongroup-background-active-hover peer-checked:i-border-$color-buttongroup-border-active block relative text-14 font-bold pb-4 cursor-pointer i-text-$color-buttongroup-text text-center i-bg-$color-background border-2 i-border-$color-buttongroup-border py-10 px-14 group-first-of-type:rounded-tl-8 group-first-of-type:rounded-bl-8 group-last-of-type:rounded-tr-8 group-last-of-type:rounded-br-8 group-not-last-of-type:border-r-0 ',
    scJustified: 'flex',
    scLabelJustified: 'grow-0 shrink-0 basis-auto',
    scLabelSmall: 'text-12 py-[5px]! px-[8px]!',
    icon: 'peer-checked:before:bg-center before:bg-[var(--x-form-check-mark)]',
    a11y: 'sr-only',
  }

const emit = defineEmits(['update:modelValue']);
const model = createModel({ props, emit });
const attrs = useAttrs();
const isInvalid = attrs.invalid;
const isDisabled = attrs.disabled;
const isRadioButton = attrs.type === 'radio-button';
const isRadio = attrs.type === 'radio';
const isCheckbox = attrs.type === 'checkbox';
const labelClasses = computed(() => ({
  [ccToggle.label]: !isRadioButton,
  [`${ccToggle.labelDisabled} ${isCheckbox ? ccToggle.checkboxDisabled : ccToggle.radioDisabled}`] : isDisabled,
  [ccToggle.focusable]: !isRadioButton,
  [ccToggle.noContent]: !props.indeterminate,
  [ccToggle.radioDisabled]: isRadio && isDisabled,
  [`${ccToggle.radio} ${ccToggle.labelRadioColors}`]: isRadio,
  [ccToggle.radioInvalid]: isRadio && isInvalid,
  [ccToggle.checkboxInvalid]: isCheckbox && isInvalid,
  [`${ccToggle.checkbox} ${ccToggle.labelCheckboxColors} ${ccToggle.icon} ${isDisabled ? '' : ccToggle.checkboxChecked}`]: isCheckbox,
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