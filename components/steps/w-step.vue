<script setup>
import { computed, inject } from 'vue';
import { step as ccStep } from '@warp-ds/css/component-classes';

const vertical = inject('steps-vertical', true);
const left = inject('steps-left', true);

const props = defineProps({
  active: Boolean,
  complete: Boolean,
});

const stepClasses = computed(() => [
  ccStep.step,
  {
    [ccStep.stepVertical]: vertical.value,
    [ccStep.stepVerticalLeft]: vertical.value && left.value,
    [ccStep.stepVerticalRight]: vertical.value && !left.value,
    [ccStep.stepHorizontal]: !vertical.value,
  },
]);

const horizontalClasses = computed(() => [
  ccStep.stepLine,
  ccStep.stepLineHorizontalLeft,
  {
    [ccStep.stepLineHorizontal]: !vertical.value,
    [ccStep.stepLineIncomplete]: !props.active && !props.complete,
    [ccStep.stepLineComplete]: props.active || props.complete,
  },
]);

const stepDotClasses = computed(() => [
  ccStep.stepDot,
  {
    [ccStep.stepDotVertical]: vertical.value,
    [ccStep.stepDotVerticalLeft]: vertical.value && left.value,
    [ccStep.stepDotVerticalRight]: vertical.value && !left.value,
    [ccStep.stepDotHorizontal]: !vertical.value,
    [ccStep.stepDotIncomplete]: !(props.active || props.complete),
    [ccStep.stepDotActive]: props.active || props.complete,
  },
]);

const stepLineClasses = computed(() => [
  ccStep.stepLine,
  ccStep.stepLineHorizontalRight,
  {
    [ccStep.stepLineVertical]: vertical.value,
    [ccStep.stepLineVerticalLeft]: vertical.value && left.value,
    [ccStep.stepLineVerticalRight]: vertical.value && !left.value,
    [ccStep.stepLineHorizontal]: !vertical.value,
    [ccStep.stepLineIncomplete]: !props.complete,
    [ccStep.stepLineComplete]: props.complete,
  },
]);

const contentClasses = computed(() => [
  ccStep.content,
  {
    [ccStep.contentVertical]: vertical.value,
    [ccStep.contentHorizontal]: !vertical.value,
  },
]);
</script>

<template>
  <div :class="stepClasses">
    <div v-if="!vertical" :class="horizontalClasses" />
    <div :aria-current="active ? 'step' : undefined" :class="stepDotClasses">
      <svg
        v-if="complete"
        role="img"
        aria-label="✓"
        xmlns="http:www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
      >
        <path
          fill="currentColor"
          d="M13.007 4.447a.75.75 0 01.046 1.06l-5.5 6a.75.75 0 01-1.083.023l-3-3a.75.75 0 011.06-1.06l2.446 2.446 4.971-5.423a.75.75 0 011.06-.046z"
        />
      </svg>
    </div>
    <div :class="stepLineClasses" />
    <div :class="contentClasses">
      <slot />
    </div>
  </div>
</template>

<script>
export default { name: 'wStep' };
</script>
