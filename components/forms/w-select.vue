<script setup>
import { select as ccSelect } from '@warp-ds/css/component-classes';
import IconChevronDown16 from '@warp-ds/icons/vue/chevron-down-16';
import { createModel } from 'create-v-model';

import { default as wField, fieldProps } from './w-field.vue';

const p = defineProps(fieldProps);
const emit = defineEmits(['update:modelValue']);
const model = createModel({ props: p, emit });

function getSelectClasses(hasValidationErrors) {
  return {
    [ccSelect.base]: true,
    [ccSelect.default]: !hasValidationErrors && !p.disabled && !p.readOnly,
    [ccSelect.disabled]: p.disabled,
    [ccSelect.invalid]: hasValidationErrors,
    [ccSelect.readOnly]: p.readOnly,
  };
}
</script>

<script>
export default { name: 'wSelect', inheritAttrs: false };
</script>

<template>
  <w-field v-slot="{ triggerValidation, aria, hasValidationErrors }" v-bind="{ ...$attrs, ...$props }">
    <div :class="{ [ccSelect.wrapper]: true }">
      <div :class="{ [ccSelect.selectWrapper]: true }">
        <select
          v-bind="{ ...aria, ...$attrs, class: '' }"
          :id="id"
          v-model="model"
          :class="getSelectClasses(hasValidationErrors)"
          :disabled="disabled"
          :readOnly="readOnly"
          @blur="triggerValidation">
          <slot />
        </select>
        <div
          :class="{
            [ccSelect.chevron]: true,
            [ccSelect.chevronDisabled]: p.disabled,
          }">
          <icon-chevron-down-16 />
        </div>
      </div>
    </div>
  </w-field>
</template>
