<template>
  <w-field v-bind="{ ...$attrs, ...$props }" #default="{ triggerValidation }">
    <div class="input mb-0">
      <div class="input--select__wrap">
        <select v-bind="{ ...$attrs, class: '' }" v-model="model" :id="id" @blur="triggerValidation">
          <slot />
        </select>
      </div>
    </div>
  </w-field>
</template>

<script>
import { createModel } from 'create-v-model'
import { default as wField, fieldProps } from './w-field.vue'

export default {
  name: 'wSelect',
  components: { wField },
  inheritAttrs: false,
  props: fieldProps,
  setup: (props, { emit }) => ({
    model: createModel({ props, emit })
  })
}
</script>
