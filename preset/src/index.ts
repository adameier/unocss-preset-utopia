import type { Preset } from '@unocss/core'
import { defaultOptions } from './options/default'
import type { PresetUtopiaOptions, RequiredOptions } from './options/types'
import { cssPropertyRules } from './rules/misc'
import { spacingRules } from './rules/spacing'
import { typographyRules } from './rules/typography'
import { variantSpace } from './variants'

export function presetUtopia(presetOptions?: PresetUtopiaOptions): Preset {
  const options: RequiredOptions = {
    ...defaultOptions,
    ...presetOptions,
  }

  return {
    name: 'unocss-preset-utopia',
    rules: [
      ...typographyRules(options),
      ...spacingRules(options),
      ...cssPropertyRules(options),
    ],
    options,
    variants: [
      ...(options.usesPresetMini ? [] : [variantSpace]),
    ],
  }
}

export type { PresetUtopiaOptions }
