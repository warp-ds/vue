<script setup>
import { ref } from 'vue';

import { wSlider, wTextfield } from '#components';

const smallNumber = ref(3);
const largeNumber = ref(300);
const extremeNumber = ref(300000);
const slowNumber = ref(30);
const disabledNumber = ref(30);
</script>

<template>
  <div>
    <component-title title="Slider" />

    <h3>Small numbers slider</h3>
    <token :state="smallNumber">
      <div class="flex gap-16">
        <w-textfield v-model.number="smallNumber" type="number" min="1" max="10" step="1" inputmode="numeric" />
        <w-slider v-model="smallNumber" :aria-valuetext="smallNumber" :min="1" :max="10" :step="1" label="Small numbers slider" />
      </div>
    </token>

    <h3>Large numbers slider (with step of 10)</h3>
    <token :state="largeNumber">
      <div class="flex gap-16">
        <w-textfield v-model.number="largeNumber" type="number" min="0" max="100000" step="10" inputmode="numeric" />
        <w-slider
          v-model="largeNumber"
          :aria-valuetext="largeNumber"
          :min="0"
          :max="10000"
          :step="10"
          label="Large numbers slider (with step of 10)" />
      </div>
    </token>

    <h3>Extreme numbers slider (with step of 100)</h3>
    <token :state="extremeNumber">
      <div class="flex gap-16">
        <w-textfield v-model.number="extremeNumber" type="number" min="0" max="100000000" step="100" inputmode="numeric" />
        <w-slider
          v-model="extremeNumber"
          :aria-valuetext="extremeNumber"
          :min="0"
          :max="100000000"
          :step="100"
          label="Extreme numbers slider (with step of 100)" />
      </div>
    </token>

    <h3>Slider without keydown acceleration</h3>
    <token :state="slowNumber">
      <div class="flex gap-16">
        <w-textfield v-model.number="slowNumber" type="number" min="0" max="1000" step="1" inputmode="numeric" />
        <w-slider
          v-model="slowNumber"
          :aria-valuetext="slowNumber"
          :min="0"
          :max="1000"
          :step="1"
          prevent-acceleration
          label="Slider without keydown acceleration" />
      </div>
    </token>

    <h3>Disabled slider</h3>
    <token :state="disabledNumber">
      <div class="flex gap-16">
        <w-textfield v-model.number="disabledNumber" disabled type="number" min="0" max="1000" step="1" inputmode="numeric" />
        <w-slider
          v-model="disabledNumber"
          disabled
          :aria-valuetext="disabledNumber"
          :min="0"
          :max="1000"
          :step="1"
          prevent-acceleration
          label="Disabled slider" />
      </div>
    </token>
  </div>
</template>
