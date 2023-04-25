<template>
  <nav :aria-label="ariaLabel">
    <h2 :class="ccBreadcrumbs.a11y">{{ ariaLabel }}</h2>
    <div :class="ccBreadcrumbs.wrapper">
      <breadcrumbify>
        <slot />
      </breadcrumbify>
    </div>
  </nav>
</template>

<script setup>
import { h, Fragment } from 'vue'
import { interleave } from '@warp-ds/core/breadcrumbs'
import { breadcrumbs as ccBreadcrumbs } from "@warp-ds/component-classes"

const props = defineProps({
  ariaLabel: { type: String, default: 'Her er du' }
});

const isFragment = vnode => vnode.type === Fragment
const collectElements = (vnodes = []) => vnodes?.map(vnode => isFragment(vnode) ? collectElements(vnode.children) : vnode)
const Breadcrumbify = (_, context) => {
  const slot = context.slots.default()
  const vnodes = slot[0].children
  const elements = collectElements(vnodes).flat(Infinity)
  const styledElements = elements.map(el => {
    const ccClasses = el.type === "a" ? ccBreadcrumbs.link : ccBreadcrumbs.text
    el.props.class = el.props.class ? `${el.props.class} ${ccClasses}` : ccClasses

    return el
  })
  return interleave(styledElements, wBreadcrumbSeparator)
}
</script>

<script>
  export const wBreadcrumbSeparator = h('span', { ariaHidden: true, class: ccBreadcrumbs.separator }, '/')
  export default { name: 'wBreadcrumbs' }
</script>
