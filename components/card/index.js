import wCard from './w-card.vue'
import { wClickable } from '#generics'
import { installer } from '#util'

export const Card = { install: installer([wClickable, wCard]) }
export { wCard }
