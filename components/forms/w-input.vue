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
        v-bind="{ ...aria, ...$attrs, class: '' }" @blur="triggerValidation" ref="inputEl" :autocomplete="autocomplete" :id="id" :type="type" v-model="model"
        >
      <slot name="suffix" :inputElement="inputEl" />
    </div>
  </w-field>
</template>

<script setup>
  import { ref, computed, useAttrs, useSlots } from 'vue';
  import { input as ccInput } from '@warp-ds/component-classes';
  import { createModel } from 'create-v-model';
  import { setupMask } from './w-input-mask.js';
  import { default as wField, fieldProps } from './w-field.vue';

  const props = defineProps({
    ...fieldProps,
    type: {
      type: String,
      default: 'text'
    },
    inputWrapperClass: String,
    autocomplete: { type: String, default: 'off' },
    mask: Object,
  });
  const {disabled, placeholder, readOnly} = useAttrs();
  const slots = useSlots();
  const emit = defineEmits(['update:modelValue']);
  const model = createModel({ props, emit });
  const inputEl = ref(null);
  if (props.mask) setupMask({ props, emit, inputEl });
  const inputClasses = computed(() => ({
    [ccInput.default]: true,
    [ccInput.disabled]: disabled,
    [ccInput.readOnly]: readOnly !== undefined,
    [ccInput.placeholder]: !!placeholder,
    [ccInput.suffix]: slots.suffix,
    [ccInput.prefix]: slots.prefix,
  }));
</script>

<script>
export default { name: 'wInput', inheritAttrs: false };
</script>
