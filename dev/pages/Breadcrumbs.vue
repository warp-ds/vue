<script setup>
  import { wBreadcrumbs } from '#components'
</script>

<template>
  <div>
    <component-title title="Breadcrumbs" />

    <token>
      <w-breadcrumbs>
        <a href="#/foo">Page 1</a>
        <a href="#/bar">Page 2</a>
        <span aria-current="page">Current Page</span>
      </w-breadcrumbs>
    </token>
  </div>
</template>
