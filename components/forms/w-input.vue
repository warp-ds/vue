<template>
  <w-field v-bind="{ ...$attrs, ...$props }" #default="{ triggerValidation, aria }">
      <div :class="[inputWrapperClass, wrapperClass ]">
      <slot name="prefix" :inputElement="inputEl" />
      <input v-if="mask" :class="inputClasses" v-bind="{ ...aria, ...$attrs, class: '' }" @blur="triggerValidation" ref="inputEl" :autocomplete="autocomplete" :id="id" :type="type">
      <input v-else 
      :class="[
        inputClasses,
        {
          'pr-40': $slots.suffix,
          'pl-40': $slots.prefix,    
        }
      ]"
      v-bind="{ ...aria, ...$attrs, class: '' }" @blur="triggerValidation" ref="inputEl" :autocomplete="autocomplete" :id="id" :type="type" v-model="model">
      <slot name="suffix" :inputElement="inputEl" />
    </div>
  </w-field>
</template>

<script>
import { ref, computed } from 'vue';
import { input } from '@warp-ds/component-classes';
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
  },
  setup(props, { emit }) {
    const model = createModel({ props, emit })
    const inputEl = ref(null)
    if (props.mask) setupMask({ props, emit, inputEl });
    const wrapperClass = input.wrapper;
    const inputClasses = computed(() => ({
      [input.default]: true,
      [input.invalid]: props.invalid,
      [input.disabled]: props.disabled,
      [input.readOnly]: props.readOnly,
      [input.placeholder]: !!props.placeholder,
    }));
    return { model, inputEl, inputClasses, wrapperClass }
  }
}
</script>
