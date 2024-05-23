<script setup>
import { computed, useSlots, useAttrs } from 'vue';

import { i18n } from '@lingui/core';
import { input as ccInput, label as ccLabel, helpText as ccHelpText } from '@warp-ds/css/component-classes';

import { fieldProps } from '../util/fieldProps';
import { activateI18n } from '../util/i18n';

import { messages as enMessages } from './locales/en/messages.mjs';
import { messages as fiMessages } from './locales/fi/messages.mjs';
import { messages as nbMessages } from './locales/nb/messages.mjs';
import { createValidation } from './validation';

activateI18n(enMessages, nbMessages, fiMessages);

defineOptions({
  name: 'wField',
  inheritAttrs: false,
});

const props = defineProps({
  ...fieldProps,
  as: {
    type: String,
    default: 'div',
  },
  required: [Boolean, Function],
  disabled: Boolean,
});

const valueOrUndefined = (test, value) => (test ? value : undefined);

const slots = useSlots();
const attrs = useAttrs();

const { triggerValidation, validationMsg, hasErrorMessage, collector } = createValidation(props);

const isInvalid = computed(() => !!hasErrorMessage.value || props.invalid);
const isFieldset = computed(() => props.as === 'fieldset');
const labelType = computed(() => (isFieldset.value ? 'legend' : 'label'));
const labelFor = computed(() => (isFieldset.value ? undefined : props.id));
const labelId = computed(() => (props.label || slots.label) && props.id + ':label');
const hintId = computed(() => valueOrUndefined(props.hint, props.id + ':hint'));
const errorId = computed(() => valueOrUndefined(isInvalid.value, props.id + ':error'));
const aria = computed(() => ({
  'aria-labelledby': labelId.value,
  'aria-describedby': hintId.value,
  'aria-errormessage': errorId.value,
  'aria-invalid': isInvalid.value || undefined,
  'aria-required': props.required && true,
}));
const wrapperAria = computed(() => valueOrUndefined(isFieldset.value, aria.value));
const optionalHelperText = i18n._({
  id: 'forms.field.label.optional',
  message: '(optional)',
  comment: 'Shown after label when marked as optional',
});
const errorMessage = computed(
  () =>
    validationMsg.value ||
    (props.optional
      ? ''
      : i18n._({
          id: 'forms.validation.mandatoryField',
          message: 'Mandatory field',
          comment: 'Text visible below input field if validation fails',
        })),
);
</script>

<template>
  <component :is="props.as" :class="{ [ccInput.wrapper]: true, [attrs.class || '']: true }" :role="props.role" v-bind="wrapperAria">
    <component
      :is="labelType"
      v-if="props.label"
      :id="labelId"
      :class="ccLabel.label"
      :for="labelFor"
      :role="valueOrUndefined(props.labelLevel, 'heading')"
      :aria-level="valueOrUndefined(props.labelLevel, props.labelLevel)">
      {{ props.label }}
      <span v-if="props.optional" :class="ccLabel.optional">{{ optionalHelperText }}</span>
    </component>
    <slot
      :trigger-validation="triggerValidation"
      :label-for="props.id"
      :label-id="labelId"
      :aria="aria"
      :has-validation-errors="isInvalid" />
    <slot name="control" :form="collector" />
    <div
      v-if="props.hint || isInvalid"
      :class="{
        [ccHelpText.helpText]: true,
        [ccHelpText.helpTextColor]: !isInvalid,
        [ccHelpText.helpTextColorInvalid]: isInvalid,
      }">
      <span v-if="props.hint" :id="hintId" v-html="props.hint" />
      <span v-if="props.hint && isInvalid && errorMessage">, </span>
      <span v-if="isInvalid" :id="errorId">{{ errorMessage }}</span>
    </div>
  </component>
</template>
