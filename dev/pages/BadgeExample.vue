<script setup>
import { computed, reactive } from 'vue';

import { wBadge } from '#components';
import { radio } from '#dev-util';

const badgeVariants = [
  { name: 'Undefined', radio },
  { name: 'neutral', radio },
  { name: 'info', radio },
  { name: 'positive', radio },
  { name: 'warning', radio },
  { name: 'negative', radio },
  { name: 'disabled', radio },
  { name: 'notification', radio },
  { name: 'price', radio },
];
const badgePositions = [
  { name: 'Undefined', radio },
  { name: 'top-left', radio },
  { name: 'top-right', radio },
  { name: 'bottom-left', radio },
  { name: 'bottom-right', radio },
];

const currentVariant = reactive({ active: 'Undefined' });
const currentPosition = reactive({ active: 'Undefined' });

const hasVariant = computed(() => currentVariant.active !== 'Undefined');
const hasPosition = computed(() => currentPosition.active !== 'Undefined');
</script>

<template>
  <div>
    <component-title title="Badge" />

    <token v-if="hasVariant && hasPosition" :state="[currentVariant, currentPosition]">
      <div class="relative border border-0 rounded-8 overflow-hidden h-96">
        <img class="w-full h-96 object-cover" src="https://source.unsplash.com/random/768x96" />
        <w-badge :variant="currentVariant.active" :position="currentPosition.active">{{ currentVariant.active }}</w-badge>
      </div>
    </token>
    <token v-else-if="hasPosition" :state="currentPosition">
      <div class="relative border border-0 rounded-8 overflow-hidden h-96">
        <img class="w-full h-96 object-cover" src="https://source.unsplash.com/random/768x96" />
        <w-badge :position="currentPosition.active">default (rendered as neutral)</w-badge>
      </div>
    </token>
    <token v-else-if="hasVariant" :state="currentVariant">
      <w-badge :variant="currentVariant.active">{{ currentVariant.active }}</w-badge>
    </token>
    <token v-else>
      <w-badge>default (rendered as neutral)</w-badge>
    </token>

    <demo-controls y>
      <demo-control label="Variant" :controls="badgeVariants" :state="currentVariant" />
      <demo-control label="Position" :controls="badgePositions" :state="currentPosition" />
    </demo-controls>
  </div>
</template>
