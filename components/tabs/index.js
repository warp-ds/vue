import wTabPanel from './w-tab-panel.vue';
import wTab from './w-tab.vue';
import wTabs from './w-tabs.vue';

import { installer } from '#util';

export const Tabs = { install: installer([wTabs, wTab, wTabPanel]) };
export { wTabs, wTab, wTabPanel };
