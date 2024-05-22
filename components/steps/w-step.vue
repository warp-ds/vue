<script setup>
import { computed, inject } from 'vue';

import { i18n } from '@lingui/core';
import { step as ccStep } from '@warp-ds/css/component-classes';
import IconCheck16 from '@warp-ds/icons/vue/check-16';

import { activateI18n } from '../util/i18n';

import { messages as enMessages } from './locales/en/messages.mjs';
import { messages as fiMessages } from './locales/fi/messages.mjs';
import { messages as nbMessages } from './locales/nb/messages.mjs';

activateI18n(enMessages, nbMessages, fiMessages);

const vertical = inject('steps-vertical', true);
const left = inject('steps-left', true);

const props = defineProps({
  active: Boolean,
  complete: Boolean,
});

const availableAriaLabels = {
  complete: i18n._(
    /*i18n*/ {
      id: 'steps.aria.completed',
      message: 'Step indicator completed circle',
      comment: 'Completed circle',
    },
  ),
  active: i18n._(
    /*i18n*/ {
      id: 'steps.aria.active',
      message: 'Step indicator active circle',
      comment: 'Active circle',
    },
  ),
  default: i18n._(
    /*i18n*/ {
      id: 'steps.aria.emptyCircle',
      message: 'Empty circle',
      comment: 'Empty circle',
    },
  ),
};

const getAriaLabel = (props) => {
  const ariaLabel = Object.keys(availableAriaLabels).find((a) => props[a]);
  return ariaLabel ? availableAriaLabels[ariaLabel] : availableAriaLabels.default;
};

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

<script>
export default { name: 'wStep' };
</script>

<template>
  <li :class="stepClasses">
    <div v-if="!vertical" :class="horizontalClasses" />
    <div role="img" :aria-label="getAriaLabel(props)" :aria-current="active ? 'step' : undefined" :class="stepDotClasses">
      <icon-check-16 v-if="complete" />
    </div>
    <div :class="stepLineClasses" />
    <div :class="contentClasses">
      <slot />
    </div>
  </li>
</template>
