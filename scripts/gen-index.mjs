import { readdirSync, existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { execFileSync } from 'node:child_process'

const root = process.cwd()
const slidesDir = join(root, 'slides')
const dist = join(root, 'dist')
mkdirSync(dist, { recursive: true })

// 1. slides/ を動的スキャン
const slides = readdirSync(slidesDir, { withFileTypes: true })
  .filter(d => d.isDirectory() && existsSync(join(slidesDir, d.name, 'slides.md')))
  .map(d => {
    const name = d.name
    const md = readFileSync(join(slidesDir, name, 'slides.md'), 'utf-8')
    const title = md.match(/^title:\s*(.+)$/m)?.[1]?.trim() ?? name
    return { name, title }
  })

// 2. サムネイル生成（slidev export --format png --range 1）
for (const { name } of slides) {
  const outDir = join(dist, name)
  mkdirSync(outDir, { recursive: true })
  // すでにサムネイルがある場合はスキップ
  if (existsSync(join(outDir, 'thumbnail.png'))) {
    console.log(`Thumbnail exists, skipping: ${name}`)
    continue
  }
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

// 3. サムネイルのファイル名を解決
function thumbnailSrc(name) {
  if (existsSync(join(dist, name, 'thumbnail'))) return `./${name}/thumbnail/1.png`
  return null
}

// 4. dist/index.html 生成
const cards = slides.map(({ name, title }) => {
  const src = thumbnailSrc(name)
  const img = src
    ? `<img src="${src}" alt="${title}" loading="lazy" />`
    : `<div class="placeholder"></div>`
  return `    <a href="/my-slides/${name}/" class="card">\n      ${img}\n      <span>${title}</span>\n    </a>`
}).join('\n')

writeFileSync(join(dist, 'index.html'), `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>my-slides</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    body { font-family: sans-serif; max-width: 960px; margin: 4rem auto; padding: 0 1.5rem; }
    h1 { font-size: 1.5rem; margin-bottom: 1.5rem; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1.5rem; }
    .card { display: block; border-radius: 10px; overflow: hidden; text-decoration: none; color: inherit; border: 1px solid #e5e7eb; transition: box-shadow .2s, transform .2s; }
    .card:hover { box-shadow: 0 4px 24px rgba(0,0,0,.12); transform: translateY(-2px); }
    .card img, .placeholder { width: 100%; display: block; aspect-ratio: 16/9; background: #f3f4f6; object-fit: cover; }
    .card span { display: block; padding: .6rem .875rem; font-size: .9rem; font-weight: 500; }
  </style>
</head>
<body>
  <h1>Slides</h1>
  <div class="grid">
${cards}
  </div>
</body>
</html>
`)
console.log(`Generated dist/index.html (${slides.length} slide(s))`)
