import { defineConfig } from 'vite'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

export default defineConfig({
  base: '/my-slides/',
  plugins: [
    {
      name: 'multi-spa-preview',
      configurePreviewServer(server) {
        server.middlewares.use((req, res, next) => {
          const urlPath = (req.url ?? '/').split('?')[0]
          const withoutBase = urlPath.replace(/^\/my-slides/, '') || '/'
          const segments = withoutBase.split('/').filter(Boolean)
          const lastSegment = segments.at(-1) ?? ''

          // ファイル拡張子がない = SPAルート → 対応する index.html を返す
          if (segments.length >= 1 && !lastSegment.includes('.')) {
            const spaIndex = resolve('dist', segments[0], 'index.html')
            if (existsSync(spaIndex)) {
              res.setHeader('Content-Type', 'text/html; charset=utf-8')
              res.end(readFileSync(spaIndex))
              return
            }
          }

          next()
        })
      }
    }
  ]
})
