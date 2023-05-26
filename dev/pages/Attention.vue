<script setup>
import { ref, reactive } from 'vue'
import { radio, useIsActive } from '#dev-util'
import { wAttention, wBox } from '#components'

const tooltipTarget = ref(null)
const calloutTarget = ref(null)
const popoverTarget = ref(null)

const tooltipShowing = ref(false)
const calloutShowing = ref(false)
const popoverShowing = ref(false)
</script>

<template>
  <div>
    <component-title title="Attention" />

    <token>
      <div>
        <h2>Tooltip</h2>
        <w-box neutral class="h4" ref="tooltipTarget" @mouseenter="tooltipShowing = true; target = $refs.tooltipTarget" @mouseleave="tooltipShowing = false">Hover over me</w-box>
        <w-attention tooltip bottom :target-el="tooltipTarget ? tooltipTarget.$el : null" v-model="tooltipShowing">
          <p>Hello Warp!</p>
        </w-attention>
      </div>
      <div class="flex items-center">
        <h2>Callout</h2>
        <w-box neutral class="h4" ref="calloutTarget" @mouseenter="calloutShowing = true; target = $refs.calloutTarget" @mouseleave="calloutShowing = false">Don't hover over me</w-box>
        <w-attention callout right :target-el="calloutTarget ? calloutTarget.$el : null" v-model="calloutShowing" class="ml-8">
          <p>Hello Warp! This thing is new!</p>
        </w-attention>
      </div>
      <div>
        <h2>Popover</h2>
        <w-box neutral class="h4" ref="popoverTarget" @mouseenter="popoverShowing = true; target = $refs.popoverTarget" @mouseleave="popoverShowing = false">Hover over me</w-box>
        <w-attention popover bottom :target-el="popoverTarget ? popoverTarget.$el : null" v-model="popoverShowing">
          <p>Hello Warp!</p>
        </w-attention>
      </div>
    </token>
  </div>
</template>
