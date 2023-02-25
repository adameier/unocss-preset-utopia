import type { RequiredOptions } from '../options/types'

export const fluidSizeValue = (from: number, to?: number) => (options: RequiredOptions) => {
  const { minSize, maxSize, minWidth, maxWidth } = options

  const stepMinSize = minSize * from
  const stepMaxSize = maxSize * (to ?? from)

  const slope = (stepMaxSize - stepMinSize) / (maxWidth - minWidth)

  const intersection = (-1 * minWidth) * slope + stepMinSize

  return `clamp(${(stepMinSize / 16).toFixed(2)}rem, calc(${(intersection / 16).toFixed(2)}rem + ${(slope * 100).toFixed(2)}vw), ${(stepMaxSize / 16).toFixed(2)}rem)`
}
