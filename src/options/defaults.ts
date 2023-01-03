import type { UtopiaOptions } from './types'

export const utopianDefaults: Required<UtopiaOptions> = {
  minWidth: 320,
  maxWidth: 1140,
  minSize: 16,
  maxSize: 24,
  minTypeScale: 1.2,
  maxTypeScale: 1.33,
}

export const typographyDefaults = {
  ...utopianDefaults,
  minTypeScale: 1.2,
  maxTypeScale: 1.33,
}
