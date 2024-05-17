<script setup>
import { ref } from 'vue';

import { wTextfield, wAffix } from '#components';

const inputModel = ref('');
const placeholderModel = ref('');
const numericInputModel = ref('');

const handleClear = (el) => {
  inputModel.value = '';
  el.focus();
};

const moneyMask = { numeral: true, numeralPositiveOnly: true, numeralIntegerScale: 8, delimiter: ' ' };
</script>

<template>
  <div>
    <component-title title="Text Field" />

    <token :state="inputModel">
      <w-textfield v-model="inputModel" class="mb-16" label="A required input with a clear button" hint="A hint" required>
        <template #suffix="{ inputElement }">
          <w-affix suffix clear aria-label="Clear text" @click="handleClear(inputElement)" />
        </template>
      </w-textfield>
    </token>

    <token :state="inputModel">
      <w-textfield v-model="inputModel" placeholder="I am placeholder" type="tel" label="I have a prefix" inputmode="numeric">
        <template #prefix>
          <w-affix prefix label="+47" />
        </template>
      </w-textfield>
    </token>

    <token :state="inputModel">
      <w-textfield
        v-model="inputModel"
        class="[--w-prefix-width:90px]"
        placeholder="I am placeholder"
        type="tel"
        label="I have a prefix"
        inputmode="numeric">
        <template #prefix>
          <w-affix prefix label="Long prefix" />
        </template>
      </w-textfield>
    </token>

    <token :state="inputModel">
      <w-textfield v-model="inputModel" placeholder="I am placeholder" label="I have a search icon">
        <template #prefix>
          <w-affix search prefix aria-label="Search" />
        </template>
      </w-textfield>
    </token>

    <token :state="inputModel">
      <w-textfield v-model="inputModel" label="I have a prefix and a suffix" inputmode="numeric">
        <template #prefix>
          <w-affix prefix label="+47" />
        </template>
        <template #suffix>
          <w-affix suffix clear aria-label="Clear text" />
        </template>
      </w-textfield>
    </token>

    <token :state="inputModel">
      <w-textfield v-model="inputModel" label="I have a suffix" inputmode="decimal">
        <template #suffix>
          <w-affix suffix label="NOK" />
        </template>
      </w-textfield>
    </token>

    <token :state="inputModel">
      <w-textfield v-model="inputModel" disabled label="I am disabled" inputmode="decimal">
        <template #suffix>
          <w-affix suffix label="NOK" />
        </template>
      </w-textfield>
    </token>

    <token :state="inputModel">
      <w-textfield v-model="inputModel" label="I have a search suffix">
        <template #suffix>
          <w-affix suffix search aria-label="Search" />
        </template>
      </w-textfield>
    </token>

    <token :state="inputModel">
      <w-textfield v-model="placeholderModel" read-only value="I'm read only" label="I am read only">
        <template #suffix>
          <w-affix suffix label="NOK" />
        </template>
      </w-textfield>
    </token>

    <token :state="inputModel">
      <w-textfield v-model="inputModel" label="I am invalid" invalid required>
        <template #suffix>
          <w-affix suffix clear aria-label="Clear text" @click="handleClear" />
        </template>
      </w-textfield>
    </token>

    <token :state="numericInputModel">
      <w-textfield
        v-model.number="numericInputModel"
        placeholder="I am placeholder"
        optional
        number
        type="text"
        inputmode="numeric"
        :mask="moneyMask"
        label="A masked (money) input" />
    </token>
  </div>
</template>
