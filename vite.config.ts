import { defineConfig } from 'vite'

let basePath = ''

export default defineConfig({
  plugins: [
    {
      name: 'fix-presenter-image',
      apply: 'build',
      enforce: 'pre',
      configResolved(config) {
        const base = config.base.replace(/\/$/, '')
        basePath = base
      },
      transform(code, id) {
        if (id.includes('.md') && code.includes('/my-pic.jpg')) {
          const base = basePath || ''

          const target = '/my-pic.jpg'
          const replacement = `${base}/my-pic.jpg`.replace(/\/+/g, '/')

          console.info(`\n[BUILD] Replacing ${target} -> ${replacement} in ${id}`)

          return {
            code: code.replaceAll(target, replacement),
            map: null
          }
        }
      }
    }
  ]
})
