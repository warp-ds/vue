<template>
  <w-field v-bind="{ ...$attrs, ...$props }" #default="{ triggerValidation }">
    <div class="relative">
      <textarea  :class="inputClasses" v-bind="{ ...$attrs, class: '' }" v-model="model" :id="id" @blur="triggerValidation" />
    </div>
  </w-field>
</template>

<script>
  export default { 
    inheritAttrs: false,
    name: 'wTextarea',
  }
</script>

<script setup>
import { computed } from 'vue';
import { input } from '@warp-ds/component-classes';
import { createModel } from 'create-v-model';
import { default as wField, fieldProps } from './w-field.vue';

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  ...fieldProps,    
  disabled: Boolean,
  invalid: Boolean,
  readOnly: Boolean,
});
const model = createModel({ props, emit });

const inputClasses = computed(() => ({
    [input.default]: true,
    [input.invalid]: props.invalid,
    [input.disabled]: props.disabled,
    [input.readOnly]: props.readOnly,
  }));

</script>
