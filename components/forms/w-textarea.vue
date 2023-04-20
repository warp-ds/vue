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
        v-bind="{ ...$attrs, class: '' }" v-model="model" :id="id" @blur="triggerValidation" 
      />
    </div>
  </w-field>
</template>

<script setup>
import { computed, useAttrs } from 'vue';
import { input as ccInput } from '@warp-ds/component-classes';
import { createModel } from 'create-v-model';
import { default as wField, fieldProps } from './w-field.vue';

const props = defineProps({
    ...fieldProps,
  });
  const {disabled, placeholder, readOnly} = useAttrs();
  const emit = defineEmits(['update:modelValue']);
  const model = createModel({ props, emit });

  const wrapperClass = ccInput.wrapper;
  const inputClasses = computed(() => ({
    [`${ccInput.default} ${ccInput.textArea}`]: true,
    [ccInput.disabled]: disabled,
    [ccInput.readOnly]: readOnly !== undefined,
    [ccInput.placeholder]: !!placeholder,
  }));
</script>

<script>
export default { name: 'wTextarea', inheritAttrs: false };
</script>