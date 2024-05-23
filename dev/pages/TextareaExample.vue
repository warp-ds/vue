<script setup>
import { ref } from 'vue';

import { wTextarea } from '#components';

const model = ref('');
</script>

<template>
  <div>
    <component-title title="Textarea" />

    <token :state="model">
      <w-textarea v-model="model" label="Such area, much text" />
    </token>
    <token :state="model">
      <w-textarea v-model="model" disabled label="Disabled textarea" />
    </token>

    <token :state="model">
      <w-textarea v-model="model" read-only label="Such area, much text" />
    </token>

    <token :state="model">
      <w-textarea v-model="model" invalid required label="A required textarea" hint="A hint" />
    </token>
  </div>
</template>
