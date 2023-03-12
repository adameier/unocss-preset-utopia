import type { Rule } from '@unocss/core'
import type { RequiredOptions } from '../options/types'
import { fluidSizeValue } from '../utils'

export const fluidTypeHandler = (scale: string) => (options: RequiredOptions) => {
  const multiplier = parseFloat(scale)

  if (Number.isNaN(multiplier))
    return

  const from = options.minTypeScale ** multiplier
  const to = options.maxTypeScale ** multiplier

  return fluidSizeValue(from, to)(options)
}

export const typographyRules = (options: RequiredOptions): Rule[] => [
  [/^text-fluid-?(.+)$/, ([, s]) => {
    return [['font-size', fluidTypeHandler(s)(options)]]
  }],
]
