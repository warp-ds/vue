<script setup>
import { wBreadcrumbs } from '#components'

// const crumbs = ['foo', 'bar', null]
</script>

<template>
  <div>
    <component-title title="Breadcrumbs" />

    <token>
      <w-breadcrumbs>
        <a href="#/foo">Foo</a>
        <a href="#/bar">Bar</a>
        <span aria-current="page">Baz</span>
      </w-breadcrumbs>
    </token>

    <!-- <w-breadcrumbs>
      <template v-for="crumb in crumbs">
        <a v-if="crumb" :href="`#/${crumb}`">{{ crumb }}</a>
        <span v-else aria-current="page">Baz</span>
      </template>
    </w-breadcrumbs> -->
  </div>
</template>
