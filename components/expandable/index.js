import wExpandable from './w-expandable.vue';
import wWillExpand from './w-will-expand.vue';

import { wExpandTransition } from '#generics';
import { installer } from '#util';

export const Expandable = { install: installer([wExpandable, wExpandTransition, wWillExpand]) };
export { wExpandable, wWillExpand };
