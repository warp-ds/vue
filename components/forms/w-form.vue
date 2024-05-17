<script setup>
import { watchEffect } from 'vue';

import { modelProps } from 'create-v-model';

import { createValidationCollector } from './validation';

import { absentProp } from '#util';

const props = defineProps({
  as: {
    default: 'form',
  },
  shouldValidate: {
    type: null,
    default: absentProp,
  },
  ...modelProps({ modelDefault: absentProp }),
  ...modelProps({ modelName: 'completed', modelDefault: absentProp }),
});

const emit = defineEmits(['update:modelValue']);
const { allChildrenValid, completed, childrenShouldValidate } = createValidationCollector();

if (props.modelValue !== absentProp) watchEffect(() => emit('update:modelValue', allChildrenValid.value));
if (props.completed !== absentProp) watchEffect(() => emit('update:completed', completed.value));
if (props.shouldValidate !== absentProp) watchEffect(() => (childrenShouldValidate.value = props.shouldValidate));
</script>

<template>
  <component :is="as">
    <slot />
  </component>
</template>

<script>
export default { name: 'WForm' };
</script>
