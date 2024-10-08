<script setup>
import { ref, useSlots } from 'vue';

import { input as ccInput } from '@warp-ds/css/component-classes';
import { createModel } from 'create-v-model';

import { default as wField, fieldProps } from './w-field.vue';
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

const inputClasses = (hasValidationErrors) => [
  ccInput.base,
  !!p.placeholder && ccInput.placeholder,
  !!slots.suffix && ccInput.suffix,
  !!slots.prefix && ccInput.prefix,
  !hasValidationErrors && !p.disabled && !p.readOnly && ccInput.default,
  hasValidationErrors && !p.disabled && !p.readOnly && ccInput.invalid,
  !hasValidationErrors && p.disabled && !p.readOnly && ccInput.disabled,
  !hasValidationErrors && !p.disabled && p.readOnly && ccInput.readOnly,
];
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
        :class="inputClasses(hasValidationErrors)"
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
        :class="inputClasses(hasValidationErrors)"
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
