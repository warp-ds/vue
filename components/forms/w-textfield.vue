<script setup>
import { ref, useSlots } from 'vue';

import { input as ccInput } from '@warp-ds/css/component-classes';
import { createModel } from 'create-v-model';

import { fieldProps } from '../util/fieldProps';

import { default as wField } from './w-field.vue';
import { setupMask } from './w-input-mask.js';

const p = defineProps({
  ...fieldProps,
  type: {
    type: String,
    default: 'text',
    validator: inputTypeValidator,
  },
  inputWrapperClass: String,
  autocomplete: {
    type: String,
    default: 'off',
  },
  mask: Object,
});
const emit = defineEmits(['update:modelValue']);
const slots = useSlots();
const model = createModel({ props: p, emit });
const inputEl = ref(null);
if (p.mask) setupMask({ props: p, emit, inputEl });
</script>

<script>
const inputTypeValidator = (value) => ['text', 'search', 'email', 'password', 'url', 'tel', 'number'].includes(value);
export default { name: 'wTextfield', inheritAttrs: false };
</script>

<template>
  <w-field v-bind="{ ...$attrs, ...$props }" #default="{ triggerValidation, aria, hasValidationErrors }">
    <div :class="[ccInput.wrapper, inputWrapperClass]">
      <slot name="prefix" :inputElement="inputEl" />
      <input
        v-if="mask"
        :id="id"
        ref="inputEl"
        :type="type"
        :class="{
          [ccInput.base]: true,
          [ccInput.default]: !hasValidationErrors && !p.disabled && !p.readOnly,
          [ccInput.invalid]: hasValidationErrors && !p.disabled && !p.readOnly,
          [ccInput.disabled]: !hasValidationErrors && p.disabled && !p.readOnly,
          [ccInput.readOnly]: !hasValidationErrors && !p.disabled && p.readOnly,
          [ccInput.placeholder]: !!p.placeholder,
          [ccInput.suffix]: slots.suffix,
          [ccInput.prefix]: slots.prefix,
        }"
        :autocomplete="autocomplete"
        :disabled="disabled"
        :placeholder="placeholder"
        :readOnly="readOnly"
        v-bind="{ ...aria, ...$attrs, class: '' }"
        @blur="triggerValidation" />
      <input
        v-else
        :id="id"
        ref="inputEl"
        v-model="model"
        :type="type"
        :class="{
          [ccInput.base]: true,
          [ccInput.default]: !hasValidationErrors && !p.disabled && !p.readOnly,
          [ccInput.invalid]: hasValidationErrors && !p.disabled && !p.readOnly,
          [ccInput.disabled]: !hasValidationErrors && p.disabled && !p.readOnly,
          [ccInput.readOnly]: !hasValidationErrors && !p.disabled && p.readOnly,
          [ccInput.placeholder]: !!p.placeholder,
          [ccInput.suffix]: slots.suffix,
          [ccInput.prefix]: slots.prefix,
        }"
        :autocomplete="autocomplete"
        :disabled="disabled"
        :placeholder="placeholder"
        :readOnly="readOnly"
        v-bind="{ ...aria, ...$attrs, class: '' }"
        @blur="triggerValidation" />
      <slot name="suffix" :inputElement="inputEl" />
    </div>
  </w-field>
</template>
