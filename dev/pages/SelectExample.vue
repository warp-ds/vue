<script setup>
import { ref } from 'vue';

import { wSelect } from '#components';

const selectModel = ref('');
</script>

<template>
  <div>
    <component-title title="Select" />

    <token :state="selectModel">
      <w-select v-model="selectModel" label="A useful and informative label">
        <option disabled selected value="">Pick something</option>
        <option value="foo">Foo</option>
        <option value="bar">Bar</option>
      </w-select>
    </token>
    <token :state="selectModel">
      <w-select v-model="selectModel" optional label="A useful and informative label">
        <option disabled selected value="">Pick something</option>
        <option value="foo">Foo</option>
        <option value="bar">Bar</option>
      </w-select>
    </token>
    <token :state="selectModel">
      <w-select v-model="selectModel" disabled label="Disabled select">
        <option disabled selected value="">Pick something</option>
        <option value="foo">Foo</option>
        <option value="bar">Bar</option>
      </w-select>
    </token>
    <token :state="selectModel">
      <w-select v-model="selectModel" required invalid label="Invalid">
        <option disabled selected value="">Pick something</option>
        <option value="foo">Foo</option>
        <option value="bar">Bar</option>
      </w-select>
    </token>
    <token :state="selectModel">
      <w-select read-only v-model="selectModel" label="Read only select">
        <option disabled selected value="">Foo</option>
        <option value="bar">Bar</option>
      </w-select>
    </token>
  </div>
</template>
