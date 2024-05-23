import { wBreadcrumbSeparator } from './breadcrumbSeparator';
import wBreadcrumbs from './w-breadcrumbs.vue';

import { installer } from '#util';

export const Breadcrumbs = { install: installer([wBreadcrumbs]) };
export { wBreadcrumbs, wBreadcrumbSeparator };
