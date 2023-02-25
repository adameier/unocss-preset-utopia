export interface PresetUtopiaOptions {
  /**
   * @default 320
   */
  minWidth?: number
  /**
   * @default 1240
   */
  maxWidth?: number
  /**
   * @default 18
   */
  minSize?: number
  /**
   * @default 20
   */
  maxSize?: number
  /**
   * @default 1.2
   */
  minTypeScale?: number
  /**
   * @default 1.25
   */
  maxTypeScale?: number
  /**
   * @default {
      '3xs': 0.25,
      '2xs': 0.5,
      'xs': 0.75,
      's': 1,
      'm': 1.5,
      'l': 2,
      'xl': 3,
      '2xl': 4,
      '3xl': 6,
    }
   */
  spaceValues?: Record<string, number>

  /**
   * Indicates if @unocss/preset-mini, or a preset that extends it is being used
   *
   * @default true
   */
  usesPresetMini?: boolean
}

export type RequiredOptions = Required<PresetUtopiaOptions>
