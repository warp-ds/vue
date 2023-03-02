<script setup>
import { ref } from 'vue'
import { wTextarea } from '#components'

const model = ref('')
</script>

<template>
  <div>
    <component-title title="Textarea" />

    <token :state="model">
      <w-textarea v-model="model" label="Such area, much text" />
    </token>
  </div>
</template>
