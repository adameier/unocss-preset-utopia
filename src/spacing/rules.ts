import type { CSSEntries, DynamicMatcher, Rule, RuleContext } from '@unocss/core'
import { directionMap } from '@unocss/preset-mini/utils'
import { lookupV } from 'fp-ts-std/Record'
import { pipe } from 'fp-ts/function'
import { filterMap as filterMapArr } from 'fp-ts/Array'
import { flatten } from 'fp-ts/ReadonlyArray'
import type { Reader } from 'fp-ts/Reader'
import { ask as askR, map as mapR, of as ofR, sequenceArray } from 'fp-ts/Reader'
import type { RequiredOptions } from '../options/types'
import type { Theme } from './_theme/types'

export interface FluidSizeOptions {
  property: string
  includeDirection?: boolean
}

export const fluidSizeHandler = ({ property, includeDirection = true }: FluidSizeOptions) => pipe(
  askR<RequiredOptions>(),
  mapR(({ minSize, maxSize, minWidth, maxWidth }) => (match: RegExpMatchArray, { theme }: RuleContext<Theme>): CSSEntries | undefined => {
    const sizeV = match[match.length - 1]

    if (!sizeV)
      return

    const sizeFactors = pipe(
      sizeV.split('-'),
      filterMapArr(lookupV(theme.fluidSpacing ?? {})),
    )

    if (sizeFactors.length < 1)
      return

    const from = sizeFactors[0]
    const to = sizeFactors[1] ?? from

    const stepMinSize = minSize * from
    const stepMaxSize = maxSize * (to ?? from)

    const slope = (stepMaxSize - stepMinSize) / (maxWidth - minWidth)

    const intersection = (-1 * minWidth) * slope + stepMinSize

    const cssVal = `clamp(${stepMinSize / 16}rem, ${intersection / 16}rem + ${slope} * 100vw, ${stepMaxSize / 16}rem)`

    if (includeDirection) {
      const direction = match[match.length - 2]
      if (direction)
        return directionMap[direction].map(i => [`${property}${i}`, cssVal])
    }

    return [[property, cssVal]]
  }),
)

const rulesWithMatcher = (regexes: RegExp[]) => (matcher: DynamicMatcher): Rule[] => regexes.map(regex => [regex, matcher])

const paddingRegexes: RegExp[] = [
  /^pa?()-?fluid-?(-?.+)$/,
  /^p-?([xy])-?fluid(?:-?(-?.+))?$/,
  /^p-?([rltbse])-?fluid(?:-?(-?.+))?$/,
  /^p-(block|inline)-?fluid(?:-(-?.+))?$/,
  /^p-?([bi][se])-?fluid(?:-?(-?.+))?$/,
]

const paddingRules: Reader<RequiredOptions, Rule[]> = pipe(
  fluidSizeHandler({ property: 'padding' }),
  mapR(rulesWithMatcher(paddingRegexes)),
)

const marginRegexes: RegExp[] = [
  /^ma?()-?fluid-?(-?.+)$/,
  /^m-?([xy])-?fluid(?:-?(-?.+))?$/,
  /^m-?([rltbse])-?fluid(?:-?(-?.+))?$/,
  /^m-(block|inline)-?fluid(?:-(-?.+))?$/,
  /^m-?([bi][se])-?fluid(?:-?(-?.+))?$/,
]

const marginRules: Reader<RequiredOptions, Rule[]> = pipe(
  fluidSizeHandler({ property: 'margin' }),
  mapR(rulesWithMatcher(marginRegexes)),
)

const fluidSizeSpaceHandler = pipe(
  fluidSizeHandler({ property: 'margin', includeDirection: true }),
  mapR((matcher): DynamicMatcher<Theme> => (match, context) => {
    const res = matcher(match, context)

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
  },
  ),
)

const spaceRegexes: RegExp[] = [
  /^space-?([xy])-?fluid-?(-?.+)$/,
  /^space-(block|inline)-?fluid-(-?.+)$/,
]

const constantSpaceRules: Rule[] = [
  [/^space-?([xy])-reverse$/, ([, d]) => ({ [`--un-space-${d}-reverse`]: 1 })],
  [/^space-(block|inline)-reverse$/, ([, d]) => ({ [`--un-space-${d}-reverse`]: 1 })],
]

const spaceRules: Reader<RequiredOptions, Rule[]> = pipe(
  fluidSizeSpaceHandler,
  mapR(rulesWithMatcher(spaceRegexes)),
)

export const spacingRules = pipe(
  [
    paddingRules,
    marginRules,
    spaceRules,
    ofR(constantSpaceRules),
  ],
  sequenceArray,
  mapR(flatten),
)
