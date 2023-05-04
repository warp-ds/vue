<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<script>
export default { name: 'wButtonGroup' }
</script>

<script setup>
import { provide, computed, toRef } from 'vue';
import { buttonGroup as ccButtonGroup } from '@warp-ds/component-classes';

const props = defineProps({
  outlined: Boolean,
  raised: Boolean,
  vertical: Boolean
})

provide('outlined', toRef(props, 'outlined'))
provide('vertical', toRef(props, 'vertical'))

const nonOutlinedClass = props.vertical ? ccButtonGroup.nonOutlinedVertical : ccButtonGroup.nonOutlinedHorizontal

const classes = computed(() => [
  ccButtonGroup.wrapper,
  props.raised ? ccButtonGroup.raised : '',
  props.vertical ? ccButtonGroup.vertical : '',
  props.outlined ? '' : nonOutlinedClass
])
</script>
