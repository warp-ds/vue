<script setup>
import Sidebar from './Sidebar.vue'
import Search from './Search.vue'
</script>

<template>
  <div class="has-sidebar mt-32">
    <search />
    <sidebar />
    <main class="page-container">
      <div class="max-w-screen-md mx-auto">
        <router-view />
      </div>
    </main>
  </div>
</template>

<style scoped>
.has-sidebar {
  padding-left: 320px;
}
@media (max-width: 640px) {
  .has-sidebar {
    padding-left: 0;
    padding-top: 48px;
  }
}
</style>

<style>
.shiki {
  white-space: pre;
  font-size: 14px;
  padding: 16px;
  border-radius: 8px;
  overflow: auto;
  background-color: var(--w-s-color-background-subtle) !important;
  border: 1px solid var(--w-s-color-border);
  position: relative;
}
.itsy-token {
  padding: 24px 0;
}
@media (max-width: 640px) {
  .shiki {
    font-size: 12px;
  }
  .controls label {
    font-size: 12px;
  }
}
</style>
