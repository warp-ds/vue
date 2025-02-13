<script setup>
import { ref, computed, watch, nextTick, onBeforeUnmount } from 'vue';

import { i18n } from '@lingui/core';
import { modal as ccModal } from '@warp-ds/css/component-classes';
import IconArrowLeft16 from '@warp-ds/icons/vue/arrow-left-16';
import IconClose16 from '@warp-ds/icons/vue/close-16';
import focusLock from 'dom-focus-lock';
import { setup as setupScrollLock, teardown as teardownScrollLock } from 'scroll-doctor';

import { activateI18n } from '../util/i18n';

import { messages as daMessages } from './locales/da/messages.mjs';
import { messages as enMessages } from './locales/en/messages.mjs';
import { messages as fiMessages } from './locales/fi/messages.mjs';
import { messages as nbMessages } from './locales/nb/messages.mjs';
import { messages as svMessages } from './locales/sv/messages.mjs';

import { id } from '#util';

activateI18n(enMessages, nbMessages, fiMessages, daMessages, svMessages);

const ariaBack = i18n._({
  id: 'modal.aria.back',
  message: 'Back',
  comment: 'Aria label for the back button in modal',
});
const ariaClose = i18n._({
  id: 'modal.aria.close',
  message: 'Close test',
  comment: 'Aria label for the close button in modal',
});

const transitions = 'transform-gpu transition-transform';
const windowExists = typeof window !== 'undefined';

const props = defineProps({
  left: [Object, Boolean],
  right: [Object, Boolean],
  title: String,
  titleAttrs: Object,
  headerClasses: [String, Object],
  contentClasses: [String, Object],
  modelValue: Boolean,
  contentId: id,
});

const emit = defineEmits(['dismiss', 'left', 'right', 'shown', 'hidden']);

const modalEl = ref(null);
const contentEl = ref(null);
const backdropEl = ref(null);
const showModal = ref(false);
const showContent = ref(false);
const titleShouldTransition = ref(false);
const emitDismiss = () => emit('dismiss');
const emitIfEscape = (e) => {
  if (e.key === 'Escape') emitDismiss();
};
const titleLeftClasses = computed(() => [
  transitions,
  titleShouldTransition.value ? 'duration-300' : 'duration-1',
  ccModal.titleButton,
  ccModal.titleButtonLeft,
]);
const titleCenterClasses = computed(() => [
  transitions,
  titleShouldTransition.value ? 'duration-300' : 'duration-0',
  props.left ? ccModal.transitionTitleCenter : ccModal.transitionTitleColSpan,
]);
const titleRightClasses = computed(() => [
  transitions,
  titleShouldTransition.value ? 'duration-300' : 'duration-0',
  ccModal.titleButton,
  ccModal.titleButtonRight,
]);

// when the content area reflows the title area transitions because of v-move in the transition-group
// this limits the effects
watch(
  () => [props.left, props.right, props.title],
  async () => {
    titleShouldTransition.value = true;
    await nextTick();
    titleShouldTransition.value = false;
  },
);

// vue-ism
// because we have nested transitions we need to fire this in order
// we use nextTick to ensure DOM elements are available for later
async function handleTransitions(showing) {
  if (showing) showModal.value = showing;
  else showContent.value = showing;
  await nextTick();
  if (showing) showContent.value = showing;
  else showModal.value = showing;
  await nextTick();
}

// change the modal's border radius when within 2% of full height
const modifyBorderRadius = () => {
  if (modalEl.value?.scrollHeight * 1.02 > innerHeight) modalEl.value.style.borderRadius = '0px';
  else modalEl.value.style.borderRadius = null;
};

async function setupHandlers() {
  focusLock.on(modalEl.value);
  modalEl.value.addEventListener('transitionend', modifyBorderRadius, { passive: true });
  addEventListener('keydown', emitIfEscape, { passive: true });
  setupScrollLock(contentEl.value);
  emit('shown');
}
async function teardownHandlers() {
  // if the modal's parent component is getting unmounted our refs won't exist
  if (modalEl.value) {
    focusLock.off(modalEl.value);
    modalEl.value.removeEventListener('transitionend', modifyBorderRadius, { passive: true });
  }
  removeEventListener('keydown', emitIfEscape);
  teardownScrollLock();
  emit('hidden');
}

async function handleShow(showing) {
  if (!windowExists) return;
  if (!showing) await teardownHandlers();
  await handleTransitions(showing);
  if (showing) await setupHandlers();
}

watch(() => props.modelValue, handleShow, { immediate: true });
onBeforeUnmount(handleShow);
</script>

<script>
export default {
  name: 'wModal',
};
</script>

<template>
  <transition
    name="fade"
    leave-active-class="transition-opacity-200 ease-in-out"
    enter-active-class="transition-opacity-200 ease-in-out"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0">
    <div v-if="showModal" ref="backdropEl" :class="ccModal.backdrop" data-test="backdrop" @click.self="emitDismiss">
      <transition
        name="slide"
        enter-from-class="translate-y-full"
        leave-to-class="translate-y-full sm:translate-y-2/4"
        leave-active-class="transition-transform-300 ease-in-out"
        enter-active-class="transition-transform-300 ease-in-out">
        <div
          v-if="showContent"
          ref="modalEl"
          :class="ccModal.base"
          tabindex="-1"
          aria-modal="true"
          aria-labelledby="w-modal-title"
          role="dialog">
          <div :class="[ccModal.title, headerClasses]">
            <transition-group
              enter-from-class="opacity-0 backface-hidden"
              leave-to-class="opacity-0 backface-hidden"
              leave-active-class="absolute">
              <button v-if="left" key="left" :aria-label="ariaBack" :class="titleLeftClasses" v-bind="left" @click="$emit('left')">
                <slot name="left">
                  <icon-arrow-left-16 :class="ccModal.titleButtonIcon" />
                </slot>
              </button>
              <div key="title" :class="titleCenterClasses" v-bind="titleAttrs">
                <h1 v-if="title" id="w-modal-title" :class="ccModal.titleText">{{ title }}</h1>
                <slot name="title" />
              </div>
              <button v-if="right" key="right" :aria-label="ariaClose" :class="titleRightClasses" v-bind="right" @click="$emit('right')">
                <slot name="right">
                  <icon-close-16 :class="ccModal.titleButtonIcon" />
                </slot>
              </button>
            </transition-group>
          </div>
          <div v-if="$slots.default" :id="contentId" ref="contentEl" :class="[ccModal.content, contentClasses]">
            <slot />
          </div>
          <div v-if="$slots.footer" :class="ccModal.footer">
            <slot name="footer" />
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>
