<script setup>
import { ref } from 'vue';

import { wField, wSwitch } from '#components';

const model = ref(false);
</script>

<template>
  <div>
    <component-title title="Switch" />

    <token :state="model">
      <w-field v-slot="{ labelFor }" label="Switch it up!">
        <w-switch :id="labelFor" v-model="model" />
      </w-field>
    </token>
  </div>
</template>
