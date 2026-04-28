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
        if (id.includes('.md') && code.includes('presenterImage')) {
          const base = basePath || ''

          const regex = /((["']?)presenterImage\2)\s*:\s*(["'])\/?(.*?)\3/g
          const newCode = code.replace(regex, (match, keyFull, keyQuote, valueQuote, path) => {
            const cleanedPath = `/${base}/${path}`.replace(/\/+/g, '/')
            return `${keyFull}: ${valueQuote}${cleanedPath}${valueQuote}`
          })

          return {
            code: newCode,
            map: null
          }
        }
      }
    }
  ]
})
