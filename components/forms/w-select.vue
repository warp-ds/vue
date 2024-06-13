<script setup>
import { computed } from 'vue';

import { select as ccSelect } from '@warp-ds/css/component-classes';
import IconChevronDown16 from '@warp-ds/icons/vue/chevron-down-16';
import { createModel } from 'create-v-model';

import { default as wField, fieldProps } from './w-field.vue';

const p = defineProps(fieldProps);
const emit = defineEmits(['update:modelValue']);
const model = createModel({ props: p, emit });

const wrapperClasses = computed(() => ({
  [ccSelect.wrapper]: true,
}));

const selectWrapperClasses = computed(() => ({
  [ccSelect.selectWrapper]: true,
}));

const chevronClasses = computed(() => ({
  [ccSelect.chevron]: true,
  [ccSelect.chevronDisabled]: p.disabled,
}));
</script>

<script>
export default { name: 'wSelect', inheritAttrs: false };
</script>

<template>
  <w-field v-slot="{ triggerValidation, aria, hasValidationErrors }" v-bind="{ ...$attrs, ...$props }">
    <div :class="wrapperClasses">
      <div :class="selectWrapperClasses">
        <select
          v-bind="{ ...aria, ...$attrs, class: '' }"
          :id="id"
          v-model="model"
          :class="{
            [ccSelect.base]: true,
            [ccSelect.default]: !hasValidationErrors && !p.disabled && !p.readOnly,
            [ccSelect.disabled]: p.disabled,
            [ccSelect.invalid]: hasValidationErrors,
            [ccSelect.readOnly]: p.readOnly,
          }"
          :disabled="disabled"
          :readOnly="readOnly"
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
