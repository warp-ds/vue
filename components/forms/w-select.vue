<template>
  <w-field v-bind="{ ...$attrs, ...$props }" #default="{ triggerValidation, hasValidationErrors }">
    <div :class="wrapperClasses">
      <div :class="selectWrapperClasses">
        <select
          :class="[
            selectClasses,
            {
              [ccSelect.invalid]: hasValidationErrors,
            }
          ]"
          v-bind="{ ...$attrs, class: '' }" v-model="model" :id="id" @blur="triggerValidation">
          <slot />
        </select>
        <div :class="chevronClasses">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 16 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M2.5 5.5L8 11L13.5 5.5"
            />
          </svg>
        </div>
      </div>
    </div>
  </w-field>
</template>

<script setup>
import { computed, useAttrs } from 'vue';
import { select as ccSelect } from '@warp-ds/component-classes';
import { createModel } from 'create-v-model'
import { default as wField, fieldProps } from './w-field.vue'

const props = defineProps(fieldProps);
const emit = defineEmits(['update:modelValue']);
const model = createModel({ props, emit });

const {disabled, readOnly} = useAttrs();

const wrapperClasses = computed(() => ({
  [ccSelect.wrapper]: true
}));

const selectWrapperClasses = computed(() => ({
  [ccSelect.selectWrapper]: true
}));

const selectClasses = computed(() => ({
  [ccSelect.default]: true,
  [ccSelect.disabled]: disabled,
  [ccSelect.readOnly]: readOnly
}));

const chevronClasses = computed(() => ({
  [ccSelect.chevron]: true,
  [ccSelect.chevronDisabled]: disabled,
}));

</script>

<script>
export default { name: 'wSelect', inheritAttrs: false };
</script>
