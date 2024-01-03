<script setup>
import { computed, ref } from 'vue'
import { switchToggle as ccSwitch } from '@warp-ds/css/component-classes'
import { id } from '#util'

const p = defineProps({
  id,
  disabled: Boolean,
});

const model = defineModel()
const inputEl = ref(null);

const switchClasses = computed(() => [
  ccSwitch.label,
  {
    [ccSwitch.labelDisabled]: p.disabled
  }
]);

const trackClasses = computed(() => [
  ccSwitch.track,
  {
    [ccSwitch.trackActive]: model.value && !p.disabled,
    [ccSwitch.trackInactive]: !model.value && !p.disabled,
    [ccSwitch.trackDisabled]: p.disabled,
  }
]);

const handleClasses = computed(() => [
  ccSwitch.handle,
  p.disabled ? ccSwitch.handleDisabled : ccSwitch.handleNotDisabled,
  {
    [ccSwitch.handleSelected]: model.value,
  }
]);

const simulateClick = () => inputEl.value.click();
</script>

<template>
  <div :class="ccSwitch.switch">
    <input ref="inputEl" type="checkbox" :id="p.id" v-model="model" :class="ccSwitch.a11y" :disabled="p.disabled" />
    <div @click="simulateClick" :class="switchClasses">
      <div :class="trackClasses" />
      <div :class="handleClasses" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'wSwitch'
};
</script>
