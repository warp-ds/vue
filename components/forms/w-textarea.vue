<script setup>
import { input as ccInput } from '@warp-ds/css/component-classes';
import { createModel } from 'create-v-model';

import { fieldProps } from '../util/fieldProps';

import { default as wField } from './w-field.vue';

defineOptions({
  name: 'wTextarea',
  inheritAttrs: false,
});

const p = defineProps(fieldProps);
const emit = defineEmits(['update:modelValue']);
const model = createModel({ props: p, emit });

const textAreaClasses = (hasValidationErrors) => [
  ccInput.base,
  ccInput.textArea,
  !!p.placeholder && ccInput.placeholder,
  !hasValidationErrors && !p.disabled && !p.readOnly && ccInput.default,
  hasValidationErrors && !p.disabled && !p.readOnly && ccInput.invalid,
  !hasValidationErrors && p.disabled && !p.readOnly && ccInput.disabled,
  !hasValidationErrors && !p.disabled && p.readOnly && ccInput.readOnly,
];
</script>

<template>
  <w-field v-bind="{ ...$attrs, ...$props }" #default="{ triggerValidation, aria, hasValidationErrors }">
    <div :class="[ccInput.wrapper]">
      <textarea
        :class="textAreaClasses(hasValidationErrors)"
        :disabled="disabled"
        :readOnly="readOnly"
        v-bind="{ ...aria, ...$attrs, class: '' }"
        v-model="model"
        :id="id"
        @blur="triggerValidation" />
    </div>
  </w-field>
</template>
