<template>
  <div
    :class="{
      [ccStep.step]: true,
      [ccStep.stepVertical]: vertical,
      [ccStep.stepVerticalLeft]: vertical && left,
      [ccStep.stepVerticalRight]: vertical && !left,
      [ccStep.stepHorizontal]: !vertical,
    }"
  >
    <div
      v-if="!vertical"
      :class="{
        [ccStep.stepLine]: true,
        [ccStep.stepLineHorizontal]: !vertical,
        [ccStep.stepLineHorizontalLeft]: true,
        [ccStep.stepLineIncomplete]: !active && !complete,
        [ccStep.stepLineComplete]: active || complete,
      }"
    />
    <div
      :aria-current="active ? 'step' : undefined"
      :class="{
        [ccStep.stepDot]: true,
        [ccStep.stepDotVertical]: vertical,
        [ccStep.stepDotVerticalLeft]: vertical && left,
        [ccStep.stepDotVerticalRight]: vertical && !left,
        [ccStep.stepDotHorizontal]: !vertical,
        [ccStep.stepDotIncomplete]: !(active || complete),
        [ccStep.stepDotActive]: active,
        [ccStep.stepDotComplete]: complete,
      }"
    >
      <svg
        v-if="complete"
        role="img"
        :aria-label="'✓'"
        xmlns="http://www.w3.org/2000/svg"
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
    <div
      :class="{
        [ccStep.stepLine]: true,
        [ccStep.stepLineVertical]: vertical,
        [ccStep.stepLineVerticalLeft]: vertical && left,
        [ccStep.stepLineVerticalRight]: vertical && !left,
        [ccStep.stepLineHorizontal]: !vertical,
        [ccStep.stepLineHorizontalRight]: true,
        [ccStep.stepLineIncomplete]: !complete,
        [ccStep.stepLineComplete]: complete,
      }"
    />
    <div
      :class="{
        [ccStep.content]: true,
        [ccStep.contentVertical]: vertical,
        [ccStep.contentHorizontal]: !vertical,
      }"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import { inject } from 'vue';
import { step as ccStep } from '@warp-ds/component-classes';

export default {
  name: 'wStep',
  props: {
    active: Boolean,
    complete: Boolean,
  },
  setup: () => ({
    vertical: inject('steps-vertical', true),
    left: inject('steps-left', true),
    ccStep,
  }),
};
</script>
