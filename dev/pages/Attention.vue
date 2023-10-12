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
          <h2 aria-describedby="tooltip-example">Tooltip</h2>
          <w-box
            neutral
            class="h4"
            ref="tooltipTarget"
            @mouseenter="tooltipShowing = true"
            @mouseleave="tooltipShowing = false"
            >Hover over me</w-box
          >
          <w-attention
            role="img"
            aria-label="Black speech bubble pointing up"
            tabindex="0"
            aria-describedby="tooltip-example"
            tooltip
            bottom
            :target-el="tooltipTarget ? tooltipTarget.$el : null"
            v-model="tooltipShowing"
          >
            Hello Warp!
          </w-attention>
        </div>
        <div>
          <h2>Callout</h2>
          <div class="flex items-center">
            <w-box
              neutral
              class="h4"
              ref="calloutTarget"
              @mouseenter="calloutShowing = true"
              @mouseleave="calloutShowing = false"
              >Don't hover over me</w-box
            >
            <w-attention
              role="img"
              aria-label="Green speech bubble pointing left"
              tabindex="0"
              callout
              right
              :target-el="calloutTarget ? calloutTarget.$el : null"
              v-model="calloutShowing"
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
            class="h4"
            ref="popoverTarget"
            @mouseenter="popoverShowing = true"
            @mouseleave="popoverShowing = false"
            >Hover over me</w-box
          >
          <w-attention
            role="img"
            aria-label="White speech bubble pointing up"
            tabindex="0"
            popover
            bottom
            :target-el="popoverTarget ? popoverTarget.$el : null"
            v-model="popoverShowing"
          >
            Hello Warp!
          </w-attention>
        </div>
      </div>
    </token>
  </div>
</template>
