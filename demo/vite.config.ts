import { presetTypography, presetUno } from 'unocss'
import { presetUtopia } from 'unocss-preset-utopia'
import unocss from 'unocss/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
    unocss({
      presets: [
        presetUno(),
        presetTypography(),
        presetUtopia({}),
      ],
      safelist: [
        ...[-2, -1, 0, 1, 2, 3, 4, 5, 6, 7, -0.5, 3.14159].map(i => `text-fluid-${i}`),
      ],
    }),
  ],
  build: {
    minify: true,
  },
})
