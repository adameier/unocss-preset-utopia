import type { Rule } from '@unocss/core'
import type { RequiredOptions } from '../options/types'
import { fluidSizeValue } from '../utils'

export const typographyRules = (options: RequiredOptions): Rule[] => [
  [/^text-fluid-?(.+)$/, ([, s]) => {
    const multiplier = parseFloat(s)

    if (Number.isNaN(multiplier))
      return

    const from = options.minTypeScale ** multiplier
    const to = options.maxTypeScale ** multiplier

    return [['font-size', fluidSizeValue(from, to)(options)]]
  }],
]
