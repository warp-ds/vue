<script setup>
import { ref } from 'vue'
import { wSlider, wTextfield } from '#components'

const largeNumber = ref(30_000_000)
</script>

<template>
  <div>
    <component-title title="Slider" />

    <token :state="largeNumber">
      <w-slider v-model="largeNumber" :min="1000" :max="10_000_000" :step="1000" label="a large number slider" />
    </token>

    <!-- used for testing that outside-model-updates also update the slider value -->
    <!-- <w-slider v-model="largeNumber" :min="1000" :max="10_000_000" :step="1000" label="a large number slider" /> -->
    <!-- <w-textfield label="Slider value" v-model="largeNumber" /> -->
  </div>
</template>
