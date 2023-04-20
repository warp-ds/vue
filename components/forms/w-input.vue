<template>
  <w-field v-bind="{ ...$attrs, ...$props }" #default="{ triggerValidation, aria }">
      <div :class="[ccInput.wrapper, inputWrapperClass]">
      <slot name="prefix" :inputElement="inputEl" />
      <input v-if="mask" :class="inputClasses" v-bind="{ ...aria, ...$attrs, class: '' }" @blur="triggerValidation" ref="inputEl" :autocomplete="autocomplete" :id="id" :type="type">
      <input v-else 
      :class="[
        inputClasses,
        {
          [ccInput.suffix]: $slots.suffix,
          [ccInput.prefix]: $slots.prefix,    
        }
      ]"
      v-bind="{ ...aria, ...$attrs, class: '' }" @blur="triggerValidation" ref="inputEl" :autocomplete="autocomplete" :id="id" :type="type" v-model="model">
      <slot name="suffix" :inputElement="inputEl" />
    </div>
  </w-field>
</template>

<script>
import { ref, computed } from 'vue';
import { input as ccInput } from '@warp-ds/component-classes';
import { createModel } from 'create-v-model';
import { setupMask } from './w-input-mask.js';
import { default as wField, fieldProps } from './w-field.vue';

export default {
  name: 'wInput',
  components: { wField },
  inheritAttrs: false,
  props: {
    ...fieldProps,
    type: {
      type: String,
      default: 'text'
    },
    inputWrapperClass: String,
    autocomplete: { type: String, default: 'off' },
    mask: Object,
    invalid: Boolean,
    disabled: Boolean,
    readOnly: Boolean,
    placeholder: String
  },
  setup(props, { emit }) {
    const model = createModel({ props, emit })
    const inputEl = ref(null)
    if (props.mask) setupMask({ props, emit, inputEl });
    const inputClasses = computed(() => ({
      [ccInput.default]: true,
      [ccInput.invalid]: props.invalid,
      [ccInput.disabled]: props.disabled,
      [ccInput.readOnly]: props.readOnly,
      [ccInput.placeholder]: !!props.placeholder,
    }));
    return { model, inputEl, inputClasses, ccInput }
  }
}
</script>
