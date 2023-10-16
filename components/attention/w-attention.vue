<script setup>
  import { watch, computed, ref, onMounted, nextTick } from 'vue'
  import { attention as ccAttention } from '@warp-ds/css/component-classes'
  import { computePosition, flip, offset, shift, arrow } from '@floating-ui/dom'

  import { absentProp } from '#util'
  import { props as attentionProps, directions, computeCalloutArrow } from './attentionUtil.js'
  import { opposites } from '@warp-ds/core/attention'
  import wAttentionArrow from './w-attention-arrow.vue'
  import { createModel, modelProps } from 'create-v-model'

  const props = defineProps({
    ...attentionProps,
    ...modelProps({ modelDefault: absentProp }),
    targetEl: Object,
    attentionClass: [Object, String],
    attentionEl: {
      default: () => ref(null),
    },
  })

  const emit = defineEmits(['update:modelValue'])
  const directionName = computed(() => directions.find((e) => props[e]))

  const attentionClasses = computed(() => ({
    [props.attentionClass]: true,
    [ccAttention.notCallout]: !props.callout,
  }))

  const wrapperClasses = computed(() => ({
    [ccAttention.base]: true,
    [ccAttention.tooltip]: props.tooltip,
    [ccAttention.callout]: props.callout,
    [ccAttention.popover]: props.popover,
  }))

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

  const activeAttentionProp = computed(() =>
    props.tooltip
      ? 'tooltip'
      : props.callout
      ? 'callout'
      : props.popover
      ? 'popover'
      : ''
  )

  const pointingAt = computed(() =>
    !props.noArrow ? `pointing to the ${opposites[actualDirection.value]}` : ''
  )

  onMounted(async () => {
    watch(() => [props.top, props.bottom, props.left, props.right], recompute)
    watch(model, recompute, { immediate: props.callout })
  })
</script>

<template>
  <div
    :role="props.tooltip ? 'tooltip' : 'img'"
    :aria-label="`${activeAttentionProp} speech bubble ${pointingAt}`"
    tabindex="0"
    :class="attentionClasses"
    ref="attentionRef"
    v-show="model"
  >
    <div :class="wrapperClasses" data-test="wrapper">
      <w-attention-arrow
        v-bind="$props"
        v-if="!noArrow"
        ref="arrowEl"
        :direction="actualDirection"
      />
      <div :class="ccAttention.content"><slot /></div>
    </div>
  </div>
</template>

<script>
export default { name: 'wAttention' }
</script>
