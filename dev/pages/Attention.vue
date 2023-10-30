<script setup>
import { ref } from 'vue'
import { wAttention, wBox } from '#components'

const tooltipTarget = ref(null)
const tooltipResetTarget = ref(null)
const calloutTarget = ref(null)
const popoverTarget = ref(null)
const highlightTarget = ref(null)

const tooltipShowing = ref(false)
const tooltipResetShowing = ref(false)
const calloutShowing = ref(true)
const popoverShowing = ref(false)
const highlightShowing = ref(false)
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
          <h2>Highlight</h2>
          <w-box
            neutral
            class="h4"
            :ref="highlightTarget ? highlightTarget.$el : null"
            @mouseenter="highlightShowing = true"
            @mouseleave="highlightShowing = false"
            @keydown.escape="highlightShowing = false"
            @focus="highlightShowing = true"
            @blur="highlightShowing = false"
            tabindex="0"
          >
            <button
              aria-describedby="highlight-bubbletext"
              aria-expanded="true"
              type="button"
              class="bg-transparent"
            >
              Hover over me
            </button>
          </w-box>
          <w-attention
            highlight
            bottom
            :target-el="highlightTarget ? highlightTarget.$el : null"
            v-model="highlightShowing"
          >
            <p id="highlight-bubbletext">Hello Warp!</p>
          </w-attention>
        </div>
      </div>
    </token>
  </div>
</template>
