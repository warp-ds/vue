<script setup>
import { computed } from 'vue';
import { select as ccSelect } from '@warp-ds/css/component-classes';
import { createModel } from 'create-v-model'
import { default as wField, fieldProps } from './w-field.vue'
import IconChevronDown16 from "@warp-ds/icons/vue/chevron-down-16";

const p = defineProps(fieldProps);
const emit = defineEmits(['update:modelValue']);
const model = createModel({ props: p, emit });

const wrapperClasses = computed(() => ({
  [ccSelect.wrapper]: true
}));

const selectWrapperClasses = computed(() => ({
  [ccSelect.selectWrapper]: true
}));

const selectClasses = computed(() => ({
  [ccSelect.default]: true,
  [ccSelect.disabled]: p.disabled,
  [ccSelect.readOnly]: p.readOnly
}));

const chevronClasses = computed(() => ({
  [ccSelect.chevron]: true,
  [ccSelect.chevronDisabled]: p.disabled,
}));

</script>

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
          :disabled="disabled"
          :readOnly="readOnly"
          v-bind="{ ...$attrs, class: '' }" v-model="model" :id="id" @blur="triggerValidation">
          <slot />
        </select>
        <div :class="chevronClasses">
          <icon-chevron-down-16 />
        </div>
      </div>
    </div>
  </w-field>
</template>

<script>
export default { name: 'wSelect', inheritAttrs: false };
</script>
