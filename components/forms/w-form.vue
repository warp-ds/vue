<script setup>
  import { watchEffect } from 'vue'
  import { absentProp } from '#util'
  import { createValidationCollector } from './validation'

  const props = defineProps({
    as: {
      default: 'form'
    },
    shouldValidate: {
      type: null,
      default: absentProp
    },
    modelValue: {
      default: absentProp
    },
    completed: {
      default: absentProp
    }
  })

  const emit = defineEmits(['update:modelValue', 'update:completed']);
  const { allChildrenValid, completed, childrenShouldValidate } = createValidationCollector()

  if (props.modelValue !== absentProp) watchEffect(() => emit('update:modelValue', allChildrenValid.value))
  if (props.completed !== absentProp) watchEffect(() => emit('update:completed', completed.value))
  if (props.shouldValidate !== absentProp) watchEffect(() => childrenShouldValidate.value = props.shouldValidate)
</script>

<template>
  <component :is="as">
    <slot />
  </component>
</template>

<script>
export default { name: 'wForm' };
</script>

