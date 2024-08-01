<script>
import { computed } from 'vue';

import { i18n } from '@lingui/core';
import { input as ccInput, label as ccLabel, helpText as ccHelpText } from '@warp-ds/css/component-classes';
import { modelProps } from 'create-v-model';

import { activateI18n } from '../util/i18n';

import { messages as daMessages } from './locales/da/messages.mjs';
import { messages as enMessages } from './locales/en/messages.mjs';
import { messages as fiMessages } from './locales/fi/messages.mjs';
import { messages as nbMessages } from './locales/nb/messages.mjs';
import { createValidation } from './validation';

import { id } from '#util';

activateI18n(enMessages, nbMessages, fiMessages, daMessages);

export const fieldProps = {
  id,
  label: String,
  role: String,
  invalid: Boolean,
  readOnly: Boolean,
  disabled: Boolean,
  placeholder: String,
  hint: String,
  optional: Boolean,
  labelLevel: Number,
  rules: {
    type: Array,
    default: () => [],
  },
  ...modelProps(),
};

const valueOrUndefined = (test, value) => (test ? value : undefined);

export default {
  name: 'wField',
  inheritAttrs: false,
  props: {
    ...fieldProps,
    as: {
      type: String,
      default: 'div',
    },
    required: [Boolean, Function],
    disabled: Boolean,
  },
  setup(props, { slots }) {
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

    return {
      triggerValidation,
      errorMessage,
      labelType,
      labelFor,
      labelId,
      hintId,
      errorId,
      aria,
      wrapperAria,
      collector,
      valueOrUndefined,
      ccInput,
      ccLabel,
      ccHelpText,
      isInvalid,
      optionalHelperText,
    };
  },
};
</script>

<template>
  <component :is="as" :class="{ [ccInput.wrapper]: true, [$attrs.class || '']: true }" :role="role" v-bind="wrapperAria">
    <component
      :is="labelType"
      v-if="label"
      :id="labelId"
      :class="ccLabel.base"
      :for="labelFor"
      :role="valueOrUndefined(labelLevel, 'heading')"
      :aria-level="valueOrUndefined(labelLevel, labelLevel)"
      >{{ label }}<span v-if="optional" :class="ccLabel.optional">{{ optionalHelperText }}</span></component
    >
    <slot :trigger-validation="triggerValidation" :label-for="id" :label-id="labelId" :aria="aria" :has-validation-errors="isInvalid" />
    <slot name="control" :form="collector" />
    <div
      v-if="hint || isInvalid"
      :class="{
        [ccHelpText.base]: true,
        [ccHelpText.color]: !isInvalid,
        [ccHelpText.colorInvalid]: isInvalid,
      }">
      <span v-if="hint" :id="hintId" v-html="hint" />
      <span v-if="hint && isInvalid && errorMessage">, </span>
      <span v-if="isInvalid" :id="errorId">{{ errorMessage }}</span>
    </div>
  </component>
</template>
