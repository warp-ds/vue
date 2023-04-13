<template>
  <w-field v-bind="{ ...$attrs, ...$props }" #default="{ triggerValidation }">
    <div :class="wrapperClass">
      <textarea :class="inputClasses" v-bind="{ ...$attrs, class: '' }" v-model="model" :id="id" @blur="triggerValidation" />
    </div>
  </w-field>
</template>

<script>
import { computed } from 'vue';
import { input } from '@warp-ds/component-classes';
import { createModel } from 'create-v-model';
import { default as wField, fieldProps } from './w-field.vue';

export default {
  name: 'wTextarea',
  components: { wField },
  inheritAttrs: false,
  props: fieldProps,
  setup: (props, { emit }) => {
    const wrapperClass = input.wrapper;
    const inputClasses = computed(() => ({
    [input.default]: true,
    [input.invalid]: props.invalid,
    [input.disabled]: props.disabled,
    [input.readOnly]: props.readOnly,
    [input.placeholder]: !!props.placeholder,
    }));
    const model = createModel({ props, emit });
    return { model, inputClasses, wrapperClass }
  }
}
</script>
