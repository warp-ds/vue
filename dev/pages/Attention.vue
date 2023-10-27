<script setup>
import { ref } from 'vue'
import { wAttention, wBox, wButton } from '#components'

const tooltipTarget = ref(null)
const tooltipResetTarget = ref(null)
const calloutTarget = ref(null)
const popoverTarget = ref(null)
const dismissiblePopoverTarget = ref(null)
const highlightTarget = ref(null)
const dismissibleHighlightTarget = ref(null)

const tooltipShowing = ref(false)
const tooltipResetShowing = ref(false)
const calloutShowing = ref(true)
const popoverShowing = ref(false)
const dismissiblePopoverShowing = ref(false)
const highlightShowing = ref(false)
const dismissibleHighlightShowing = ref(false)
</script>

<template>
  <div>
    <component-title title="Attention" />

    <token>
      <div class="space-y-16">
        <div>
          <h2>Tooltip</h2>
          <w-box
            neutral
            as="h4"
            :ref="tooltipTarget ? tooltipTarget.$el : null"
            @mouseenter="tooltipShowing = true"
            @mouseleave="tooltipShowing = false"
            @keydown.escape="tooltipShowing = false"
            @focus="tooltipShowing = true"
            @blur="tooltipShowing = false"
            tabindex="0"
          >
            <button
              aria-describedby="tooltip-bubbletext"
              aria-expanded="true"
              type="button"
              class="bg-transparent"
            >
              Hover over me
            </button>
          </w-box>
          <w-attention
            tooltip
            bottom
            :target-el="tooltipTarget ? tooltipTarget.$el : null"
            v-model="tooltipShowing"
            @focus="tooltipShowing = true"
            @blur="tooltipShowing = false"
          >
            <p id="tooltip-bubbletext">Hello Warp!</p>
          </w-attention>
        </div>
        <div>
          <h2>Tooltip with resetted role and aria-label attributes</h2>
          <w-box
            neutral
            as="h4"
            :ref="tooltipResetTarget ? tooltipResetTarget.$el : null"
            @mouseenter="tooltipResetShowing = true"
            @mouseleave="tooltipResetShowing = false"
            @keydown.escape="tooltipResetShowing = false"
            @focus="tooltipResetShowing = true"
            @blur="tooltipResetShowing = false"
            tabindex="0"
          >
            <button
              aria-describedby="tooltip-reset-bubbletext"
              aria-expanded="true"
              type="button"
              class="bg-transparent"
            >
              Hover over me
            </button>
          </w-box>
          <w-attention
            tooltip
            bottom
            role=""
            ariaLabel=""
            :target-el="tooltipResetTarget ? tooltipResetTarget.$el : null"
            v-model="tooltipResetShowing"
            @focus="tooltipResetShowing = true"
            @blur="tooltipResetShowing = false"
          >
            <p id="tooltip-reset-bubbletext">
              Tooltip with the message Hello Warp! pointing up
            </p>
          </w-attention>
        </div>
        <div>
          <h2>Callout</h2>
          <div class="flex items-center">
            <w-box
              neutral
              as="h4"
              :ref="calloutTarget ? calloutTarget.$el : null"
              aria-details="callout-bubbletext"
              tabindex="0"
            >
              I am a box full of info
            </w-box>
            <w-attention
              callout
              right
              v-model="calloutShowing"
              class="ml-8"
              :target-el="calloutTarget ? calloutTarget.$el : null"
            >
              <p id="callout-bubbletext">Hello Warp! This thing is new!</p>
            </w-attention>
          </div>
        </div>
        <div>
          <h2>Popover</h2>
          <button
            :aria-expanded="popoverShowing"
            aria-controls="popover-example"
            type="button"
            :ref="popoverTarget ? popoverTarget.$el : null"
            @click="() => (popoverShowing = !popoverShowing)"
            class="p-4 border rounded bg-transparent"
          >
            Open popover
          </button>
          <w-attention
            popover
            bottom
            :target-el="popoverTarget ? popoverTarget.$el : null"
            v-model="popoverShowing"
          >
            <p>Hello Warp!</p>
          </w-attention>
        </div>
        <div>
          <h2>Dismissible Popover</h2>
          <w-button
            :aria-expanded="dismissiblePopoverShowing"
            aria-controls="dismissiblePopoverAttentionExample"
            aria-details="dismissiblePopoverContent"
            ref="dismissiblePopoverTarget"
            @click="dismissiblePopoverShowing = !dismissiblePopoverShowing"
          >Click me</w-button>
          <w-attention
            id="dismissiblePopoverAttentionExample"
            popover
            bottom
            canClose
            @dismiss="dismissiblePopoverShowing = false"
            :target-el="dismissiblePopoverTarget ? dismissiblePopoverTarget.$el : null"
            v-model="dismissiblePopoverShowing"
          >
            <p id="dismissiblePopoverContent">I'm a dismissible popover</p>
          </w-attention>
        </div>
        <div>
          <h2>Highlight</h2>
          <w-button
            :aria-expanded="highlightShowing"
            aria-controls="highlightAttentionExample"
            aria-details="highlightedContent"
            ref="highlightTarget"
            @click="highlightShowing = !highlightShowing"
          >Click me</w-button>
          <w-attention
            id="highlightAttentionExample"
            highlight
            bottom
            :target-el="highlightTarget ? highlightTarget.$el : null"
            v-model="highlightShowing"
          >
            <p id="highlightedContent">
              Hello Warp!
            </p>
          </w-attention>
        </div>
        <div>
          <h2>Dismissible Highlight</h2>
          <w-button
            :aria-expanded="dismissibleHighlightShowing"
            aria-controls="dismissibleHighlightAttentionExample"
            aria-details="dismissibleHighlightedContent"
            ref="dismissibleHighlightTarget"
            @click="dismissibleHighlightShowing = !dismissibleHighlightShowing"
          >Click me</w-button>
          <w-attention
            id="dismissibleHighlightAttentionExample"
            highlight
            bottom
            canClose
            @dismiss="dismissibleHighlightShowing = false"
            :target-el="dismissibleHighlightTarget ? dismissibleHighlightTarget.$el : null"
            v-model="dismissibleHighlightShowing"
          >
          <p id="dismissibleHighlightedContent">I'm a dismissible highlight</p>
          </w-attention>
        </div>
      </div>
    </token>
  </div>
</template>
