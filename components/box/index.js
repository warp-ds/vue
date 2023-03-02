import wBox from './w-box.vue'
import { wClickable } from '#generics'
import { installer } from '#util'

export const Box = { install: installer([wBox, wClickable]) }
export { wBox }
