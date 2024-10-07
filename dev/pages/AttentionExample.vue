<script setup>
import { ref } from 'vue';

import IconInfo16 from '@warp-ds/icons/vue/info-16';

import { wAttention, wBox, wButton } from '#components';

const tooltipTarget = ref(null);
const tooltipResetTarget = ref(null);
const popoverTarget = ref(null);
const dismissiblePopoverTarget = ref(null);
const popoverIconTarget = ref(null);
const highlightTarget = ref(null);
const dismissibleHighlightTarget = ref(null);

const tooltipShowing = ref(false);
const tooltipResetShowing = ref(false);
const calloutShowing = ref(true);
const popoverShowing = ref(false);
const dismissiblePopoverShowing = ref(false);
const popoverIconTargetShowing = ref(false);
const highlightShowing = ref(false);
const dismissibleHighlightShowing = ref(false);
</script>

<template>
  <div>
    <component-title title="Attention" />

    <token>
      <div class="space-y-16">
        <div>
          <h2>Tooltip</h2>
          <w-box
            ref="tooltipTarget"
            neutral
            as="h4"
            tabindex="0"
            @mouseenter="tooltipShowing = true"
            @mouseleave="tooltipShowing = false"
            @keydown.escape="tooltipShowing = false"
            @focus="tooltipShowing = true"
            @blur="tooltipShowing = false">
            <button aria-describedby="tooltip-bubbletext" aria-expanded="true" type="button" class="bg-transparent">Hover over me</button>
          </w-box>
          <w-attention
            v-model="tooltipShowing"
            tooltip
            placement="top"
            :target-el="tooltipTarget ? tooltipTarget.$el : null"
            @focus="tooltipShowing = true"
            @blur="tooltipShowing = false">
            <p id="tooltip-bubbletext">Hello Warp!</p>
          </w-attention>
        </div>
        <div>
          <h2>Tooltip with resetted role and aria-label attributes</h2>
          <w-box
            ref="tooltipResetTarget"
            neutral
            as="h4"
            tabindex="0"
            @mouseenter="tooltipResetShowing = true"
            @mouseleave="tooltipResetShowing = false"
            @keydown.escape="tooltipResetShowing = false"
            @focus="tooltipResetShowing = true"
            @blur="tooltipResetShowing = false">
            <button aria-describedby="tooltip-reset-bubbletext" aria-expanded="true" type="button" class="bg-transparent">
              Hover over me
            </button>
          </w-box>
          <w-attention
            v-model="tooltipResetShowing"
            tooltip
            placement="bottom"
            role=""
            aria-label=""
            :target-el="tooltipResetTarget ? tooltipResetTarget.$el : null"
            @focus="tooltipResetShowing = true"
            @blur="tooltipResetShowing = false">
            <p id="tooltip-reset-bubbletext">Tooltip with the message Hello Warp! pointing up</p>
          </w-attention>
        </div>
        <div>
          <h2>Callout</h2>
          <div class="flex items-center">
            <w-box neutral as="h4" aria-details="callout-bubbletext" tabindex="0"> I am a box full of info </w-box>
            <w-attention v-model="calloutShowing" callout placement="right">
              <p id="callout-bubbletext">Hello Warp! This thing is new!</p>
            </w-attention>
          </div>
        </div>
        <div>
          <h2>Popover</h2>
          <w-button
            ref="popoverTarget"
            :aria-expanded="popoverShowing"
            aria-controls="popover-example"
            type="button"
            @click="() => (popoverShowing = !popoverShowing)">
            Open popover
          </w-button>
          <w-attention v-model="popoverShowing" popover placement="right" :target-el="popoverTarget ? popoverTarget.$el : null">
            <p>Hello Warp!</p>
          </w-attention>
        </div>
        <div>
          <h2>Dismissible Popover</h2>
          <w-button
            ref="dismissiblePopoverTarget"
            :aria-expanded="dismissiblePopoverShowing"
            aria-controls="dismissiblePopoverAttentionExample"
            aria-details="dismissiblePopoverContent"
            @click="dismissiblePopoverShowing = !dismissiblePopoverShowing"
            >Click me</w-button
          >
          <w-attention
            id="dismissiblePopoverAttentionExample"
            v-model="dismissiblePopoverShowing"
            popover
            placement="bottom"
            can-close
            flip
            :target-el="dismissiblePopoverTarget ? dismissiblePopoverTarget.$el : null"
            @dismiss="dismissiblePopoverShowing = false">
            <p id="dismissiblePopoverContent">I'm a dismissible popover</p>
          </w-attention>
        </div>
        <div>
          <h2>Popover with icon as target element</h2>
          <w-button
            ref="popoverIconTarget"
            :aria-expanded="popoverIconTargetShowing"
            aria-controls="popover-icon-target-example"
            type="button"
            utility
            quiet
            @click="() => (popoverIconTargetShowing = !popoverIconTargetShowing)">
            <icon-info16 />
          </w-button>
          <w-attention
            v-model="popoverIconTargetShowing"
            popover
            placement="right-end"
            :distance="-12"
            :skidding="7"
            :target-el="popoverIconTarget ? popoverIconTarget.$el : null">
            <p>Hello Warp!</p>
          </w-attention>
        </div>

        <div>
          <h2>Highlight</h2>
          <w-button
            ref="highlightTarget"
            :aria-expanded="highlightShowing"
            aria-controls="highlightAttentionExample"
            aria-details="highlightedContent"
            @click="highlightShowing = !highlightShowing"
            >Click me</w-button
          >
          <w-attention
            id="highlightAttentionExample"
            v-model="highlightShowing"
            highlight
            placement="left"
            flip
            cross-axis
            :fallback-placements="['right', 'bottom', 'top']"
            :target-el="highlightTarget ? highlightTarget.$el : null">
            <p id="highlightedContent">Hello Warp!</p>
          </w-attention>
        </div>
        <div>
          <h2>Dismissible Highlight</h2>
          <w-button
            ref="dismissibleHighlightTarget"
            :aria-expanded="dismissibleHighlightShowing"
            aria-controls="dismissibleHighlightAttentionExample"
            aria-details="dismissibleHighlightedContent"
            @click="dismissibleHighlightShowing = !dismissibleHighlightShowing"
            >Click me</w-button
          >
          <w-attention
            id="dismissibleHighlightAttentionExample"
            v-model="dismissibleHighlightShowing"
            highlight
            placement="bottom"
            flip
            can-close
            :target-el="dismissibleHighlightTarget ? dismissibleHighlightTarget.$el : null"
            @dismiss="dismissibleHighlightShowing = false">
            <p id="dismissibleHighlightedContent">I'm a dismissible highlight</p>
          </w-attention>
        </div>
      </div>
    </token>
  </div>
</template>
