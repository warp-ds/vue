<script setup>
import { ref } from 'vue'
import { wField, wSwitch } from '#components'

const model = ref(false)
</script>

<template>
  <div>
    <component-title title="Switch" />

    <token :state="model">
      <w-field label="Switch it up!" #default="{ labelFor }">
        <w-switch v-model="model" :id="labelFor" />
      </w-field>
    </token>
  </div>
</template>
