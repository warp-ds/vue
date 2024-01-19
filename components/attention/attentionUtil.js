import { attention as ccAttention } from '@warp-ds/css/component-classes'

const TOPSTART = "top-start";
const TOP = "top";
const TOPEND = "top-end";
const RIGHTSTART = "right-start";
const RIGHT = "right";
const RIGHTEND ="right-end";
const BOTTOMSTART = "bottom-start";
const BOTTOM = "bottom";
const BOTTOMEND = "bottom-end"
const LEFTSTART = "left-start";
const LEFT = "left";
const LEFTEND = "left-end";

// type Directions =   | 'top'
// | 'top-start'
// | 'top-end'
// | 'right'
// | 'right-start'
// | 'right-end'
// | 'bottom'
// | 'bottom-start'
// | 'bottom-end'
// | 'left'
// | 'left-start'
// | 'left-end';

export const opposites = {
  [TOPSTART]: BOTTOMSTART,
  [TOP]: BOTTOM,
  [TOPEND]: BOTTOMEND,
  [BOTTOMSTART]: TOPSTART,
  [BOTTOM]: TOP,
  [BOTTOMEND]: TOPEND,
  [LEFTSTART]: RIGHTSTART,
  [LEFT]: RIGHT,
  [LEFTEND]: RIGHTEND,
  [RIGHTSTART]: LEFTSTART,
  [RIGHT]: LEFT,
  [RIGHTEND]: LEFTEND,
}
export const directions = [TOPSTART, TOP, TOPEND, BOTTOMSTART, BOTTOM, BOTTOMEND, LEFTSTART, LEFT, LEFTEND, RIGHTSTART, RIGHT, RIGHTEND]

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

export const rotation = {
  [LEFTSTART]: -45,
  [LEFT]: -45,
  [LEFTEND]: -45,
  [TOPSTART]: 45,
  [TOP]: 45,
  [TOPEND]: 45,
  [RIGHTSTART]: 135,
  [RIGHT]: 135,
  [RIGHTEND]: 135,
  [BOTTOMSTART]: -135,
  [BOTTOM]: -135,
  [BOTTOMEND]: -135,
};

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export const props = {
  noArrow: Boolean,
  canClose: Boolean,
  ...variants.reduce((acc, e) => (acc[e] = Boolean, acc), {}),
  ...directions.reduce((acc, e) => (acc[e] = Boolean, acc), {})
}

const middlePosition = 'calc(50% - 7px)'
const isDirectionVertical = (name) => [TOPSTART, TOP, TOPEND, BOTTOMSTART, BOTTOM, BOTTOMEND].includes(name)

export const computeCalloutArrow = ({ actualDirection, directionName, arrowEl }) => {
  actualDirection.value = directionName.value
  const directionIsVertical = isDirectionVertical(directionName.value)
  arrowEl.value.$el.style.left = directionIsVertical ? middlePosition : null
  arrowEl.value.$el.style.top = !directionIsVertical ? middlePosition : null
}
