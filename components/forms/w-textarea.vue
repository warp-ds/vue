<template>
  <w-field v-bind="{ ...$attrs, ...$props }" #default="{ triggerValidation }">
    <div class="input input--textarea mb-0">
      <textarea v-bind="{ ...$attrs, class: '' }" v-model="model" :id="id" @blur="triggerValidation" />
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
import { createModel } from 'create-v-model'
import { default as wField, fieldProps } from './w-field.vue';

const props = defineProps(fieldProps);
const model = createModel({ props, emit });
</script>
