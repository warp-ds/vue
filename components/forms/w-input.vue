<template>
  <w-field v-bind="{ ...$attrs, ...$props }" #default="{ triggerValidation, aria }">
    <div class="relative">
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
  export default { inheritAttrs: false, name: 'wInput' }
</script>

<script setup>
  import { ref, computed } from 'vue';
  import { input } from '@warp-ds/component-classes';
  import { createModel } from 'create-v-model';
  import { setupMask } from './w-input-mask.js';
  import { default as wField, fieldProps } from './w-field.vue';

  const props = defineProps({
    ...fieldProps,
    type: {
      type: String,
      default: 'text'
    },
    disabled: Boolean,
    invalid: Boolean,
    readOnly: Boolean,
    autocomplete: { type: String, default: 'off' },
    mask: Object,
  });

  const emit = defineEmits(['update:modelValue']);
  const model = createModel({ props, emit });
  const inputEl = ref(null);
  if (props.mask) setupMask({ props, emit, inputEl });
  const inputClasses = computed(() => ({
    [input.default]: true,
    [input.invalid]: props.invalid,
    [input.disabled]: props.disabled,
    [input.readOnly]: props.readOnly,
  }));
</script>