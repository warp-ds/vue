import wButtonGroup from './w-button-group.vue'
import wButtonGroupItem from './w-button-group-item.vue'
import { wClickable } from '#generics'
import { installer } from '#util'

export const ButtonGroup = { install: installer([wClickable, wButtonGroup, wButtonGroupItem]) }
export { wButtonGroup, wButtonGroupItem }
