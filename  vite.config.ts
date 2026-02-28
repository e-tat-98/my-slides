import { defineConfig } from 'vite'
import svgLoader from 'vite-svg-loader'

export default defineConfig({
  base: '/my-slides/',
  plugins: [
    svgLoader(),
  ],
})
