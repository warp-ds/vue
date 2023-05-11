<script setup>
import {
  computed,
  ref,
  useAttrs,
  watch,
  onMounted,
  onBeforeUnmount,
} from 'vue';
import { modelProps, createModel } from 'create-v-model';
import { slider as ccSlider } from '@warp-ds/component-classes';
import { useDimensions, createHandlers } from '@fabric-ds/core/slider';

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
  ...modelProps(),
});

const emit = defineEmits(['focus', 'blur']);

const sliderLine = ref(null);
const thumb = ref(null);
const dimensions = ref({});
const updateDimensions = (_v) => (dimensions.value = _v);
const { mountedHook, unmountedHook } = useDimensions();
onMounted(() => mountedHook(sliderLine.value, updateDimensions));
onBeforeUnmount(unmountedHook);

const sliderPressed = ref(false);
const v = createModel({ props, emit });
const position = ref(v.value);

// step is a computed so we can check if props.step is set or not
// and only do getShiftedChange when set
const step = computed(() => props.step || 1);

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

const {
  handleKeyDown,
  handleFocus,
  handleBlur,
  handleMouseDown,
  handleClick,
  getThumbPosition,
  getThumbTransform,
  getShiftedChange,
} = createHandlers({ props, sliderState });

const thumbPosition = computed(getThumbPosition);
const transformValue = computed(getThumbTransform);
const thumbStyles = computed(() => ({
  transform: 'translateX(' + transformValue.value + 'px)',
}));
const sliderActiveStyle = computed(() => ({
  left: 0,
  right: 100 - thumbPosition.value + '%',
}));
const aria = computed(() => ({
  'aria-label': props.label,
  'aria-labelledby': props.labelledBy,
  'aria-valuemin': props.min,
  'aria-valuemax': props.max,
  'aria-valuenow': v.value,
  'aria-valuetext': attrs['aria-valuetext'],
}));
const wrapperClasses = computed(() => [ccSlider.wrapper]);
const trackClasses = computed(() => [
  ccSlider.track,
  {
    [ccSlider.trackDisabled]: props.disabled,
  },
]);
const activeTrackClasses = computed(() => [
  ccSlider.activeTrack,
  {
    [ccSlider.activeTrackDisabled]: props.disabled,
  },
]);
const thumbClasses = computed(() => [
  ccSlider.thumb,
  {
    [ccSlider.thumbDisabled]: props.disabled,
    [ccSlider.thumbEnabled]: !props.disabled,
  },
]);

watch(position, () => {
  // prevents shiftedChange when modelValue was set externally
  if (position.value === props.modelValue) return;
  const n = props.step ? getShiftedChange(position.value) : position.value;
  if (v.value === n) return;
  v.value = n;
});

const clamp = (v, { min, max }) =>
  Number.isFinite(parseFloat(v)) ? Math.min(Math.max(v, min), max) : min;
watch(
  () => props.modelValue,
  () => {
    // if the slider gets bad values, it shouldn't break the page by placing the thumb at an insane left/right value
    if (props.modelValue > props.max || props.modelValue < props.min)
      position.value = clamp(props.modelValue, props);
    else if (sliderPressed.value || position.value === props.modelValue) return;
    else position.value = props.modelValue;
  },
  { immediate: true }
);
</script>
<template>
  <div :class="wrapperClasses">
    <div :class="trackClasses" ref="sliderLine" @click="handleClick" />
    <div
      :class="activeTrackClasses"
      :style="sliderActiveStyle"
      @click="handleClick"
      data-test="slider-active"
    />
    <div
      :class="thumbClasses"
      ref="thumb"
      role="slider"
      tabindex="0"
      v-bind="aria"
      :style="thumbStyles"
      data-test="thumb"
      @mousedown="handleMouseDown"
      @touchstart="handleMouseDown"
      @blur="handleBlur"
      @focus="handleFocus"
      @keydown="handleKeyDown"
    ></div>
  </div>
</template>

<script>
export default { name: 'wSlider' };
</script>
