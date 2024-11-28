<script setup>
import { h, Fragment } from 'vue';

import { i18n } from '@lingui/core';
import { interleave } from '@warp-ds/core/breadcrumbs';
import { breadcrumbs as ccBreadcrumbs } from '@warp-ds/css/component-classes';

import { activateI18n } from '../util/i18n';

import { messages as daMessages } from './locales/da/messages.mjs';
import { messages as enMessages } from './locales/en/messages.mjs';
import { messages as fiMessages } from './locales/fi/messages.mjs';
import { messages as nbMessages } from './locales/nb/messages.mjs';
import { messages as svMessages } from './locales/sv/messages.mjs';

activateI18n(enMessages, nbMessages, fiMessages, daMessages, svMessages);

const ariaLabel = i18n._({
  id: 'breadcrumbs.ariaLabel',
  message: 'You are here',
  comment: 'Default screenreader message for the breadcrumb component',
});

const isFragment = (vnode) => vnode.type === Fragment;
const collectElements = (vnodes = []) => vnodes?.map((vnode) => (isFragment(vnode) ? collectElements(vnode.children) : vnode));
const Breadcrumbify = (_, context) => {
  const slot = context.slots.default();
  const vnodes = slot[0].children;
  const elements = collectElements(vnodes).flat(Infinity);
  const styledElements = elements.map((el) => {
    const ccClasses = el.type === 'a' ? ccBreadcrumbs.link : ccBreadcrumbs.text;
    el.props.class = el.props.class ? `${el.props.class} ${ccClasses}` : ccClasses;

    return el;
  });
  return interleave(styledElements, wBreadcrumbSeparator);
};
</script>

<script>
export const wBreadcrumbSeparator = h('span', { class: ccBreadcrumbs.separator }, '/');
export default { name: 'wBreadcrumbs' };
</script>

<template>
  <nav aria-labelledby="breadCrumbLabel">
    <h2 id="breadCrumbLabel" :class="ccBreadcrumbs.a11y">{{ ariaLabel }}</h2>
    <div :class="ccBreadcrumbs.wrapper">
      <breadcrumbify>
        <slot />
      </breadcrumbify>
    </div>
  </nav>
</template>
