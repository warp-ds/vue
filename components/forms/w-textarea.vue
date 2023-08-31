<template>
  <w-field v-bind="{ ...$attrs, ...$props }" #default="{ triggerValidation, hasValidationErrors }">
    <div :class="wrapperClass">
      <textarea         
        :class="[
          inputClasses,
          {
            [ccInput.invalid]: hasValidationErrors,
          }
        ]"
        :disabled="disabled"
        :readOnly="readOnly"
        v-bind="{ ...$attrs, class: '' }" v-model="model" :id="id" @blur="triggerValidation" 
      />
    </div>
  </w-field>
</template>

<script setup>
import { computed } from 'vue';
import { input as ccInput } from '@warp-ds/css/component-classes';
import { createModel } from 'create-v-model';
import { default as wField, fieldProps } from './w-field.vue';

const p = defineProps(fieldProps);
const emit = defineEmits(['update:modelValue']);
const model = createModel({ props: p, emit });

const wrapperClass = ccInput.wrapper;
const inputClasses = computed(() => ({
  [`${ccInput.default} ${ccInput.textArea}`]: true,
  [ccInput.disabled]: p.disabled,
  [ccInput.readOnly]: p.readOnly,
  [ccInput.placeholder]: !!p.placeholder,
}));
</script>

<script>
export default { name: 'wTextarea', inheritAttrs: false };
</script>