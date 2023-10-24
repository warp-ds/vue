<script setup>
import { ref } from 'vue'
import { wAttention, wBox } from '#components'

const tooltipTarget = ref(null)
const tooltipResetTarget = ref(null)
const calloutTarget = ref(null)
const popoverTarget = ref(null)

const tooltipShowing = ref(false)
const tooltipResetShowing = ref(false)
const calloutShowing = ref(false)
const popoverShowing = ref(false)
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
            ref="tooltipTarget"
            aria-details="tooltip-bubbletext"
            @mouseenter="tooltipShowing = true"
            @mouseleave="tooltipShowing = false"
            @keydown.escape="tooltipShowing = false"
            @focus="tooltipShowing = true"
            @blur="tooltipShowing = false"
            tabindex="0"
            >Hover over me</w-box
          >
          <w-attention
            tooltip
            bottom
            :target-el="tooltipTarget ? tooltipTarget.$el : null"
            v-model="tooltipShowing"
            @focus="tooltipShowing = true"
            @blur="tooltipShowing = false"
          >
            <p id="tooltip-bubbletext">
              Hello Warp!
            </p>
          </w-attention>
        </div>
        <div>
          <h2>Tooltip with resetted role and aria-label attributes</h2>
          <w-box
            neutral
            as="h4"
            ref="tooltipResetTarget"
            aria-details="tooltip-reset-bubbletext"
            @mouseenter="tooltipResetShowing = true"
            @mouseleave="tooltipResetShowing = false"
            @keydown.escape="tooltipResetShowing = false"
            @focus="tooltipResetShowing = true"
            @blur="tooltipResetShowing = false"
            tabindex="0"
            >Hover over me</w-box
          >
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
              Hello Warp!
            </p>
          </w-attention>
        </div>
        <div>
          <h2>Callout</h2>
          <div class="flex items-center">
            <w-box
              neutral
              as="h4"
              ref="calloutTarget"
              aria-details="callout-bubbletext"
              @mouseenter="calloutShowing = true"
              @mouseleave="calloutShowing = false"
              @keydown.escape="calloutShowing = false"
              @focus="calloutShowing = true"
              @blur="calloutShowing = false"
              tabindex="0"
              >I am a box full of info! <br />
              Hover over me for more info.</w-box
            >
            <w-attention
              callout
              right
              :target-el="calloutTarget ? calloutTarget.$el : null"
              v-model="calloutShowing"
              @focus="calloutShowing = true"
              @blur="calloutShowing = false"
              class="ml-8"
            >
              <p id="callout-bubbletext">
                Hello Warp! This thing is new!
              </p>
            </w-attention>
          </div>
        </div>
        <div>
          <h2>Popover</h2>
          <w-box
            neutral
            as="h4"
            ref="popoverTarget"
            aria-details="popover-bubbletext"
            @mouseenter="popoverShowing = true"
            @mouseleave="popoverShowing = false"
            @keydown.escape="popoverShowing = false"
            @focus="popoverShowing = true"
            @blur="popoverShowing = false"
            tabindex="0"
            >Hover over me</w-box
          >
          <w-attention
            popover
            bottom
            :target-el="popoverTarget ? popoverTarget.$el : null"
            v-model="popoverShowing"
            @focus="popoverShowing = true"
            @blur="popoverShowing = false"
          >
          <p id="popover-bubbletext">
            Hello Warp!
          </p>
          </w-attention>
        </div>
      </div>
    </token>
  </div>
</template>
