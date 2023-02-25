import type { Variant } from '@unocss/core'

export const variantSpace: Variant = (matcher) => {
  if (/^space-?([xy])-?fluid-?(-?.+)$/.test(matcher)) {
    return {
      matcher,
      selector: (input) => {
        return `${input}>:not([hidden])~:not([hidden])`
      },
    }
  }
}
