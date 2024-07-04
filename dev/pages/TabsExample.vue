<script setup>
import { ref, h } from 'vue';

import IconProductStarred24 from '@warp-ds/icons/vue/product-starred-24';

import { wTabs, wTab, wTabPanel } from '#components';

const Stars = {
  name: 'stars-svg',
  render: () => h(IconProductStarred24),
};

const model = ref('one');
</script>

<template>
  <div>
    <component-title title="Tabs" />
    <token :state="[model]">
      <w-tabs v-model="model">
        <w-tab label="Tab 1" name="one">
          <stars />
        </w-tab>
        <w-tab label="Tab 2" name="two">
          <stars />
        </w-tab>
        <w-tab label="Tab 3" name="three">
          <stars />
        </w-tab>
      </w-tabs>
      <div>
        <w-tab-panel v-if="model === 'one'" name="one">
          <p class="mb-0">First tab content</p>
        </w-tab-panel>
        <w-tab-panel v-if="model === 'two'" name="two">
          <p class="mb-0">Second tab content</p>
        </w-tab-panel>
        <w-tab-panel v-if="model === 'three'" name="three">
          <p class="mb-0">Third tab content</p>
        </w-tab-panel>
      </div>
    </token>
  </div>
</template>
