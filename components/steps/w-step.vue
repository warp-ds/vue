<script setup>
import { computed, inject } from 'vue';

import { i18n } from '@lingui/core';
import { step as ccStep } from '@warp-ds/css/component-classes';
import IconCheck16 from '@warp-ds/icons/vue/check-16';

import { activateI18n } from '../util/i18n';

import { messages as daMessages } from './locales/da/messages.mjs';
import { messages as enMessages } from './locales/en/messages.mjs';
import { messages as fiMessages } from './locales/fi/messages.mjs';
import { messages as nbMessages } from './locales/nb/messages.mjs';

activateI18n(enMessages, nbMessages, fiMessages, daMessages);

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
  ccStep.container,
  vertical.value ? ccStep.vertical : ccStep.horizontal,
  vertical.value ? (left.value ? ccStep.alignLeft : ccStep.alignRight) : '',
]);

const lineHorizontalClasses = computed(() => [
  ccStep.line,
  ccStep.lineHorizontalAlignLeft,
  ccStep.lineHorizontal,
  props.active || props.complete ? ccStep.lineComplete : ccStep.lineIncomplete,
]);

const dotClasses = computed(() => [
  ccStep.dot,
  props.active || props.complete ? ccStep.dotActive : ccStep.dotIncomplete,
  vertical.value ? (!left.value ? ccStep.dotAlignRight : '') : ccStep.dotHorizontal,
]);

const lineClasses = computed(() => [
  ccStep.line,
  ccStep.lineHorizontalAlignRight,
  vertical.value ? ccStep.lineVertical : ccStep.lineHorizontal,
  vertical.value && !left.value ? ccStep.lineAlignRight : '',
  props.complete ? ccStep.lineComplete : ccStep.lineIncomplete,
]);

const contentClasses = computed(() => [ccStep.content, vertical.value ? ccStep.contentVertical : ccStep.contentHorizontal]);
</script>

<script>
export default { name: 'wStep' };
</script>

<template>
  <li :class="stepClasses">
    <div v-if="!vertical" :class="lineHorizontalClasses" />
    <div role="img" :aria-label="getAriaLabel(props)" :aria-current="active ? 'step' : undefined" :class="dotClasses">
      <icon-check-16 v-if="complete" />
    </div>
    <div :class="lineClasses" />
    <div :class="contentClasses">
      <slot />
    </div>
  </li>
</template>
