import wAlert from './w-alert.vue'
import { installer } from '#util'

export const Alert = { install: installer([wAlert]) }
export { wAlert }
