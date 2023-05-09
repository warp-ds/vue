<template>
  <w-field v-bind="{ ...$attrs, ...$props }" #default="{ triggerValidation, aria, hasValidationErrors }">
      <div :class="[ccInput.wrapper, inputWrapperClass]">
      <slot name="prefix" :inputElement="inputEl" />
      <input 
        v-if="mask"
        :class="[
          inputClasses,
          {
            [ccInput.invalid]: hasValidationErrors,
          }
        ]"
        :disabled="disabled"
        :readOnly="readOnly"
        v-bind="{ ...aria, ...$attrs, class: '' }"
        @blur="triggerValidation" ref="inputEl" :autocomplete="autocomplete" :id="id" :type="type">
      <input 
        v-else
        :class="[
          inputClasses,
          {
            [ccInput.invalid]: hasValidationErrors,
          }
        ]"
        :disabled="disabled"
        :readOnly="readOnly"
        v-bind="{ ...aria, ...$attrs, class: '' }" @blur="triggerValidation" ref="inputEl" :autocomplete="autocomplete" :id="id" :type="type" v-model="model"
        >
      <slot name="suffix" :inputElement="inputEl" />
    </div>
  </w-field>
</template>

<script setup>
  import { ref, computed, useSlots } from 'vue';
  import { input as ccInput } from '@warp-ds/component-classes';
  import { createModel } from 'create-v-model';
  import { setupMask } from './w-input-mask.js';
  import { default as wField, fieldProps } from './w-field.vue';

  const p = defineProps({
    ...fieldProps,
    type: {
      type: String,
      default: 'text'
    },
    inputWrapperClass: String,
    autocomplete: { type: String, default: 'off' },
    mask: Object,
  });
  const slots = useSlots();
  const emit = defineEmits(['update:modelValue']);
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

<script>
export default { name: 'wInput', inheritAttrs: false };
</script>
