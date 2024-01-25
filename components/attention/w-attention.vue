<script setup>
import { watch, computed, ref, nextTick } from 'vue'
import { attention as ccAttention } from '@warp-ds/css/component-classes'
import {
  computePosition,
  flip,
  offset,
  shift,
  arrow,
  autoUpdate,
} from '@floating-ui/dom'
import IconClose16 from '@warp-ds/icons/vue/close-16'

import { absentProp } from '#util'
import {
  props as attentionProps,
  directions,
  computeCalloutArrow,
  getVariantClasses,
} from './attentionUtil.js'
import { opposites } from '@warp-ds/core/attention'
import wAttentionArrow from './w-attention-arrow.vue'
import { createModel, modelProps } from 'create-v-model'
import { i18n } from '@lingui/core'
import { activateI18n } from '../util/i18n'
import { messages as enMessages } from './locales/en/messages.mjs'
import { messages as nbMessages } from './locales/nb/messages.mjs'
import { messages as fiMessages } from './locales/fi/messages.mjs'

activateI18n(enMessages, nbMessages, fiMessages)

const props = defineProps({
  ...attentionProps,
  ...modelProps({ modelDefault: absentProp }),
  targetEl: Object,
  attentionClass: [Object, String],
  role: String,
  ariaLabel: String,
})

const emit = defineEmits(['update:modelValue', 'dismiss'])
// directions are in camelCase but floating-ui's placement accepts only kebab-case, so we have to convert directions into kebab-case:
const directionName = computed(() => directions.find((e) => props[e]).replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase())

const attentionClasses = computed(() => ({
  [props.attentionClass]: true,
  [ccAttention.notCallout]: !props.callout,
}))

const wrapperClasses = computed(() => [
  ccAttention.base,
  getVariantClasses(props).wrapper,
])

const model = props.modelValue === absentProp ? ref(true) : createModel({ props, emit })
const attentionEl = ref(null);
const arrowEl = ref(null)
const actualDirection = ref(directionName.value)

const recompute = async () => {
  if (!model.value)return
  await nextTick()
  if (props.callout)
  return computeCalloutArrow({ directionName, arrowEl, actualDirection })
if (!attentionEl.value)return
  computePosition(props.targetEl, attentionEl.value, {
        placement: directionName.value,
        middleware: [
          offset(8),
          flip(),
          shift({ padding: 16 }),
          !props.noArrow && arrow({ element: arrowEl.value.$el })]
      }).then(({ x, y, middlewareData, placement}) => {
        actualDirection.value = placement
        console.log("actualDirection.value: ", actualDirection.value);
        Object.assign(attentionEl.value?.style, {
          left: `${x}px`,
          top: `${y}px`,
        })
    
        if (middlewareData.arrow) {
          const { x, y } = middlewareData.arrow
          Object.assign(arrowEl.value.$el?.style || {}, {
            left: x ? `${x}px` : '',
            // TODO: temporary fix, for some reason left-start and right-start positions the arrowEL slightly too far from the attentionEl
            top: y ? placement.includes("-start") ? `${y - 4}px` : `${y}px` : '',
          });
        }
      });    
} 
  
const ariaClose = i18n._({
  id: 'attention.aria.close',
  message: 'Close',
  comment: 'Aria label for the close button in attention',
})

// TODO: See if we can move this function to the core repo:
const pointingAtDirection = computed(() => {
  switch (opposites[actualDirection.value]) {
    case 'top-start':
    case 'top':
    case 'top-end':
      return i18n._({
        id: 'attention.aria.pointingUp',
        message: 'pointing up',
        comment:
          'Default screenreader message for top direction in the attention component',
      })
    case 'right-start':
    case 'right':
    case 'right-end':
      return i18n._({
        id: 'attention.aria.pointingRight',
        message: 'pointing right',
        comment:
          'Default screenreader message for right direction in the attention component',
      })
    case 'bottom-start':
    case 'bottom':
    case 'bottom-end':
      return i18n._({
        id: 'attention.aria.pointingDown',
        message: 'pointing down',
        comment:
          'Default screenreader message for bottom direction in the attention component',
      })
    case 'left-start':
    case 'left':
    case 'left-end':
      return i18n._({
        id: 'attention.aria.pointingLeft',
        message: 'pointing left',
        comment:
          'Default screenreader message for left direction in the attention component',
      })
    default:
      return ''
  }
})

// TODO: See if we can move this function to the core repo:
const activeAttentionType = computed(() => {
  switch (true) {
    case props.tooltip:
      return i18n._({
        id: 'attention.aria.tooltip',
        message: 'tooltip',
        comment:
          'Default screenreader message for tooltip in the attention component',
      })
    case props.callout:
      return i18n._({
        id: 'attention.aria.callout',
        message: 'callout speech bubble',
        comment:
          'Default screenreader message for callout speech bubble in the attention component',
      })
    case props.popover:
      return i18n._({
        id: 'attention.aria.popover',
        message: 'popover speech bubble',
        comment:
          'Default screenreader message for popover speech bubble in the attention component',
      })
    case props.highlight:
      return i18n._({
        id: 'attention.aria.highlight',
        message: 'highlighted speech bubble',
        comment:
          'Default screenreader message for highlighted speech bubble in the attention component',
      })
    default:
      return ''
  }
})

// TODO: See if we can move this function to the core repo:
const defaultAriaLabel = computed(() => {
  return `${activeAttentionType.value} ${
    !props.noArrow ? pointingAtDirection.value : ''
  }`
})

let cleanup;

  watch(
    () => [
      props.topStart,
      props.top,
      props.topEnd,
      props.bottomStart,
      props.bottom,
      props.bottomEnd,
      props.leftStart,
      props.left,
      props.leftEnd,
      props.rightStart,
      props.right,
      props.rightEnd,
    ],
    recompute
  );

watch(() => [props.targetEl, model.value], ([target, m]) =>  {
  console.log('watch targetEl', target, m)
  if (!cleanup && target && m) {
    console.log('autoupdate', props.targetEl, attentionEl.value);
    cleanup = autoUpdate(props.targetEl, attentionEl.value, recompute);
  } else if (cleanup) {
    console.log('cleanup', target, m)
    cleanup();
    cleanup = null;
  }
}, { immediate: true });
</script>

<template>
  <div :class="attentionClasses" ref="attentionEl" v-show="model">
    <div
      :role="props.role === '' ? undefined : props.tooltip ? 'tooltip' : 'img'"
      :aria-label="
        props.ariaLabel === '' ? undefined : props.ariaLabel ?? defaultAriaLabel
      "
      :class="wrapperClasses"
      data-test="wrapper"
    >
      <w-attention-arrow
        v-bind="$props"
        v-if="!noArrow"
        ref="arrowEl"
        :direction="actualDirection"
      />
      <div :class="ccAttention.content">
        <slot />
      </div>
      <button
        v-if="canClose"
        :aria-label="ariaClose"
        @click="$emit('dismiss')"
        @keydown.esc="$emit('dismiss')"
        :class="ccAttention.closeBtn"
      >
        <icon-close-16 />
      </button>
    </div>
  </div>
</template>

<script>
export default { name: 'wAttention' }
</script>
