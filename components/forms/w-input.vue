<template>
  <w-field v-bind="{ ...$attrs, ...$props }" #default="{ triggerValidation, aria }" :class="{ 'has-suffix': $slots.suffix, 'has-prefix': $slots.prefix }">
    <div class="input" :class="inputWrapperClass">
      <slot name="prefix" :inputElement="inputEl" />
      <input v-if="mask" v-bind="{ ...aria, ...$attrs, class: '' }" @blur="triggerValidation" ref="inputEl" :autocomplete="autocomplete" :id="id" :type="type">
      <input v-else      v-bind="{ ...aria, ...$attrs, class: '' }" @blur="triggerValidation" ref="inputEl" :autocomplete="autocomplete" :id="id" :type="type" v-model="model">
      <slot name="suffix" :inputElement="inputEl" />
    </div>
  </w-field>
</template>

<script>
import { ref } from 'vue'
import { createModel } from 'create-v-model'
import { setupMask } from './w-input-mask.js'
import { default as wField, fieldProps } from './w-field.vue'

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
    if (props.mask) setupMask({ props, emit, inputEl })
    return { model, inputEl }
  }
}
</script>
