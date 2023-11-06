import { attention as ccAttention } from '@warp-ds/css/component-classes'

const TOP = 'top'
const BOTTOM = 'bottom'
const LEFT = 'left'
const RIGHT = 'right'
export const opposites = {
  [TOP]: BOTTOM,
  [BOTTOM]: TOP,
  [LEFT]: RIGHT,
  [RIGHT]: LEFT
}
export const directions = [TOP, BOTTOM, LEFT, RIGHT]

const TOOLTIP = "tooltip"
const POPOVER = "popover"
const CALLOUT = "callout"
const HIGHLIGHT = "highlight"
export const variants = [CALLOUT, POPOVER, TOOLTIP, HIGHLIGHT];

export const getVariantClasses = (props) => {
  const activeVariant = variants.find(b => !!props[b]) || '';

  return {
    wrapper: ccAttention[activeVariant],
    arrow: ccAttention[`arrow${activeVariant.charAt(0).toUpperCase() + activeVariant.slice(1)}`]
  }
};

export const rotation = { [LEFT]: -45, [TOP]: 45, [RIGHT]: 135, [BOTTOM]: -135 }

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export const props = {
  noArrow: Boolean,
  canClose: Boolean,
  ...variants.reduce((acc, e) => (acc[e] = Boolean, acc), {}),
  ...directions.reduce((acc, e) => (acc[e] = Boolean, acc), {})
}

const middlePosition = 'calc(50% - 7px)'
const isDirectionVertical = (name) => [TOP, BOTTOM].includes(name)

export const computeCalloutArrow = ({ actualDirection, directionName, arrowEl }) => {
  actualDirection.value = directionName.value
  const directionIsVertical = isDirectionVertical(directionName.value)
  arrowEl.value.$el.style.left = directionIsVertical ? middlePosition : null
  arrowEl.value.$el.style.top = !directionIsVertical ? middlePosition : null
}
