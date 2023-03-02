import wTabs from './w-tabs.vue'
import wTab from './w-tab.vue'
import wTabPanel from './w-tab-panel.vue'
import { installer } from '#util'

export const Tabs = { install: installer([wTabs, wTab, wTabPanel]) }
export { wTabs, wTab, wTabPanel }
