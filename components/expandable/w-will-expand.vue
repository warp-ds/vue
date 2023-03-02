<template>
  <div :key="key">
    <slot />
  </div>
</template>

<script>
import { id as key } from '#util'

export default {
  name: 'wWillExpand',
  props: { key }
}
</script>
