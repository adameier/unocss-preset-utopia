import type { Preset } from '@unocss/core'
import type { UtopiaOptions } from './options/types'
import { utopianDefaults } from './options/defaults'
import { spacingRules } from './spacing/rules'
import { typographyRules } from './typography/rules'
import { theme } from './spacing/_theme/default'
import { variantSpace } from './variants'

export function presetUtopia(options: UtopiaOptions = {}): Preset {
  const requiredOptions = {
    ...options,
    ...utopianDefaults,
  }

  return {
    name: 'unocss-preset-utopia',
    rules: [
      ...typographyRules(requiredOptions),
      ...spacingRules(requiredOptions),
    ],
    theme,
    options,
    variants: [
      // variantSpace,
    ],
  }
}
