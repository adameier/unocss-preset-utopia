import type { Rule } from '@unocss/core'
import type { RequiredOptions } from '../options/types'
import { fluidSpaceHandler } from './spacing'
import { fluidTypeHandler } from './typography'

export const cssPropertyRules = (options: RequiredOptions): Rule[] => [
  [/^\[([\w-]+)]-fluid-(type|space)-?(.+)$/, ([, prop, type, value]) => {
    if (type === 'type')
      return { [prop]: fluidTypeHandler(value)(options) }

    if (type === 'space')
      return { [prop]: fluidSpaceHandler(value)(options) }
  }],
]
