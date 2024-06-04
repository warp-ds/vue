<script setup>
import { watch, computed, ref, onMounted, nextTick, onUnmounted } from 'vue';

import { i18n } from '@lingui/core';
import { opposites, directions, autoUpdatePosition, useRecompute as recompute } from '@warp-ds/core/attention';
import { attention as ccAttention } from '@warp-ds/css/component-classes';
import IconClose16 from '@warp-ds/icons/vue/close-16';
import { createModel, modelProps } from 'create-v-model';

import { activateI18n } from '../util/i18n';

import { props as attentionProps, getVariantClasses } from './attentionUtil.js';
import { messages as enMessages } from './locales/en/messages.mjs';
import { messages as fiMessages } from './locales/fi/messages.mjs';
import { messages as nbMessages } from './locales/nb/messages.mjs';
import wAttentionArrow from './w-attention-arrow.vue';

import { absentProp } from '#util';

activateI18n(enMessages, nbMessages, fiMessages);

const props = defineProps({
  ...attentionProps,
  ...modelProps({ modelDefault: absentProp }),
  targetEl: Object,
  attentionClass: [Object, String],
  role: String,
  ariaLabel: String,
  placement: {
    type: String,
    validator(value) {
      return directions.includes(value);
    },
    default: 'bottom',
  },
  distance: {
    type: Number,
    default: 8,
  },
  skidding: {
    type: Number,
    default: 0,
  },
  flip: {
    type: Boolean,
    default: false,
  },
  crossAxis: {
    type: Boolean,
    default: false,
  },
  fallbackPlacements: {
    type: Array,
    validator(values) {
      return values.every((value) => directions.includes(value));
    },
  },
});

const emit = defineEmits(['update:modelValue', 'dismiss']);
const attentionClasses = computed(() => ({
  [props.attentionClass]: true,
  [ccAttention.notCallout]: !props.callout,
}));

const wrapperClasses = computed(() => [ccAttention.base, getVariantClasses(props).wrapper]);

const model = props.modelValue === absentProp ? ref(true) : createModel({ props, emit });
const attentionEl = ref(null);
const arrowEl = ref(null);
const actualDirection = ref(props.placement);
const targetElRef = ref(props.targetEl || null);

const attentionState = computed(() => ({
  get isShowing() {
    return model.value;
  },
  isCallout: props.callout,
  get actualDirection() {
    return actualDirection.value;
  },
  set actualDirection(v) {
    actualDirection.value = v;
  },
  directionName: props.placement,
  arrowEl: arrowEl.value?.$el,
  attentionEl: attentionEl.value,
  targetEl: targetElRef.value,
  noArrow: props.noArrow,
  distance: props.distance,
  skidding: props.skidding,
  flip: props.flip,
  crossAxis: props.crossAxis,
  fallbackPlacements: props.fallbackPlacements,
  waitForDOM: nextTick,
}));

const ariaClose = i18n._({
  id: 'attention.aria.close',
  message: 'Close',
  comment: 'Aria label for the close button in attention',
});

// TODO: See if we can move this function to the core repo:
const pointingAtDirection = computed(() => {
  switch (opposites[actualDirection.value]) {
    case 'top-start':
    case 'top':
    case 'top-end':
      return i18n._({
        id: 'attention.aria.pointingUp',
        message: 'pointing up',
        comment: 'Default screenreader message for top direction in the attention component',
      });
    case 'right-start':
    case 'right':
    case 'right-end':
      return i18n._({
        id: 'attention.aria.pointingRight',
        message: 'pointing right',
        comment: 'Default screenreader message for right direction in the attention component',
      });
    case 'bottom-start':
    case 'bottom':
    case 'bottom-end':
      return i18n._({
        id: 'attention.aria.pointingDown',
        message: 'pointing down',
        comment: 'Default screenreader message for bottom direction in the attention component',
      });
    case 'left-start':
    case 'left':
    case 'left-end':
      return i18n._({
        id: 'attention.aria.pointingLeft',
        message: 'pointing left',
        comment: 'Default screenreader message for left direction in the attention component',
      });
    default:
      return '';
  }
});

// TODO: See if we can move this function to the core repo:
const activeAttentionType = computed(() => {
  switch (true) {
    case props.tooltip:
      return i18n._({
        id: 'attention.aria.tooltip',
        message: 'tooltip',
        comment: 'Default screenreader message for tooltip in the attention component',
      });
    case props.callout:
      return i18n._({
        id: 'attention.aria.callout',
        message: 'callout speech bubble',
        comment: 'Default screenreader message for callout speech bubble in the attention component',
      });
    case props.popover:
      return i18n._({
        id: 'attention.aria.popover',
        message: 'popover speech bubble',
        comment: 'Default screenreader message for popover speech bubble in the attention component',
      });
    case props.highlight:
      return i18n._({
        id: 'attention.aria.highlight',
        message: 'highlighted speech bubble',
        comment: 'Default screenreader message for highlighted speech bubble in the attention component',
      });
    default:
      return '';
  }
});

// TODO: See if we can move this function to the core repo:
const defaultAriaLabel = computed(() => {
  return `${activeAttentionType.value} ${!props.noArrow ? pointingAtDirection.value : ''}`;
});

let cleanup;

onMounted(() => {
  recompute(attentionState.value);
});

watch(
  () => [props.callout, props.targetEl],
  ([callout, target]) => {
    if (callout && target === undefined) {
      targetElRef.value = document.createElement('div');
    } else {
      targetElRef.value = props.targetEl;
    }
  },
  { immediate: true },
);

watch(
  () => [targetElRef.value, model.value, attentionEl.value],
  ([target, m, att]) => {
    if (!cleanup && m && target && att) {
      cleanup = autoUpdatePosition(attentionState.value);
    } else if (cleanup) {
      cleanup();
      cleanup = null;
    }
  },
  { immediate: true },
);

onUnmounted(async () => {
  if (cleanup) {
    cleanup();
    cleanup = null;
  }
});
</script>

<script>
export default { name: 'wAttention' };
</script>

<template>
  <div v-show="model" v-if="props.callout || (props.targetEl !== undefined && !props.callout)" ref="attentionEl" :class="attentionClasses">
    <div
      :role="props.role === '' ? undefined : props.tooltip ? 'tooltip' : 'img'"
      :aria-label="props.ariaLabel === '' ? undefined : props.ariaLabel ?? defaultAriaLabel"
      :class="wrapperClasses"
      data-test="wrapper">
      <w-attention-arrow v-if="!noArrow" v-bind="$props" ref="arrowEl" :direction="actualDirection" />
      <div :class="ccAttention.content">
        <slot />
      </div>
      <button
        v-if="canClose"
        :aria-label="ariaClose"
        :class="ccAttention.closeBtn"
        @click="$emit('dismiss')"
        @keydown.esc="$emit('dismiss')">
        <icon-close-16 />
      </button>
    </div>
  </div>
</template>
