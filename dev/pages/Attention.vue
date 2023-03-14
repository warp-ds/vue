<script setup>
import { ref, reactive } from 'vue'
import { radio, useIsActive } from '#dev-util'
import { wAttention, fBox } from '#components'

const target = ref(null)
const showing = ref(false)

const variant = reactive({ active: 'Tooltip' })
const active = useIsActive(variant)
const variantControls = [
  { name: 'Tooltip', radio },
  { name: 'Callout', radio },
]
</script>

<template>
  <div>
    <component-title title="Attention" />

    <token :state="[variant]">
      <div v-if="active('Tooltip')">
        <w-box neutral class="h4" ref="target" @mouseenter="showing = true" @mouseleave="showing = false">Hover over me</w-box>
        <w-attention tooltip bottom :target-el="target?.$el" v-model="showing">
          <p>Hello Warp!</p>
        </w-attention>
      </div>
      <div class="flex items-center" v-else-if="active('Callout')">
        <w-box neutral class="h4">Don't hover over me</w-box>
        <w-attention callout right class="ml-8">
          <p>Hello Warp! This thing is new!</p>
        </w-attention>
      </div>
    </token>

    <demo-controls>
      <demo-control label="Variant" :controls="variantControls" :state="variant" />
    </demo-controls>
  </div>
</template>
