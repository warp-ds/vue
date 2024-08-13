<script setup>
import { computed, useAttrs } from 'vue';

import { i18n } from '@lingui/core';
import { button as ccButton } from '@warp-ds/css/component-classes';

import { activateI18n } from '../util/i18n';

import { messages as daMessages } from './locales/da/messages.mjs';
import { messages as enMessages } from './locales/en/messages.mjs';
import { messages as fiMessages } from './locales/fi/messages.mjs';
import { messages as nbMessages } from './locales/nb/messages.mjs';

activateI18n(enMessages, nbMessages, fiMessages, daMessages);

const ariaValueText = i18n._({
  id: 'button.aria.loading',
  message: 'Loading...',
  comment: 'Screenreader message for buttons that are loading',
});

const buttonVariants = ['primary', 'secondary', 'negative', 'utility', 'pill', 'link'];

const attrs = useAttrs();
const props = defineProps({
  primary: Boolean,
  secondary: Boolean,
  negative: Boolean,
  utility: Boolean,
  quiet: Boolean,
  small: Boolean,
  link: Boolean,
  pill: Boolean,
  loading: Boolean,
  href: String,
  label: String,
  fullWidth: Boolean,
});

const defaultVariant = props.secondary || !buttonVariants.find((b) => !!props[b]);

const primaryClasses = computed(() => [
  !props.small && !props.quiet && !props.loading && ccButton.primary,
  props.small && !props.quiet && !props.loading && ccButton.primarySmall,
  props.small && props.quiet && !props.loading && ccButton.primarySmallQuiet,
  props.small && props.loading && (props.quiet ? ccButton.primarySmallQuietLoading : ccButton.primarySmallLoading),
  !props.small && props.quiet && !props.loading && ccButton.primaryQuiet,
  !props.small && props.loading && (props.quiet ? ccButton.primaryQuietLoading : ccButton.primaryLoading),
]);

const secondaryClasses = computed(() => [
  !props.small && !props.quiet && !props.loading && ccButton.secondary,
  props.small && !props.quiet && !props.loading && ccButton.secondarySmall,
  props.small && props.quiet && !props.loading && ccButton.secondarySmallQuiet,
  props.small && props.loading && (props.quiet ? ccButton.secondarySmallQuietLoading : ccButton.secondarySmallLoading),
  !props.small && props.quiet && !props.loading && ccButton.secondaryQuiet,
  !props.small && props.loading && (props.quiet ? ccButton.secondaryQuietLoading : ccButton.secondaryLoading),
]);

const utilityClasses = computed(() => [
  !props.small && !props.quiet && !props.loading && ccButton.utility,
  props.small && !props.quiet && !props.loading && ccButton.utilitySmall,
  props.small && props.quiet && !props.loading && ccButton.utilitySmallQuiet,
  props.small && props.loading && (props.quiet ? ccButton.utilitySmallQuietLoading : ccButton.utilitySmallLoading),
  !props.small && props.quiet && !props.loading && ccButton.utilityQuiet,
  !props.small && props.loading && (props.quiet ? ccButton.utilityQuietLoading : ccButton.utilityLoading),
]);

const negativeClasses = computed(() => [
  !props.small && !props.quiet && !props.loading && ccButton.negative,
  props.small && !props.quiet && !props.loading && ccButton.negativeSmall,
  props.small && props.quiet && !props.loading && ccButton.negativeSmallQuiet,
  props.small && props.loading && (props.quiet ? ccButton.negativeSmallQuietLoading : ccButton.negativeSmallLoading),
  !props.small && props.quiet && !props.loading && ccButton.negativeQuiet,
  !props.small && props.loading && (props.quiet ? ccButton.negativeQuietLoading : ccButton.negativeLoading),
]);

const pillClasses = computed(() => [
  !props.loading && (!props.small ? ccButton.pill : ccButton.pillSmall),
  props.loading && (!props.small ? ccButton.pillLoading : ccButton.pillSmallLoading),
]);

const linkClasses = computed(() => [props.small ? ccButton.linkSmall : ccButton.link]);

const classes = computed(() => [
  props.primary && primaryClasses.value,
  defaultVariant && secondaryClasses.value,
  props.utility && utilityClasses.value,
  props.negative && negativeClasses.value,
  props.pill && pillClasses.value,
  props.link && linkClasses.value,
  props.href && ccButton.linkAsButton,
  props.fullWidth ? ccButton.fullWidth : ccButton.contentWidth,
]);

const saneDefaults = computed(() => ({
  type: props.href ? undefined : attrs.type || 'button',
  rel: attrs.target === '_blank' ? attrs.rel || 'noopener' : undefined,
}));
</script>

<script>
export default { name: 'wButton' };
</script>

<template>
  <component :is="href ? 'a' : 'button'" :href="href" :class="classes" v-bind="saneDefaults">
    <slot>{{ label }}</slot>
    <span v-if="loading" role="progressbar" aria-valuenow="0" :aria-valuetext="ariaValueText" :class="ccButton.a11y" />
  </component>
</template>
