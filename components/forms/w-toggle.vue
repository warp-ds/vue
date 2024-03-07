<template>
  <w-field as="fieldset" v-bind="{ ...$attrs, ...$props }" :role="role" #default="{ triggerValidation }">
    <div :class="wrapperClasses">
      <div :class="groupClasses" v-for="(toggle, i) in toggles">
        <w-toggle-item
          v-model="model"
          :indeterminate="indeterminate"
          :type="type"
          :radioButton="radioButton"
          :disabled="disabled"
          :invalid="invalid"
          :equalWidth="equalWidth"
          :small="small"
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
import { toggle as ccToggle } from '@warp-ds/css/component-classes';
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
  indeterminate: Boolean,
  toggles: {
    type: Array,
    required: true,
    validator: (v) => v.every(hasLabelAndValue)
  }
});
const emit = defineEmits(['update:modelValue']);
const model = createModel({ props, emit });
const type = computed(() => (props.radio || props.radioButton) ? 'radio' : 'checkbox');
const role = computed(() => props.toggles.length > 1 ? ((props.radio || props.radioButton) ? 'radiogroup' : 'group') : undefined);
const wrapperClasses = computed(() => ({
  [ccToggle.wrapper]: true,
  [ccToggle.wrapperRadioButtons]: props.radioButton && !props.equalWidth,
  [ccToggle.wrapperRadioButtonsJustified]: props.radioButton && props.equalWidth,
}));

const groupClasses = computed(() => ({
  [ccToggle.radioButtonsGroup]: true,
  [ccToggle.radioButtonsGroupJustified]: props.equalWidth,
}));

</script>

<script>
export default { name: 'wToggle', inheritAttrs: false };
const hasLabelAndValue = e => ('value' in e) && ('label' in e);
</script>