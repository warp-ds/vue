<template>
  <component :is="href ? 'a' : 'button'" :href="href" :class="buttonClass" v-bind="saneDefaults">
    <slot>{{ label }}</slot>
    <span v-if="loading" role="progressbar" aria-valuenow="0" :aria-valuetext="ariaValueText" :class="ccButton.a11y" />
  </component>
</template>

<script>
export default { name: 'wButton' }
</script>

<script setup>
import { computed, useAttrs } from 'vue'
import { button as ccButton } from '@warp-ds/css/component-classes';
import { i18n } from '@lingui/core';
import { activateI18n } from '../util/i18n';
import { messages as enMessages} from './locales/en/messages.mjs';
import { messages as nbMessages} from './locales/nb/messages.mjs';
import { messages as fiMessages} from './locales/fi/messages.mjs';

activateI18n(enMessages, nbMessages, fiMessages);

const ariaValueText = i18n._({
  id: 'button.aria.loading',
  message: 'Loading...',
  comment: 'Screenreader message for buttons that are loading'
});

const buttonVariants = [
  'primary',
  'secondary',
  'negative',
  'utility',
  'pill',
  'link',
];

const attrs = useAttrs()
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
})

const defaultVariant = props.secondary || !buttonVariants.find(b => !!props[b]);

const buttonClass = computed(() => ({
  [ccButton.secondary]: defaultVariant && !props.small && !props.quiet && !props.loading,
  [ccButton.secondarySmall]: defaultVariant && props.small && !props.quiet && !props.loading,
  [ccButton.secondarySmallLoading]: defaultVariant && props.small && !props.quiet && props.loading,
  [ccButton.secondarySmallQuiet]: defaultVariant && props.small && props.quiet && !props.loading,
  [ccButton.secondarySmallQuietLoading]: defaultVariant && props.small && props.quiet && props.loading,
  [ccButton.secondaryQuiet]: defaultVariant && !props.small && props.quiet && !props.loading,
  [ccButton.secondaryQuietLoading]: defaultVariant && !props.small && props.quiet && props.loading,
  [ccButton.secondaryLoading]: defaultVariant && !props.small && !props.quiet && props.loading,
  
  [ccButton.primary]: props.primary && !props.small && !props.quiet && !props.loading,
  [ccButton.primarySmall]: props.primary && props.small && !props.quiet && !props.loading,
  [ccButton.primarySmallQuiet]: props.primary && props.small && props.quiet && !props.loading,
  [ccButton.primarySmallLoading]: props.primary && props.small && !props.quiet && props.loading,
  [ccButton.primarySmallQuietLoading]: props.primary && props.small && props.quiet && props.loading,
  [ccButton.primaryQuiet]: props.primary && !props.small && props.quiet && !props.loading,
  [ccButton.primaryQuietLoading]: props.primary && !props.small && props.quiet && props.loading,
  [ccButton.primaryLoading]: props.primary && !props.small && !props.quiet && props.loading,

  [ccButton.utility]: props.utility && !props.small && !props.quiet && !props.loading,
  [ccButton.utilitySmall]: props.utility && props.small && !props.quiet && !props.loading,
  [ccButton.utilitySmallQuiet]: props.utility && props.small && props.quiet && !props.loading,
  [ccButton.utilitySmallLoading]: props.utility && props.small && !props.quiet && props.loading,
  [ccButton.utilitySmallQuietLoading]: props.utility && props.small && props.quiet && props.loading,
  [ccButton.utilityQuiet]: props.utility && !props.small && props.quiet && !props.loading,
  [ccButton.utilityQuietLoading]: props.utility && !props.small && props.quiet && props.loading,
  [ccButton.utilityLoading]: props.utility && !props.small && !props.quiet && props.loading,

  [ccButton.negative]: props.negative && !props.small && !props.quiet && !props.loading,
  [ccButton.negativeSmall]: props.negative && props.small && !props.quiet && !props.loading,
  [ccButton.negativeSmallQuiet]: props.negative && props.small && props.quiet && !props.loading,
  [ccButton.negativeSmallLoading]: props.negative && props.small && !props.quiet && props.loading,
  [ccButton.negativeSmallQuietLoading]: props.negative && props.small && props.quiet && props.loading,
  [ccButton.negativeQuiet]: props.negative && !props.small && props.quiet && !props.loading,
  [ccButton.negativeQuietLoading]: props.negative && !props.small && props.quiet && props.loading,
  [ccButton.negativeLoading]: props.negative && !props.small && !props.quiet && props.loading,

  [ccButton.pill]: props.pill && !props.small && !props.loading,
  [ccButton.pillSmall]: props.pill && props.small && !props.loading,
  [ccButton.pillLoading]: props.pill && !props.small && props.loading,
  [ccButton.pillSmallLoading]: props.pill && props.small && props.loading,
  [ccButton.link]: props.link && !props.small,
  [ccButton.linkSmall]: props.link && props.small,
  [ccButton.linkAsButton]: !!props.href,
  [ccButton.fullWidth]: props.fullWidth,
  [ccButton.contentWidth]: !props.fullWidth,
}))

const saneDefaults = computed(() => ({
  type: props.href ? undefined : (attrs.type || 'button'),
  rel: attrs.target === '_blank' ? (attrs.rel || 'noopener') : undefined
}))
</script>
