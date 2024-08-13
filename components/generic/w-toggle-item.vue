<script setup>
import { computed } from 'vue';

import { toggle as ccToggle } from '@warp-ds/css/component-classes';
import { modelProps, createModel } from 'create-v-model';

import { id as uniqueId } from '#util';

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
  small: Boolean,
  labelClass: null,
  ...modelProps(),
});

const emit = defineEmits(['update:modelValue']);
const model = createModel({ props: p, emit });

const isRadio = computed(() => p.type === 'radio');
const isCheckbox = computed(() => p.type === 'checkbox');
const labelClasses = computed(() => {
  return (
    p.labelClass || [
      p.radioButton ? ccToggle.radioButtonsLabel : ccToggle.label,
      p.radioButton && (p.small ? ccToggle.radioButtonsSmall : ccToggle.radioButtonsRegular),
      !p.radioButton && !p.indeterminate && ccToggle.labelBefore,
      isCheckbox.value && !p.indeterminate && !p.invalid && !p.disabled && ccToggle.checkbox,
      isCheckbox.value && !p.indeterminate && p.invalid && !p.disabled && ccToggle.checkboxInvalid,
      isCheckbox.value && !p.indeterminate && !p.invalid && p.disabled && ccToggle.checkboxDisabled,
      isCheckbox.value && p.indeterminate && !p.invalid && !p.disabled && ccToggle.indeterminate,
      isCheckbox.value && p.indeterminate && p.invalid && !p.disabled && ccToggle.indeterminateInvalid,
      isCheckbox.value && p.indeterminate && !p.invalid && p.disabled && ccToggle.indeterminateDisabled,
      isRadio.value && !p.invalid && !p.disabled && ccToggle.radio,
      isRadio.value && p.invalid && !p.disabled && ccToggle.radioInvalid,
      isRadio.value && !p.invalid && p.disabled && ccToggle.radioDisabled,
    ]
  );
});

const inputClasses = computed(() => [ccToggle.input, p.class || ccToggle.a11y]);
</script>

<script>
export default { name: 'wToggleItem' };
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
    :class="[inputClasses]" />
  <label v-if="label" :for="id" :class="labelClasses" v-html="label" />
  <label v-else :for="id" :class="labelClasses"><slot /></label>
</template>
