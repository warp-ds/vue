<template>
  <w-field v-bind="{ ...$attrs, ...$props }" #default="{ triggerValidation, aria, hasValidationErrors }">
    <div :class="[ccInput.wrapper]">
      <textarea
        :class="{
          [`${ccInput.base} ${ccInput.textArea}`]: true,
          [ccInput.placeholder]: !!p.placeholder,
          [ccInput.default]: !hasValidationErrors && !p.disabled && !p.readOnly,
          [ccInput.invalid]: hasValidationErrors && !p.disabled && !p.readOnly,
          [ccInput.disabled]: !hasValidationErrors && p.disabled && !p.readOnly,
          [ccInput.readOnly]: !hasValidationErrors && !p.disabled && p.readOnly,
        }"
        :disabled="disabled"
        :readOnly="readOnly"
        v-bind="{ ...aria, ...$attrs, class: '' }"
        v-model="model"
        :id="id"
        @blur="triggerValidation" />
    </div>
  </w-field>
</template>

<script setup>
import { input as ccInput } from '@warp-ds/css/component-classes';
import { createModel } from 'create-v-model';

import { default as wField, fieldProps } from './w-field.vue';

const p = defineProps(fieldProps);
const emit = defineEmits(['update:modelValue']);
const model = createModel({ props: p, emit });
</script>

<script>
export default { name: 'wTextarea', inheritAttrs: false };
</script>
