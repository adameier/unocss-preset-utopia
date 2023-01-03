import { presetTypography, presetUno } from 'unocss'
import unocss from 'unocss/vite'
import { defineConfig } from 'vite'
import { presetUtopia } from './src'

export default defineConfig(({ mode }) => ({
  plugins: [
    unocss({
      presets: [
        presetUno(),
        presetTypography(),
        presetUtopia(),
      ],
    }),
  ],
}))
