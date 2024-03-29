<script setup>
import { watch, computed, ref, onMounted, nextTick } from 'vue'
import { attention as ccAttention } from '@warp-ds/css/component-classes'
import { computePosition, flip, offset, shift, arrow } from '@floating-ui/dom'
import IconClose16 from "@warp-ds/icons/vue/close-16";

import { absentProp } from '#util'
import {
  props as attentionProps,
  directions,
  computeCalloutArrow,
  getVariantClasses
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
  attentionEl: {
    default: () => ref(null),
  },
  role: String,
  ariaLabel: String,
})

const emit = defineEmits(['update:modelValue', 'dismiss'])
const directionName = computed(() => directions.find((e) => props[e]))

const attentionClasses = computed(() => ({
  [props.attentionClass]: true,
  [ccAttention.notCallout]: !props.callout
}))

const wrapperClasses = computed(() => [
  ccAttention.base,
  getVariantClasses(props).wrapper
])

const model =
  props.modelValue === absentProp ? ref(true) : createModel({ props, emit })
const arrowEl = ref(null)
const actualDirection = ref(directionName.value)

const recompute = async () => {
  if (!model.value) return
  await nextTick()
  if (props.callout)
    return computeCalloutArrow({ directionName, arrowEl, actualDirection })
  if (!props.attentionEl.value) return

  const position = await computePosition(
    props.targetEl,
    props.attentionEl.value,
    {
      placement: directionName.value,
      middleware: [
        flip(),
        offset(8),
        shift({ padding: 16 }),
        arrow({ element: props.noArrow ? undefined : arrowEl.value.$el }),
      ],
    }
  )

  actualDirection.value = position.placement
  Object.assign(props.attentionEl.value.style, {
    left: '0',
    top: '0',
    transform: `translate3d(${Math.round(position.x)}px, ${Math.round(
      position.y
    )}px, 0)`,
  })
  let { x, y } = position.middlewareData.arrow
  arrowEl.value.$el.style.left = x ? x + 'px' : null
  arrowEl.value.$el.style.top = y ? y + 'px' : null
}

const ariaClose = i18n._({ id: 'attention.aria.close', message: 'Close', comment: 'Aria label for the close button in attention' });

// TODO: See if we can move this function to the core repo:
const pointingAtDirection = computed(() => {
  switch (opposites[actualDirection.value]) {
    case 'top':
      return i18n._({
        id: 'attention.aria.pointingUp',
        message: 'pointing up',
        comment:
          'Default screenreader message for top direction in the attention component',
      })
    case 'right':
      return i18n._({
        id: 'attention.aria.pointingRight',
        message: 'pointing right',
        comment:
          'Default screenreader message for right direction in the attention component',
      })
    case 'bottom':
      return i18n._({
        id: 'attention.aria.pointingDown',
        message: 'pointing down',
        comment:
          'Default screenreader message for bottom direction in the attention component',
      })
    case 'left':
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

onMounted(async () => {
  watch(() => [props.top, props.bottom, props.left, props.right], recompute)
  watch(model, recompute, { immediate: props.callout })
})
</script>

<template>
  <div :class="attentionClasses" ref="attentionRef" v-show="model">
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
      <button v-if="canClose" :aria-label="ariaClose" @click="$emit('dismiss')" @keydown.esc="$emit('dismiss')" :class="ccAttention.closeBtn">
        <icon-close-16 />
      </button>
    </div>
  </div>
</template>

<script>
export default { name: 'wAttention' }
</script>
