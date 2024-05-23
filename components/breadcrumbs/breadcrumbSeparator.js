import { h } from 'vue';

import { breadcrumbs as ccBreadcrumbs } from '@warp-ds/css/component-classes';

export const wBreadcrumbSeparator = h('span', { class: ccBreadcrumbs.separator }, '/');
