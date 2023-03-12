import type { CSSEntries, DynamicMatcher, Rule } from '@unocss/core'
import { directionMap } from '@unocss/preset-mini/utils'
import type { RequiredOptions } from '../options/types'
import { fluidSizeValue } from '../utils'

export const fluidSpaceHandler = (match: string) => (options: RequiredOptions) => {
  const sizeFactors = match.split('-').map(s => options.spaceValues[s]).filter(v => v !== undefined)

  if (sizeFactors.length < 1)
    return

  return fluidSizeValue(sizeFactors[0], sizeFactors[1])(options)
}

export interface FluidPropertyOptions {
  property: string
  includeDirection?: boolean
}

const fluidPropertyHandler = ({ property, includeDirection = true }: FluidPropertyOptions) => (options: RequiredOptions) =>
  ([, d, v]: RegExpMatchArray): CSSEntries | undefined => {
    const cssVal = fluidSpaceHandler(v)(options)

    if (!cssVal)
      return

    if (includeDirection)
      return directionMap[d].map(i => [`${property}${i}`, cssVal])

    return [[property, cssVal]]
  }

const rulesWithMatcher = (regexes: RegExp[], matcher: DynamicMatcher): Rule[] => regexes.map(regex => [regex, matcher])

const paddingRegexes: RegExp[] = [
  /^pa?()-?fluid-?(-?.+)$/,
  /^p-?([xy])-?fluid(?:-?(-?.+))?$/,
  /^p-?([rltbse])-?fluid(?:-?(-?.+))?$/,
  /^p-(block|inline)-?fluid(?:-(-?.+))?$/,
  /^p-?([bi][se])-?fluid(?:-?(-?.+))?$/,
]

const paddingRules = (options: RequiredOptions) => rulesWithMatcher(paddingRegexes, fluidPropertyHandler({ property: 'padding' })(options))

const marginRegexes: RegExp[] = [
  /^ma?()-?fluid-?(-?.+)$/,
  /^m-?([xy])-?fluid(?:-?(-?.+))?$/,
  /^m-?([rltbse])-?fluid(?:-?(-?.+))?$/,
  /^m-(block|inline)-?fluid(?:-(-?.+))?$/,
  /^m-?([bi][se])-?fluid(?:-?(-?.+))?$/,
]

const marginRules = (options: RequiredOptions) => rulesWithMatcher(marginRegexes, fluidPropertyHandler({ property: 'margin' })(options))

const fluidSpaceBetweenHandler = (options: RequiredOptions): DynamicMatcher => (match) => {
  const res = fluidPropertyHandler({ property: 'margin', includeDirection: true })(options)(match)

  const [, d] = match

  const results = res?.map(([property, v]): [string, string] =>
    [property, property.endsWith('right') || property.endsWith('bottom')
      ? `calc(${v} * var(--un-space-${d}-reverse))`
      : `calc(${v} * calc(1 - var(--un-space-${d}-reverse)))`],
  )

  if (results) {
    return [
      [`--un-space-${d}-reverse`, 0],
      ...results,
    ]
  }
}

const spaceRegexes: RegExp[] = [
  /^space-?([xy])-?fluid-?(-?.+)$/,
  /^space-(block|inline)-?fluid-(-?.+)$/,
]

const spaceRules = (options: RequiredOptions): Rule[] => [
  ...rulesWithMatcher(spaceRegexes, fluidSpaceBetweenHandler(options)),
  [/^space-?([xy])-reverse$/, ([, d]) => ({ [`--un-space-${d}-reverse`]: 1 })],
  [/^space-(block|inline)-reverse$/, ([, d]) => ({ [`--un-space-${d}-reverse`]: 1 })],
]

const gapDirections: Record<string, string> = {
  '': '',
  'x': 'column-',
  'y': 'row-',
}

const fluidGapHandler = (options: RequiredOptions): DynamicMatcher => ([, d = '', s]) => {
  const v = fluidSpaceHandler(s)(options)
  if (v) {
    return {
      [`grid-${gapDirections[d]}gap`]: v,
      [`${gapDirections[d]}gap`]: v,
    }
  }
}

const gapRegexes: RegExp[] = [
  /^(?:flex-|grid-)?gap-?fluid-?()(.+)$/,
  /^(?:flex-|grid-)?gap-([xy])-?fluid-?(.+)$/,
]

const gapRules = (options: RequiredOptions): Rule[] => rulesWithMatcher(gapRegexes, fluidGapHandler(options))

const sizeMapping: Record<string, string> = {
  h: 'height',
  w: 'width',
  inline: 'inline-size',
  block: 'block-size',
}

function getSizePropName(minmax: string, hw: string) {
  return `${minmax || ''}${sizeMapping[hw]}`
}

const fluidSizeHandler = (options: RequiredOptions): DynamicMatcher => ([, m, w, s]) => ({
  [getSizePropName(m, w)]: fluidSpaceHandler(s)(options),
})

const sizeRegexes: RegExp[] = [
  /^(min-|max-)?([wh])-?fluid-?(.+)$/,
  /^(min-|max-)?(block|inline)-fluid-?(.+)$/,
]

const sizeRules = (options: RequiredOptions): Rule[] => rulesWithMatcher(sizeRegexes, fluidSizeHandler(options))

const flexBasisRule = (options: RequiredOptions): Rule => [
  /^(?:flex-)?basis-?fluid-?(.+)$/, ([, d]) => ({ 'flex-basis': fluidSpaceHandler(d)(options) }),
]

export const spacingRules = (options: RequiredOptions) => [
  ...paddingRules(options),
  ...marginRules(options),
  ...spaceRules(options),
  ...gapRules(options),
  ...sizeRules(options),
  flexBasisRule(options),
]
