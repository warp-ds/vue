import wStep from './w-step.vue'
import wSteps from './w-steps.vue'
import { installer } from '#util'

export const Steps = { install: installer([wStep, wSteps]) }
export { wStep, wSteps }
