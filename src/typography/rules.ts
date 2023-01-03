import type { Rule } from '@unocss/core'
import type { RequiredOptions } from '../options/types'

export function typographyRules({ minSize, maxSize, minWidth, maxWidth, minTypeScale, maxTypeScale }: RequiredOptions): Rule[] {
  return [
    [/^text-fluid-(-?.+)$/, ([, s]) => {
      const multiplier = parseFloat(s)

      if (Number.isNaN(multiplier))
        return

      const stepMinSize = minSize * minTypeScale ** multiplier
      const stepMaxSize = maxSize * maxTypeScale ** multiplier

      const slope = (stepMaxSize - stepMinSize) / (maxWidth - minWidth)

      const intersection = (-1 * minWidth) * slope + stepMinSize

      return {
        'font-size': `clamp(${stepMinSize / 16}rem, ${intersection / 16}rem + ${slope} * 100vw, ${stepMaxSize / 16}rem)`,
      }
    }],
  ]
}
