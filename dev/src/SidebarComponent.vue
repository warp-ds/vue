<script setup>
import { ref } from 'vue';

import { sidebarConfig } from './sidebar-config.js';
import SidebarLinks from './SidebarLinks.vue';
import { modalShowing } from './store.js';

import { wBox } from '#components';

const expanded = ref(false);
</script>

<template>
  <div>
    <nav class="mobile-menu fixed top-0 left-0 right-0 bg-gray-100 border-b border-gray-200">
      <w-box class="flex justify-between">
        <h1 class="h4 mb-0">Warp Vue</h1>
        <button
          class="flex justify-center items-center w-24 transparent-tap"
          type="button"
          aria-label="show mobile navigation"
          :aria-expanded="expanded"
          aria-controls="sidebar"
          @click="expanded = !expanded">
          <span class="relative overflow-hidden w-16 h-14" :class="{ active: expanded }">
            <span class="top-bar absolute w-16 h-2 bg-gray-700 top-0 left-0" />
            <span class="middle-bar absolute w-16 h-2 bg-gray-700 top-6 left-0" />
            <span class="bottom-bar absolute w-16 h-2 bg-gray-700 top-12 left-0" />
          </span>
        </button>
      </w-box>
    </nav>
    <aside
      id="sidebar"
      :class="{ 'warp-sidebar': expanded, modalShowing }"
      class="sidebar z-50 fixed inset-0 bg-gray-100 border-r border-gray-200 divide-y divide-gray-200">
      <w-box><h1 class="h4">Warp Vue</h1></w-box>
      <sidebar-links v-for="(group, index) in sidebarConfig" :start-open="group.startOpen" :title="group.title" :key="'group-' + index">
        <router-link v-for="(link, linkIndex) in group.links" :to="link.to" :key="'link-' + linkIndex">{{ link.title }}</router-link>
      </sidebar-links>
    </aside>
  </div>
</template>

<style scoped>
a {
  color: var(--w-gray-500);
}
.sidebar,
.mobile-menu {
  transition: 0.3s ease;
}
.sidebar {
  width: 320px;
}
.mobile-menu {
  transform: translateY(-100%);
}
.transparent-tap {
  -webkit-tap-highlight-color: transparent;
}
.sidebar.modalShowing {
  transform: translate(-100%);
}
.top-bar,
.middle-bar,
.bottom-bar {
  transition: 0.3s ease;
}
.top-bar {
  transform: translate(4px);
  transform-origin: 9px 4px;
}
.bottom-bar {
  transform: translate(4px);
  transform-origin: 9px -2px;
}
.active .top-bar {
  transform: translate(0) rotate(225deg);
}
.middle-bar {
  transform: translate(0);
}
.active .middle-bar {
  transform: translate(16px);
}
.bottom-bar {
  transform: translate(8px);
}
.active .bottom-bar {
  transform: translate(0) rotate(135deg);
}
@media (max-width: 640px) {
  .sidebar {
    transform: translate(-100%);
  }
  .sidebar.expanded {
    transform: translate(0);
  }
  .mobile-menu {
    transform: translateY(0);
  }
}
</style>
