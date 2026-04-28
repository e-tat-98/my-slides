import { writeFileSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'

const dist = resolve(process.cwd(), 'dist')
mkdirSync(dist, { recursive: true })

writeFileSync(resolve(dist, 'index.html'), `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>my-slides</title>
  <style>
    body { font-family: sans-serif; max-width: 600px; margin: 4rem auto; padding: 0 1rem; }
    h1 { font-size: 1.5rem; }
    ul { list-style: none; padding: 0; }
    li { margin: 0.75rem 0; }
    a { color: #3b82f6; font-size: 1.1rem; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <h1>Slides</h1>
  <ul>
    <li><a href="/my-slides/self-intro/">self-intro</a></li>
    <li><a href="/my-slides/hello/">hello</a></li>
  </ul>
</body>
</html>
`)

console.log('Generated dist/index.html')
