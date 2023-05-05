<template>
  <w-field as="fieldset" v-bind="{ ...$attrs, ...$props }" :role="role" #default="{ triggerValidation }">
    <div :class="wrapperClasses">
      <div v-for="(toggle, i) in toggles">
        <w-toggle-item
          v-model="model"
          :type="type"
          :disabled="disabled"
          :invalid="invalid"
          :name="id + ':toggles'"
          :key="id + i + type"
          v-bind="toggle"
          @blur="triggerValidation" />
      </div>
      </div>
  </w-field>
</template>

<script setup>
import { computed } from 'vue';
import { toggle as ccToggle } from '@warp-ds/component-classes';
import { default as wField, fieldProps } from './w-field.vue';
import { wToggleItem } from '#generics';
import { createModel } from 'create-v-model';

const props = defineProps({
  ...fieldProps,
  radio: Boolean,
  checkbox: Boolean,
  radioButton: Boolean,
  equalWidth: Boolean,
  small: Boolean,
  disabled: Boolean,
  invalid: Boolean,
  toggles: {
    type: Array,
    required: true,
    validator: (v) => v.every(hasLabelAndValue)
  }
});
const emit = defineEmits(['update:modelValue']);
const model = createModel({ props, emit });
const isInvalid = props.invalid;
const isRadioButton = props.radioButton;
const isRadio = props.radio;
const isCheckbox = props.checkbox;
const type = computed(() => props.radio ? 'radio' : props.radioButton ? 'radio-button' : 'checkbox');
const role = computed(() => props.toggles.length > 1 ? ((props.radio || props.radioButton) ? 'radiogroup' : 'group') : undefined);

const wrapperClasses = computed(() => ({
  [ccToggle.wrapper]: true,
  [`${ccToggle.segmentControl} ${ccToggle.focusableWithin}`]: isRadioButton,
  [ccToggle.scJustified]: props.equalWidth,
}));

// const wrapperClasses = computed(() => ({
//   'input-toggle--is-disabled': props.disabled && !props.radioButton,
//   'segment-control': props.radioButton,
//   'segment-control--justified': props.equalWidth,
//   'segment-control--small': props.small,
//   'segment-control--is-disabled': props.disabled && props.radioButton,
//   'input-toggle': props.radio || props.checkbox
// }));
const optionsClasses = computed(() => ({
  'flex flex-row segment-control-options': props.radioButton,
}));
</script>

<script>
export default { name: 'wToggle', inheritAttrs: false };
const hasLabelAndValue = e => ('value' in e) && ('label' in e);
</script>