<script setup>
import { ref, computed, watch, nextTick, onBeforeUnmount } from 'vue'
import { modal as ccModal } from '@warp-ds/css/component-classes'
import focusLock from 'dom-focus-lock'
import { id } from '#util'
import { setup as setupScrollLock, teardown as teardownScrollLock } from 'scroll-doctor'

const transitions = 'transform-gpu transition-transform'
const windowExists = typeof window !== 'undefined'

const props = defineProps({
    left: [Object, Boolean],
    right: [Object, Boolean],
    title: String,
    titleAttrs: Object,
    headerClasses: [String, Object],
    contentClasses: [String, Object],
    modelValue: Boolean,
    contentId: id,
    ariaBack
  })

const emit = defineEmits(['dismiss', 'left', 'right', 'shown', 'hidden']);

  const modalEl = ref(null)
  const contentEl = ref(null)
  const backdropEl = ref(null)
  const showModal = ref(false)
  const showContent = ref(false)
  const titleShouldTransition = ref(false)
  const emitDismiss = () => emit('dismiss')
  const emitIfEscape = e => {
    if (e.key === 'Escape') emitDismiss()
  }
  const titleLeftClasses = computed(() => ([transitions, titleShouldTransition.value ? 'duration-300' : 'duration-1', ccModal.titleButton, ccModal.titleButtonLeft]));
  const titleCenterClasses = computed(() => ([transitions, titleShouldTransition.value ? 'duration-300' : 'duration-0', props.left ? ccModal.transitionTitleCenter : ccModal.transitionTitleColSpan]));
  const titleRightClasses = computed(() => ([transitions, titleShouldTransition.value ? 'duration-300' : 'duration-0', ccModal.titleButton, ccModal.titleButtonRight]));

  // when the content area reflows the title area transitions because of v-move in the transition-group
  // this limits the effects
  watch(() => ([props.left, props.right, props.title]), async () => {
    titleShouldTransition.value = true
    await nextTick()
    titleShouldTransition.value = false
  })

  // vue-ism
  // because we have nested transitions we need to fire this in order
  // we use nextTick to ensure DOM elements are available for later
  async function handleTransitions(showing) {
    if (showing) showModal.value = showing
    else showContent.value = showing
    await nextTick()
    if (showing) showContent.value = showing
    else showModal.value = showing
    await nextTick()
  }

  // change the modal's border radius when within 2% of full height
  const modifyBorderRadius = () => {
    if (modalEl.value?.scrollHeight * 1.02 > innerHeight) modalEl.value.style.borderRadius = '0px'
    else modalEl.value.style.borderRadius = null
  }

  async function setupHandlers() {
    focusLock.on(modalEl.value)
    modalEl.value.addEventListener('transitionend', modifyBorderRadius, { passive: true })
    addEventListener('keydown', emitIfEscape, { passive: true })
    setupScrollLock(contentEl.value)
    emit('shown')
  }
  async function teardownHandlers() {
    // if the modal's parent component is getting unmounted our refs won't exist
    if (modalEl.value) {
      focusLock.off(modalEl.value)
      modalEl.value.removeEventListener('transitionend', modifyBorderRadius, { passive: true })
    }
    removeEventListener('keydown', emitIfEscape)
    teardownScrollLock()
    emit('hidden')
  }

  async function handleShow(showing) {
    if (!windowExists) return
    if (!showing) await teardownHandlers()
    await handleTransitions(showing)
    if (showing) await setupHandlers()
  }

  watch(() => props.modelValue, handleShow, { immediate: true })
  onBeforeUnmount(handleShow)

</script>
<template>
  <transition 
    name="fade"
    leave-active-class="transition-opacity-200 ease-in-out"
    enter-active-class="transition-opacity-200 ease-in-out"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
    >
    <div :class="[ccModal.backdrop, ccModal.transparentBg]" v-if="showModal" @click.self="emitDismiss" ref="backdropEl" data-test="backdrop">
      <transition 
        name="slide"
        enter-from-class="translate-y-full"
        leave-to-class="translate-y-full sm:translate-y-2/4"
        leave-active-class="transition-transform-300 ease-in-out"
        enter-active-class="transition-transform-300 ease-in-out"
        >
        <div v-if="showContent" :class="ccModal.modal" tabindex="-1" aria-modal="true" aria-labelledby="w-modal-title" role="dialog" ref="modalEl">
          <div :class="[ccModal.title, headerClasses]">
            <transition-group 
              enter-from-class="opacity-0 backface-hidden"
              leave-to-class="opacity-0 backface-hidden"
              leave-active-class="absolute"
              >
              <button v-if="left" :aria-label="ariaBack" @click="$emit('left')" :class="titleLeftClasses" key="left" v-bind="left">
                <slot name="left">
                  <svg aria-hidden="true" :class="[ccModal.titleButtonIcon, ccModal.titleButtonIconRotated]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="nonzero" d="M8 2.25a.75.75 0 01.743.648L8.75 3v8.189l3.72-3.72a.75.75 0 011.133.977l-.073.084-5 5a.747.747 0 01-.374.204l-.104.014h-.104a.747.747 0 01-.478-.218l-5-5a.75.75 0 01.976-1.133l.084.073 3.72 3.719V3A.75.75 0 018 2.25z"></path></svg>
                </slot>
              </button>
              <div :class="titleCenterClasses" key="title" v-bind="titleAttrs">
                <p id="w-modal-title" :class="ccModal.titleText" v-if="title">{{ title }}</p>
                <slot name="title" />
              </div>
              <button v-if="right" :aria-label="ariaClose" @click="$emit('right')" :class="titleRightClasses" key="right" v-bind="right">
                <slot name="right">
                  <svg aria-hidden="true" :class="ccModal.titleButtonIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 12l6 6-6-6-6 6 6-6zm0 0L6 6l6 6 6-6-6 6z"/></svg>
                </slot>
              </button>
            </transition-group>
          </div>
          <div :class="[ccModal.content, contentClasses]" v-if="$slots.default" ref="contentEl" :id="contentId">
            <slot />
          </div>
          <div :class="ccModal.footer" v-if="$slots.footer">
            <slot name="footer" />
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import { activateI18n } from '../util/i18n';
import { i18n } from '@lingui/core';

await activateI18n('modal');

const ariaBack = i18n._({ id: 'modal.aria.back', message: 'Back', comment: 'Aria label for the back button in modal' });
const ariaClose = i18n._({ id: 'modal.aria.close', message: 'Close test', comment: 'Aria label for the close button in modal' });

export default {
  name: 'wModal'
};

</script>