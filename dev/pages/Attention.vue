<script setup>
import { ref, reactive } from "vue";
import { radio, useIsActive } from "#dev-util";
import { wAttention, wBox } from "#components";

const tooltipTarget = ref(null);
const calloutTarget = ref(null);
const popoverTarget = ref(null);

const tooltipShowing = ref(false);
const calloutShowing = ref(false);
const popoverShowing = ref(false);
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
            aria-describedby="tooltip-example"
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
            aria-describedby="tooltip-example"
            :target-el="tooltipTarget ? tooltipTarget.$el : null"
            v-model="tooltipShowing"
            @focus="tooltipShowing = true"
            @blur="tooltipShowing = false"
          >
            Hello Warp!
          </w-attention>
        </div>
        <div>
          <h2>Callout</h2>
          <div class="flex items-center">
            <w-box
              neutral
              as="h4"
              ref="calloutTarget"
              aria-describedby="callout-example"
              @mouseenter="calloutShowing = true"
              @mouseleave="calloutShowing = false"
              @keydown.escape="calloutShowing = false"
              @focus="calloutShowing = true"
              @blur="calloutShowing = false"
              tabindex="0"
              >I am a box full of info! <br> Hover over me for more info.</w-box
            >
            <w-attention
              callout
              right
              aria-describedby="callout-example"
              :target-el="calloutTarget ? calloutTarget.$el : null"
              v-model="calloutShowing"
              @focus="calloutShowing = true"
              @blur="calloutShowing = false"
              class="ml-8"
            >
              Hello Warp! This thing is new!
            </w-attention>
          </div>
        </div>
        <div>
          <h2>Popover</h2>
          <w-box
            neutral
            as="h4"
            ref="popoverTarget"
            aria-describedby="popover-example"
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
            aria-describedby="popover-example"
            :target-el="popoverTarget ? popoverTarget.$el : null"
            v-model="popoverShowing"
            @focus="popoverShowing = true"
            @blur="popoverShowing = false"
          >
            Hello Warp!
          </w-attention>
        </div>
      </div>
    </token>
  </div>
</template>
