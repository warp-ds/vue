<script setup>
import { ref } from 'vue';
import { wTextfield, wAffix } from '#components';

const inputModel = ref('');
const placeholderModel = ref('');
const numericInputModel = ref('');

const handleClear = (el) => {
  inputModel.value = ''
  el.focus()
};

const moneyMask = { numeral: true, numeralPositiveOnly: true, numeralIntegerScale: 8, delimiter: ' ' };
</script>

<template>
  <div>
    <component-title title="Text Field" />

    <token :state="inputModel">
      <w-textfield v-model="inputModel" class="mb-16" #suffix="{ inputElement }" label="A required input with a clear button" hint="A hint" required>
        <w-affix suffix clear @click="handleClear(inputElement)" />
      </w-textfield>
    </token>

    <token :state="inputModel">
      <w-textfield placeholder="I am placeholder" type="tel" #prefix v-model="inputModel" label="I have a prefix" inputmode="numeric">
        <w-affix prefix label="+47" />
      </w-textfield>
    </token>

    <token :state="inputModel">
      <w-textfield placeholder="I am placeholder"  #prefix v-model="inputModel" label="I have a search icon">
        <w-affix search />
      </w-textfield>
    </token>

    <token :state="inputModel">
      <w-textfield v-model="inputModel" label="I have a prefix and a suffix" inputmode="numeric">
        <template #prefix><w-affix prefix label="+47" /></template>
        <template #suffix><w-affix suffix clear /></template>
      </w-textfield>
    </token>

    <token :state="inputModel">
      <w-textfield #suffix v-model="inputModel" label="I have a suffix" inputmode="decimal">
        <w-affix suffix label="NOK" />
      </w-textfield>
    </token>

    <token :state="inputModel">
      <w-textfield #suffix disabled v-model="inputModel" label="I am disabled" inputmode="decimal">
        <w-affix suffix label="NOK" />
      </w-textfield>
    </token>

    <token :state="inputModel">
      <w-textfield #suffix v-model="inputModel" label="I have a search suffix">
        <w-affix suffix search />
      </w-textfield>
    </token>

    <token :state="inputModel">
      <w-textfield readOnly value="I'm read only" v-model="placeholderModel" label="I am read only">
        <w-affix suffix label="NOK" />
      </w-textfield>
    </token>

    <token :state="numericInputModel">
      <w-textfield placeholder="I am placeholder" v-model.number="numericInputModel" optional number type="text" inputmode="numeric" :mask="moneyMask" label="A masked (money) input" />
    </token>
  </div>
</template>
