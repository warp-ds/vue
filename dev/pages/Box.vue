<script setup>
import { reactive } from 'vue'
import { wBox, wClickable } from '#components'
import { checkbox, buildCheckboxState } from '#dev-util'

const controls = [
  { name: 'Bleed', checkbox },
  { name: 'Bordered', checkbox },
  { name: 'Clickable', checkbox },
  { name: 'Info', checkbox },
  { name: 'Neutral', checkbox },
]
const state = reactive(buildCheckboxState({ controls, active: 'Bleed' }))
const handleClick = () => alert('Hello Warp!')
</script>

<template>
  <div>
    <component-title title="Box" />

    <token :state="[state]">
      <w-box :bleed="state.Bleed" :bordered="state.Bordered" :info="state.Info" :neutral="state.Neutral" :class="[!(state.Info || state.Neutral) && 'bg-aqua-300']">
        <h3 v-if="!state.Clickable" class="h4">I am some content</h3>
        <w-clickable v-else @click="handleClick"><h3 class="h4 mb-0">I am some clickable content</h3></w-clickable>
      </w-box>
    </token>
    <demo-controls>
      <demo-control label="Variants" :controls="controls" :state="state" />
    </demo-controls>
  </div>
</template>
