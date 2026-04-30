import { existsSync, mkdirSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join } from 'node:path'
import { getSlides, SlideEntry } from './utils'

const root = process.cwd()
const slidesDir = join(root, 'slides')
const dist = join(root, 'dist')
mkdirSync(dist, { recursive: true })

// 1. slides/ 配下のスライド情報を取得
const slides: SlideEntry[] = getSlides(slidesDir)

// 2.サムネイル生成（slidev export --format png --range 1）
for (const { name } of slides) {
  const outDir = join(dist, name)
  mkdirSync(outDir, { recursive: true })
  console.log(`Generating thumbnail: ${name}`)

  try {
    execFileSync(
      'pnpm',
      ['exec', 'slidev', 'export', 'slides.md', '--format', 'png', '--range', '1', '--output', join(outDir, 'thumbnail')],
      { cwd: join(slidesDir, name), stdio: 'inherit' }
    )
  } catch {
    console.warn(`Warning: thumbnail generation failed for ${name} (playwright not available?), using placeholder`)
  }
}
