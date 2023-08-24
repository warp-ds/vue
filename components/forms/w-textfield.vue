<script setup>
import { ref, computed, useSlots } from 'vue';
import { input as ccInput } from '@warp-ds/css/component-classes';
import { createModel } from 'create-v-model';
import { setupMask } from './w-input-mask.js';
import { default as wField, fieldProps } from './w-field.vue';

const validInputTypes = ['text', 'search', 'email', 'password', 'url', 'tel', 'number'];

const p = defineProps({
  ...fieldProps,
  type: {
    type: String,
    default: 'text',
    validator: (v) => validInputTypes.includes(v)
  },
  inputWrapperClass: String,
  autocomplete: {
    type: String,
    default: 'off'
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
        :class="[
          inputClasses,
          {
            [ccInput.invalid]: hasValidationErrors,
          }
        ]"
        :autocomplete="autocomplete"
        :disabled="disabled"
        :readOnly="readOnly"
        v-bind="{ ...aria, ...$attrs, class: '' }"
        @blur="triggerValidation">
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
          }
        ]"
        :autocomplete="autocomplete"
        :disabled="disabled"
        :readOnly="readOnly"
        v-bind="{ ...aria, ...$attrs, class: '' }"
        @blur="triggerValidation"
        >
      <slot name="suffix" :inputElement="inputEl" />
    </div>
  </w-field>
</template>

<script>
export default { name: 'wTextfield', inheritAttrs: false };
</script>
