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
  build: {
    minify: mode === 'demo',
    lib:
      mode === 'demo'
        ? false
        : {
            entry: './src/index.ts',
            formats: ['es'],
            fileName: () => 'index.js',
          },
    rollupOptions: {
      external: ['unocss'],
    },
  },
}))
