<script setup>
import { computed, ref, useAttrs, watch, onMounted, onBeforeUnmount } from 'vue';

import { useDimensions, createHandlers } from '@warp-ds/core/slider';
import { slider as ccSlider } from '@warp-ds/css/component-classes';
import { modelProps, createModel } from 'create-v-model';

defineOptions({
  name: 'wSlider',
});

const attrs = useAttrs();
const props = defineProps({
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  step: Number,
  label: String,
  labelledBy: String,
  disabled: Boolean,
  preventAcceleration: Boolean,
  ...modelProps(),
});

const emit = defineEmits(['focus', 'blur']);

const sliderLine = ref(null);
const thumb = ref(null);
const dimensions = ref({});
const sliderPressed = ref(false);
const v = createModel({ props, emit });
const position = ref(v.value);

// step is a computed, so we can check if props.step is set or not and only do getShiftedChange when set
const step = computed(() => props.step || 1);

const updateDimensions = (_v) => (dimensions.value = _v);
const { mountedHook, unmountedHook } = useDimensions();
onMounted(() => mountedHook(sliderLine.value, updateDimensions));
onBeforeUnmount(unmountedHook);

const sliderState = {
  get position() {
    return position.value;
  },
  set position(v) {
    position.value = v;
  },
  get sliderPressed() {
    return sliderPressed.value;
  },
  set sliderPressed(v) {
    sliderPressed.value = v;
  },
  get val() {
    return v.value;
  },
  set val(_v) {
    v.value = _v;
  },
  get thumbEl() {
    return thumb.value;
  },
  get dimensions() {
    return dimensions.value;
  },
  get step() {
    return step.value;
  },
  emitFocus(v) {
    emit('focus', v);
  },
  emitBlur(v) {
    emit('blur', v);
  },
};

const { handleKeyDown, handleFocus, handleBlur, handleMouseDown, handleClick, getThumbPosition, getThumbTransform, getShiftedChange } =
  createHandlers({ props, sliderState });

const thumbPosition = computed(getThumbPosition);
const transformValue = computed(getThumbTransform);

const thumbStyles = computed(() => ({
  transform: `translateX(${transformValue.value}px)`,
}));

const sliderActiveStyle = computed(() => ({
  left: 0,
  right: `${100 - thumbPosition.value}%`,
}));

const aria = computed(() => ({
  'aria-label': props.label,
  'aria-labelledby': props.labelledBy,
  'aria-valuemin': props.min,
  'aria-valuemax': props.max,
  'aria-valuenow': v.value,
  'aria-valuetext': attrs['aria-valuetext'],
  'aria-disabled': props.disabled,
}));

const trackClasses = computed(() => [ccSlider.track, props.disabled && ccSlider.trackDisabled]);

const activeTrackClasses = computed(() => [
  ccSlider.activeTrack,
  props.disabled ? ccSlider.activeTrackDisabled : ccSlider.activeTrackEnabled,
]);

const thumbClasses = computed(() => [ccSlider.thumb, props.disabled ? ccSlider.thumbDisabled : ccSlider.thumbEnabled]);

const clamp = (v, { min, max }) => (Number.isFinite(parseFloat(v)) ? Math.min(Math.max(v, min), max) : min);

watch(position, () => {
  // prevents shiftedChange when modelValue was set externally
  if (position.value !== props.modelValue) {
    const n = props.step ? getShiftedChange(position.value) : position.value;
    if (v.value !== n) v.value = n;
  }
});

watch(
  () => props.modelValue,
  (newValue) => {
    // if the slider gets bad values, it shouldn't break the page by placing the thumb at an insane left/right value
    if (newValue > props.max || newValue < props.min) {
      position.value = clamp(newValue, props);
    } else if (!sliderPressed.value && position.value !== newValue) {
      position.value = newValue;
    }
  },
  { immediate: true },
);
</script>

<template>
  <div :class="ccSlider.wrapper">
    <div ref="sliderLine" :class="trackClasses" @click="handleClick" />
    <div :class="activeTrackClasses" :style="sliderActiveStyle" data-test="slider-active" @click="handleClick" />
    <div
      ref="thumb"
      :class="thumbClasses"
      role="slider"
      tabindex="0"
      v-bind="aria"
      :style="thumbStyles"
      data-test="thumb"
      @mousedown="handleMouseDown"
      @touchstart="handleMouseDown"
      @blur="handleBlur"
      @focus="handleFocus"
      @keydown="handleKeyDown"></div>
  </div>
</template>
