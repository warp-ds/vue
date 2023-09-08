<script setup>
import {computed, reactive, ref} from 'vue';
import { wBadge } from '#components';
import { radio } from '#dev-util';

const badgeTypes = [
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
  { name: 'tl', radio },
  { name: 'tr', radio },
  { name: 'bl', radio },
  { name: 'br', radio },
];

const currentType = reactive({active: 'Undefined'});
const currentPosition = reactive({active: 'Undefined'});

const hasType = computed(() => currentType.active !== 'Undefined');
const hasPosition = computed(() => currentPosition.active !== 'Undefined');
</script>

<template>
  <div>
    <component-title title="Badge" />

    <token v-if="hasType && hasPosition" :state="[currentType, currentPosition]">
      <div class="relative border border-0 rounded-8 overflow-hidden h-96">
        <img class="w-full h-96 object-cover" src="https://source.unsplash.com/random/768x96" />
        <w-badge :type="currentType.active" :position="currentPosition.active">{{currentType.active}}</w-badge>
      </div>
    </token>
    <token v-else-if="hasPosition" :state="currentPosition">
      <div class="relative border border-0 rounded-8 overflow-hidden h-96">
        <img class="w-full h-96 object-cover" src="https://source.unsplash.com/random/768x96" />
        <w-badge :position="currentPosition.active">default (rendered as neutral)</w-badge>
      </div>
    </token>
    <token v-else-if="hasType" :state="currentType">
      <w-badge :type="currentType.active">{{currentType.active}}</w-badge>
    </token>
    <token v-else>
      <w-badge>default (rendered as neutral)</w-badge>
    </token>

    <demo-controls y>
      <demo-control label="Type" :controls="badgeTypes" :state="currentType" />
      <demo-control label="Position" :controls="badgePositions" :state="currentPosition" />
    </demo-controls>
  </div>
</template>
