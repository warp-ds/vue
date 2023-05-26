<script setup>
import { computed, ref } from 'vue'
import { switchToggle as ccSwitch } from '@warp-ds/component-classes'
import { createModel, modelProps } from 'create-v-model'
import { id } from '#util'

const p = defineProps({
  id,
  disabled: Boolean,
  ...modelProps(),
});

const model = createModel({ props: p });
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
    [ccSwitch.trackActive]: model && !p.disabled,
    [ccSwitch.trackInactive]: !model && !p.disabled,
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
  <div class="tap-highlight-transparent">
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
