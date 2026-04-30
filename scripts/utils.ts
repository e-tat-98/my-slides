import { readdirSync, existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

export interface SlideEntry {
  name: string
  title: string
}

// slides/ を動的スキャン
export function getSlides(slidesDir: string): SlideEntry[] {
  return readdirSync(slidesDir, { withFileTypes: true })
    .filter(d => d.isDirectory() && existsSync(join(slidesDir, d.name, 'slides.md')))
    .map(d => {
      const name = d.name
      const md = readFileSync(join(slidesDir, name, 'slides.md'), 'utf-8')
      const title = md.match(/^title:\s*(.+)$/m)?.[1]?.trim() ?? name

      return { name, title }
    }
  )
}
