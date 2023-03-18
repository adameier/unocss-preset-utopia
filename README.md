# unocss-preset-utopia

> [Utopia](utopia.fyi) for UnoCSS

If you aren't sure what Utopia is or what it is, check out [utopia.fyi](utopia.fyi), and the [type](https://utopia.fyi/type/calculator) and [space](https://utopia.fyi/space/calculator) calculators in particular.

This preset provides rules to easily use Utopia fluid values in utility classes.

## Installation

```bash
npm i unocss-preset-utopia -D # with npm
yarn add unocss-preset-utopia -D # with yarn
pnpm add unocss-preset-utopia -D # with pnpm
```

```typescript
// unocss.config.js
import { presetUno, defineConfig } from 'unocss'
import { presetUtopia } from 'unocss-preset-utopia'

export default defineConfig({
  presets: [
    presetUno(),
    presetUtopia({ /** options */}),
  ],
})
```

## Docs/Demo

You can find a demo of how to use the available preset rules [here](https://unocss-preset-utopia.netlify.app).

## Preset options

```typescript
interface PresetUtopiaOptions {
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
```
The preset options correlate to the values used in the Utopia 'type' and 'space' calculators. The preset uses shared `minWidth`, `maxWidth`, `minSize`, and `maxSize` values for both 'type' and 'space' calculations. 

If you aren't using `@unocss/preset-mini` or a preset that extends it, make sure to set the 
`usesPresetMini` option to `false`.
