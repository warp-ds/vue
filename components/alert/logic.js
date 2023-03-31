export const wrapperClassNamesMap = {
  negative:  "i-border-$color-alert-negative-subtle-border i-bg-$color-alert-negative-background i-text-$color-alert-negative-text i-border-l-$color-alert-negative-border",
  negativeIcon: "i-text-$color-alert-negative-icon",
  positive:  "i-border-$color-alert-positive-subtle-border i-bg-$color-alert-positive-background i-text-$color-alert-positive-text i-border-l-$color-alert-positive-border",
  positiveIcon: "i-text-$color-alert-positive-icon",
  warning:  "i-border-$color-alert-warning-subtle-border i-bg-$color-alert-warning-background i-text-$color-alert-warning-text i-border-l-$color-alert-warning-border",
  warningIcon: "i-text-$color-alert-warning-icon",
  info:  "i-border-$color-alert-info-subtle-border i-bg-$color-alert-info-background i-text-$color-alert-info-text i-border-l-$color-alert-info-border",
  infoIcon: "i-text-$color-alert-info-icon"
}

export const iconClassNamesMap = {
  negative: "i-text-$color-alert-negative-icon",
  positive: "i-text-$color-alert-positive-icon",
  warning: "i-text-$color-alert-warning-icon",
  info: "i-text-$color-alert-info-icon"
}

export const possibleColorBooleans = ['negative', 'positive', 'warning', 'info'];
export const colorBooleanProps = possibleColorBooleans.reduce((acc, k) => (acc[k] = Boolean, acc), {});
