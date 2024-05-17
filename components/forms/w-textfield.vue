<script setup>
import { ref, computed, useSlots } from 'vue';

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
const inputClasses = computed(() => ({
  [ccInput.default]: true,
  [ccInput.disabled]: p.disabled,
  [ccInput.readOnly]: p.readOnly,
  [ccInput.placeholder]: !!p.placeholder,
  [ccInput.suffix]: slots.suffix,
  [ccInput.prefix]: slots.prefix,
}));

const inputWithPrefixStyle = computed(() => (slots.prefix ? 'padding-left: var(--w-prefix-width, 40px);' : undefined));
</script>

<template>
  <w-field v-slot="{ triggerValidation, aria, hasValidationErrors }" v-bind="{ ...$attrs, ...$props }">
    <div :class="[ccInput.wrapper, inputWrapperClass]">
      <slot name="prefix" :input-element="inputEl" />
      <input
        v-if="mask"
        :id="id"
        ref="inputEl"
        :type="type"
        :class="[
          inputClasses,
          {
            [ccInput.invalid]: hasValidationErrors,
          },
        ]"
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
        :class="[
          inputClasses,
          {
            [ccInput.invalid]: hasValidationErrors,
          },
        ]"
        :autocomplete="autocomplete"
        :disabled="disabled"
        :placeholder="placeholder"
        :readOnly="readOnly"
        v-bind="{ ...aria, ...$attrs, class: '' }"
        :style="inputWithPrefixStyle"
        @blur="triggerValidation" />
      <slot name="suffix" :input-element="inputEl" />
    </div>
  </w-field>
</template>

<script>
const inputTypeValidator = (value) => ['text', 'search', 'email', 'password', 'url', 'tel', 'number'].includes(value);
export default { name: 'WTextfield', inheritAttrs: false };
</script>
