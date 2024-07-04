<script setup>
import { computed, ref } from 'vue';

import { switchToggle as ccSwitch } from '@warp-ds/css/component-classes';
import { createModel, modelProps } from 'create-v-model';

// eslint-disable-next-line vue/no-dupe-keys
import { id } from '#util';

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
    [ccSwitch.labelDisabled]: p.disabled,
  },
]);

const trackClasses = computed(() => [
  ccSwitch.track,
  {
    [ccSwitch.trackActive]: model.value && !p.disabled,
    [ccSwitch.trackInactive]: !model.value && !p.disabled,
    [ccSwitch.trackDisabled]: p.disabled,
  },
]);

const handleClasses = computed(() => [
  ccSwitch.handle,
  p.disabled ? ccSwitch.handleDisabled : ccSwitch.handleNotDisabled,
  {
    [ccSwitch.handleSelected]: model.value,
  },
]);

const simulateClick = () => inputEl.value.click();
</script>

<script>
export default {
  name: 'wSwitch',
};
</script>

<template>
  <div :class="ccSwitch.switch">
    <input :id="p.id" ref="inputEl" v-model="model" type="checkbox" :class="ccSwitch.a11y" :disabled="p.disabled" />
    <div :class="switchClasses" @click="simulateClick">
      <div :class="trackClasses" />
      <div :class="handleClasses" />
    </div>
  </div>
</template>
