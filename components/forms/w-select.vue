<script setup>
import { computed } from 'vue';

import { select as ccSelect } from '@warp-ds/css/component-classes';
import IconChevronDown16 from '@warp-ds/icons/vue/chevron-down-16';
import { createModel } from 'create-v-model';

import { default as wField, fieldProps } from './w-field.vue';

const p = defineProps(fieldProps);
const emit = defineEmits(['update:modelValue']);
const model = createModel({ props: p, emit });

const chevronClasses = computed(() => [ccSelect.chevron, { [ccSelect.chevronDisabled]: p.disabled }]);

const getSelectClasses = (hasValidationErrors) => [
  ccSelect.base,
  {
    [ccSelect.default]: !hasValidationErrors && !p.disabled && !p.readOnly,
    [ccSelect.disabled]: p.disabled,
    [ccSelect.invalid]: hasValidationErrors,
    [ccSelect.readOnly]: p.readOnly,
  },
];

const handleKeyDown = (event) => {
  if (p.readOnly && (event.key === ' ' || event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
    event.preventDefault();
  }
};
</script>

<script>
export default { name: 'wSelect', inheritAttrs: false };
</script>

<template>
  <w-field v-slot="{ triggerValidation, aria, hasValidationErrors }" v-bind="{ ...$attrs, ...$props }">
    <div :class="ccSelect.wrapper">
      <div :class="ccSelect.selectWrapper">
        <select
          v-bind="{ ...aria, ...$attrs, class: '' }"
          :id="id"
          v-model="model"
          :class="getSelectClasses(hasValidationErrors)"
          :disabled="disabled"
          @keydown="handleKeyDown"
          @blur="triggerValidation">
          <slot />
        </select>
        <div :class="chevronClasses">
          <icon-chevron-down-16 />
        </div>
      </div>
    </div>
  </w-field>
</template>
