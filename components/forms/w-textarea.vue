<template>
  <w-field v-bind="{ ...$attrs, ...$props }" #default="{ triggerValidation }">
    <div :class="wrapperClass">
      <textarea :class="inputClasses" v-bind="{ ...$attrs, class: '' }" v-model="model" :id="id" @blur="triggerValidation" />
    </div>
  </w-field>
</template>

<script>
import { computed } from 'vue';
import { input as ccInput } from '@warp-ds/component-classes';
import { createModel } from 'create-v-model';
import { default as wField, fieldProps } from './w-field.vue';

export default {
  name: 'wTextarea',
  components: { wField },
  inheritAttrs: false,
  props: {
    ...fieldProps,
    invalid: Boolean,
    disabled: Boolean,
    readOnly: Boolean,
    placeholder: String
  },
  setup: (props, { emit }) => {
    const wrapperClass = ccInput.wrapper;
    const inputClasses = computed(() => ({
    [`${ccInput.default} ${ccInput.textArea}`]: true,
    [ccInput.invalid]: props.invalid,
    [ccInput.disabled]: props.disabled,
    [ccInput.readOnly]: props.readOnly,
    [ccInput.placeholder]: !!props.placeholder,
    }));
    const model = createModel({ props, emit });
    return { model, inputClasses, wrapperClass }
  }
}
</script>
