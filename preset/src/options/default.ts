import type { RequiredOptions } from './types'

export const defaultOptions: RequiredOptions = {
  minWidth: 320,
  maxWidth: 1240,
  minSize: 18,
  maxSize: 20,
  minTypeScale: 1.2,
  maxTypeScale: 1.25,
  spaceValues: {
    '3xs': 0.25,
    '2xs': 0.5,
    'xs': 0.75,
    's': 1,
    'm': 1.5,
    'l': 2,
    'xl': 3,
    '2xl': 4,
    '3xl': 6,
  },
  usesPresetMini: true,
}
