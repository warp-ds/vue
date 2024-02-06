import { attention as ccAttention } from '@warp-ds/css/component-classes'

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

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export const props = {
  noArrow: Boolean,
  canClose: Boolean,
  ...variants.reduce((acc, e) => (acc[e] = Boolean, acc), {}),
}
