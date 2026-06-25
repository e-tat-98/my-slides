---
theme: seriph
title: "JSの動的型付けという名の混沌"
info: |
  JSの動的型付けによる奇妙な言語仕様と、TypeScriptが救ってくれる話。
transition: view-transition
colorSchema: dark
fonts:
  sans: 'Roboto'
  serif: 'Roboto Slab'
  mono: 'Fira Code'
themeConfig:
  primary: 'rgb(187, 255, 204, 1)'
hideInToc: true
meta:
  slug: lt-2026-06-js-weird-typing
  date: '2026-06'
  description: "JSの動的型付けによる奇妙な言語仕様、そしてTypeScriptへ"
  published: true
  tags:
    - JavaScript
    - TypeScript
    - LT
---

<div class="h-full w-full flex items-center justify-center p-8">
  <div class="text-center">
    <div
      v-motion
      :initial="{ opacity: 0, scale: 0.5 }"
      :enter="{ opacity: 1, scale: 1, transition: { delay: 0, type: 'spring', stiffness: 200, damping: 15 } }"
      class="flex items-center justify-center gap-4 mb-6"
    >
      <logos-javascript class="text-7xl" />
      <div class="text-4xl text-gray-600 font-mono">→ ?</div>
    </div>
    <div
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }"
      class="text-5xl font-black tracking-tight text-white mb-3 leading-tight"
    >
      JSの動的型付けという名の<br><span class="text-red-400">混沌</span>
    </div>
    <div
      v-motion
      :initial="{ opacity: 0 }"
      :enter="{ opacity: 1, transition: { delay: 400 } }"
      class="text-xl font-bold text-gray-400 mb-7"
    >
      …そして <span class="text-blue-400">TypeScript</span> という希望
    </div>
    <div
      v-motion
      :initial="{ opacity: 0, y: 10 }"
      :enter="{ opacity: 1, y: 0, transition: { delay: 600 } }"
      class="flex items-center justify-center gap-3"
    >
      <span class="px-3 py-1 bg-yellow-500/20 border border-yellow-500 text-yellow-400 text-sm font-mono">JavaScript</span>
      <span class="px-3 py-1 bg-blue-500/20 border border-blue-500 text-blue-400 text-sm font-mono">TypeScript</span>
      <span class="px-3 py-1 bg-gray-500/20 border border-gray-500 text-gray-400 text-sm font-mono">LT 5min</span>
    </div>
  </div>
</div>

---
title: "== という魔界"
---

<div class="h-full flex items-center justify-center px-10">
  <div class="w-full max-w-3xl">
    <h1 class="text-3xl font-bold mb-2 font-mono">
      <span class="text-gray-500">//</span> JS の <code class="text-yellow-300 bg-gray-800 px-2 py-0.5 rounded">==</code>
      <span class="text-gray-400 text-xl">— 緩い比較の恐怖</span>
    </h1>
    <div class="text-gray-500 text-sm font-mono mb-6">何が出力されるでしょう？クリックして確認を</div>
    <div class="space-y-3">
      <div class="flex items-center gap-4">
        <div class="flex-1 bg-gray-900 border border-gray-700 rounded p-3 font-mono text-sm">
          <span class="text-cyan-300">console</span>.<span class="text-yellow-300">log</span>(<span class="text-orange-300">0</span><span class="text-purple-400"> == </span><span class="text-purple-400">false</span>)
        </div>
        <div class="text-gray-600 font-mono w-6 text-center">→</div>
        <div v-click v-motion :initial="{ opacity: 0, x: 12 }" :enter="{ opacity: 1, x: 0 }" class="w-36 text-center px-3 py-2 bg-red-950/30 border border-red-500/50 rounded font-mono text-red-300 text-sm">true 😱</div>
      </div>
      <div class="flex items-center gap-4">
        <div class="flex-1 bg-gray-900 border border-gray-700 rounded p-3 font-mono text-sm">
          <span class="text-cyan-300">console</span>.<span class="text-yellow-300">log</span>(<span class="text-yellow-300">""</span><span class="text-purple-400"> == </span><span class="text-purple-400">false</span>)
        </div>
        <div class="text-gray-600 font-mono w-6 text-center">→</div>
        <div v-click v-motion :initial="{ opacity: 0, x: 12 }" :enter="{ opacity: 1, x: 0 }" class="w-36 text-center px-3 py-2 bg-red-950/30 border border-red-500/50 rounded font-mono text-red-300 text-sm">true 😱</div>
      </div>
      <div class="flex items-center gap-4">
        <div class="flex-1 bg-gray-900 border border-gray-700 rounded p-3 font-mono text-sm">
          <span class="text-cyan-300">console</span>.<span class="text-yellow-300">log</span>(<span class="text-purple-400">null</span><span class="text-purple-400"> == </span><span class="text-purple-400">undefined</span>)
        </div>
        <div class="text-gray-600 font-mono w-6 text-center">→</div>
        <div v-click v-motion :initial="{ opacity: 0, x: 12 }" :enter="{ opacity: 1, x: 0 }" class="w-36 text-center px-3 py-2 bg-red-950/30 border border-red-500/50 rounded font-mono text-red-300 text-sm">true 😱</div>
      </div>
      <div class="flex items-center gap-4">
        <div class="flex-1 bg-gray-900 border border-gray-700 rounded p-3 font-mono text-sm">
          <span class="text-cyan-300">console</span>.<span class="text-yellow-300">log</span>(<span class="text-purple-400">null</span><span class="text-purple-400"> == </span><span class="text-purple-400">false</span>)
        </div>
        <div class="text-gray-600 font-mono w-6 text-center">→</div>
        <div v-click v-motion :initial="{ opacity: 0, x: 12 }" :enter="{ opacity: 1, x: 0 }" class="w-36 text-center px-3 py-2 bg-yellow-950/30 border border-yellow-500/50 rounded font-mono text-yellow-300 text-sm">false 🤔</div>
      </div>
    </div>
    <div v-click v-motion :initial="{ opacity: 0, y: 10 }" :enter="{ opacity: 1, y: 0 }" class="mt-5 flex gap-3 p-3 bg-red-950/20 border border-red-500/40 rounded-lg">
      <div class="text-red-400 shrink-0 mt-0.5">⚠</div>
      <div class="text-gray-300 text-sm">
        <code class="text-yellow-300">==</code> は型変換してから比較する。<code class="text-purple-400">null</code> と <code class="text-purple-400">undefined</code> だけは特別扱いで <code class="text-yellow-300">false</code> と等しくない。一貫性はない。<strong class="text-white">常に <code class="text-green-400">===</code> を使え。</strong>
      </div>
    </div>
  </div>
</div>

---
title: "型強制という名の闇"
---

<div class="h-full flex items-center justify-center px-10">
  <div class="w-full max-w-3xl">
    <h1 class="text-3xl font-bold mb-2 font-mono">
      <span class="text-gray-500">//</span> 型強制 <span class="text-gray-400 text-xl">— JSが勝手に型を変える</span>
    </h1>
    <div class="text-gray-500 text-sm font-mono mb-5"><code class="text-yellow-300">+</code> 演算子ひとつで世界が変わる</div>
    <div class="grid grid-cols-2 gap-5">
      <div class="space-y-2">
        <div class="text-gray-600 font-mono text-xs mb-2">// 文字列の + は文字列結合</div>
        <div v-click v-motion :initial="{ opacity: 0, x: -15 }" :enter="{ opacity: 1, x: 0 }" class="bg-gray-900 border border-gray-700 rounded p-3 font-mono text-sm">
          <span class="text-yellow-300">"5"</span> + <span class="text-orange-300">3</span><span class="text-gray-600 mx-2">→</span><span class="text-red-400">"53"</span><span class="text-gray-600 text-xs ml-1">💀</span>
        </div>
        <div v-click v-motion :initial="{ opacity: 0, x: -15 }" :enter="{ opacity: 1, x: 0 }" class="bg-gray-900 border border-gray-700 rounded p-3 font-mono text-sm">
          <span class="text-orange-300">1</span> + <span class="text-yellow-300">"2"</span><span class="text-gray-600 mx-2">→</span><span class="text-red-400">"12"</span><span class="text-gray-600 text-xs ml-1">💀</span>
        </div>
        <div v-click v-motion :initial="{ opacity: 0, x: -15 }" :enter="{ opacity: 1, x: 0 }" class="bg-gray-900 border border-gray-700 rounded p-3 font-mono text-sm">
          [] + []<span class="text-gray-600 mx-2">→</span><span class="text-red-400">""</span><span class="text-gray-600 text-xs ml-1">（空文字列）</span>
        </div>
        <div v-click v-motion :initial="{ opacity: 0, x: -15 }" :enter="{ opacity: 1, x: 0 }" class="bg-gray-900 border border-gray-700 rounded p-3 font-mono text-sm">
          [] + {}<span class="text-gray-600 mx-2">→</span><span class="text-red-400 text-xs">"[object Object]"</span>
        </div>
      </div>
      <div class="space-y-2">
        <div class="text-gray-600 font-mono text-xs mb-2">// - は数値に強制変換する</div>
        <div v-click v-motion :initial="{ opacity: 0, x: 15 }" :enter="{ opacity: 1, x: 0 }" class="bg-gray-900 border border-gray-700 rounded p-3 font-mono text-sm">
          <span class="text-yellow-300">"5"</span> - <span class="text-orange-300">3</span><span class="text-gray-600 mx-2">→</span><span class="text-green-400">2</span><span class="text-gray-600 text-xs ml-1">（数値になった）</span>
        </div>
        <div v-click v-motion :initial="{ opacity: 0, x: 15 }" :enter="{ opacity: 1, x: 0 }" class="bg-gray-900 border border-gray-700 rounded p-3 font-mono text-sm">
          {} + []<span class="text-gray-600 mx-2">→</span><span class="text-red-400">0</span><span class="text-gray-600 text-xs ml-1">（なぜ…）</span>
        </div>
        <div v-click v-motion :initial="{ opacity: 0, x: 15 }" :enter="{ opacity: 1, x: 0 }" class="bg-gray-900 border border-gray-700 rounded p-3 font-mono text-sm">
          <span class="text-purple-400">true</span> + <span class="text-purple-400">true</span><span class="text-gray-600 mx-2">→</span><span class="text-red-400">2</span><span class="text-gray-600 text-xs ml-1">（bool+bool=数値）</span>
        </div>
        <div v-click v-motion :initial="{ opacity: 0, x: 15 }" :enter="{ opacity: 1, x: 0 }" class="bg-gray-900 border border-gray-700 rounded p-3 font-mono text-sm">
          <span class="text-purple-400">true</span> + <span class="text-purple-400">false</span><span class="text-gray-600 mx-2">→</span><span class="text-red-400">1</span><span class="text-gray-600 text-xs ml-1">（1 + 0 = 1）</span>
        </div>
      </div>
    </div>
  </div>
</div>

---
title: "typeof の嘘と NaN という矛盾"
---

<div class="h-full flex items-center justify-center px-10">
  <div class="w-full max-w-3xl">
    <h1 class="text-3xl font-bold mb-2 font-mono">
      <span class="text-gray-500">//</span> typeof の嘘 <span class="text-gray-400 text-xl">— 信じるな</span>
    </h1>
    <div class="text-gray-500 text-sm font-mono mb-5">型を調べようとしたら…</div>
    <div class="space-y-2 mb-5">
      <div v-click v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0 }" class="flex items-center gap-3 bg-gray-900 border border-gray-700 rounded p-3 font-mono text-sm">
        <div class="flex-1"><span class="text-purple-400">typeof</span> <span class="text-purple-400">null</span></div>
        <div class="text-gray-600 w-6">→</div>
        <div class="flex items-center gap-2">
          <span class="text-yellow-300">"object"</span><span class="text-red-400 text-xs px-2 py-0.5 bg-red-950/50 rounded font-sans">歴史的バグ</span>
        </div>
      </div>
      <div v-click v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0 }" class="flex items-center gap-3 bg-gray-900 border border-gray-700 rounded p-3 font-mono text-sm">
        <div class="flex-1"><span class="text-purple-400">typeof</span> []</div>
        <div class="text-gray-600 w-6">→</div>
        <div class="flex items-center gap-2">
          <span class="text-yellow-300">"object"</span><span class="text-gray-500 text-xs font-sans">配列も object 扱い</span>
        </div>
      </div>
      <div v-click v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0 }" class="flex items-center gap-3 bg-gray-900 border border-gray-700 rounded p-3 font-mono text-sm">
        <div class="flex-1"><span class="text-purple-400">typeof</span> <span class="text-cyan-300">NaN</span></div>
        <div class="text-gray-600 w-6">→</div>
        <div class="flex items-center gap-2">
          <span class="text-yellow-300">"number"</span><span class="text-gray-500 text-xs font-sans">Not a Number なのに number 型</span>
        </div>
      </div>
      <div v-click v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0 }" class="flex items-center gap-3 bg-red-950/20 border border-red-500/50 rounded p-3 font-mono text-sm">
        <div class="flex-1"><span class="text-cyan-300">NaN</span><span class="text-purple-400"> === </span><span class="text-cyan-300">NaN</span></div>
        <div class="text-gray-600 w-6">→</div>
        <div class="flex items-center gap-2">
          <span class="text-purple-400">false</span><span class="text-red-400 text-xs px-2 py-0.5 bg-red-950/50 rounded font-sans">自分自身と等しくない！</span>
        </div>
      </div>
    </div>
    <div v-click v-motion :initial="{ opacity: 0, y: 10 }" :enter="{ opacity: 1, y: 0 }" class="flex gap-3 p-4 bg-yellow-950/20 border border-yellow-500/40 rounded-lg">
      <div class="text-yellow-400 shrink-0 mt-0.5">⚠</div>
      <div class="text-gray-300 text-sm">
        <code class="text-yellow-300">typeof null === "object"</code> は 1995年の実装バグ。後方互換性のため <strong class="text-white">永遠に直せない</strong> 負債として残り続けている。これが JavaScript という言語の現実。
      </div>
    </div>
  </div>
</div>

---
title: "TypeScript という救世主"
---

<div class="h-full flex items-center justify-center px-8">
  <div class="w-full max-w-5xl">
    <h1 class="text-3xl font-bold mb-2 font-mono">
      <span class="text-gray-500">//</span> TypeScript が救ってくれる
    </h1>
    <div class="text-gray-500 text-sm font-mono mb-5">同じ関数を TypeScript で書くと…</div>
    <div class="grid grid-cols-2 gap-5">
      <div v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0 }">
        <div class="text-sm text-red-400 font-mono mb-2">--- a/utils.js</div>
        <div class="bg-red-950/20 border-l-2 border-red-500 p-4 rounded-r font-mono text-sm leading-loose">
          <div class="text-gray-600 text-xs mb-2">// 型なし → 何でも通る</div>
          <div><span class="text-purple-400">function</span><span class="text-yellow-300"> add</span>(<span class="text-cyan-300">a</span>, <span class="text-cyan-300">b</span>) {</div>
          <div class="pl-4"><span class="text-purple-400">return</span><span class="text-cyan-300"> a</span> + <span class="text-cyan-300">b</span></div>
          <div>}</div>
          <div class="mt-3 text-gray-600 text-xs">// 全部通る 😱</div>
          <div><span class="text-yellow-300">add</span>(<span class="text-orange-300">1</span>, <span class="text-orange-300">2</span>)<span class="text-gray-600">         // 3 ✓</span></div>
          <div><span class="text-yellow-300">add</span>(<span class="text-yellow-300">"1"</span>, <span class="text-orange-300">2</span>)<span class="text-red-400">       // "12" 💀</span></div>
          <div><span class="text-yellow-300">add</span>(<span class="text-purple-400">null</span>, <span class="text-orange-300">1</span>)<span class="text-red-400">      // 1 💀</span></div>
          <div><span class="text-yellow-300">add</span>(<span class="text-purple-400">undefined</span>, <span class="text-orange-300">1</span>)<span class="text-red-400">  // NaN 💀</span></div>
        </div>
      </div>
      <div v-motion :initial="{ opacity: 0, x: 20 }" :enter="{ opacity: 1, x: 0, transition: { delay: 150 } }">
        <div class="text-sm text-green-400 font-mono mb-2">+++ b/utils.ts</div>
        <div class="bg-green-950/20 border-l-2 border-green-500 p-4 rounded-r font-mono text-sm leading-loose">
          <div class="text-gray-600 text-xs mb-2">// 型を明示 → コンパイル時に検出</div>
          <div><span class="text-purple-400">function</span><span class="text-yellow-300"> add</span>(</div>
          <div class="pl-4"><span class="text-cyan-300">a</span>: <span class="text-blue-300">number</span>,</div>
          <div class="pl-4"><span class="text-cyan-300">b</span>: <span class="text-blue-300">number</span></div>
          <div>): <span class="text-blue-300">number</span> {</div>
          <div class="pl-4"><span class="text-purple-400">return</span><span class="text-cyan-300"> a</span> + <span class="text-cyan-300">b</span></div>
          <div>}</div>
          <div class="mt-3">
            <div v-click class="text-red-400 text-xs leading-relaxed mb-1">// ❌ Argument of type 'string' is not<br>//    assignable to parameter of type 'number'</div>
            <div><span class="text-yellow-300">add</span>(<span v-mark.circle.red="2" class="text-yellow-300">"1"</span>, <span class="text-orange-300">2</span>)</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

---
hideInToc: true
---

<div class="h-full flex items-center justify-center px-12">
  <div class="w-full max-w-2xl">
    <h1 class="text-3xl font-bold mb-1 font-mono">
      <span class="text-gray-500">//</span> まとめ
    </h1>
    <div class="text-blue-400 font-black text-2xl mb-8">だから TypeScript は素晴らしい！</div>
    <div class="flex gap-5 mb-10">
      <div v-click v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0 }" class="flex-1 border-l-2 border-green-500 pl-4 py-3">
        <div class="text-green-400 text-xs font-mono mb-1">// 01</div>
        <div class="text-base font-bold text-white mb-1">バグをコンパイル時に検出</div>
        <div class="text-gray-500 text-sm">型エラーは実行前に発覚。本番障害を防ぐ。</div>
      </div>
      <div v-click v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0, transition: { delay: 100 } }" class="flex-1 border-l-2 border-blue-500 pl-4 py-3">
        <div class="text-blue-400 text-xs font-mono mb-1">// 02</div>
        <div class="text-base font-bold text-white mb-1">IDE 補完が神になる</div>
        <div class="text-gray-500 text-sm">型情報で補完・リファクタリングが超強力に。</div>
      </div>
      <div v-click v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0, transition: { delay: 200 } }" class="flex-1 border-l-2 border-purple-500 pl-4 py-3">
        <div class="text-purple-400 text-xs font-mono mb-1">// 03</div>
        <div class="text-base font-bold text-white mb-1">コードが自己文書化</div>
        <div class="text-gray-500 text-sm">型が仕様書になる。コメントなしでも意図が伝わる。</div>
      </div>
    </div>
    <div v-click v-motion :initial="{ opacity: 0, y: 15 }" :enter="{ opacity: 1, y: 0, transition: { delay: 400 } }" class="text-center p-6 bg-blue-950/20 border border-blue-500/40 rounded-xl">
      <div class="text-3xl font-black text-white leading-snug">JSの混沌を乗り越えたいなら、<br><span class="text-blue-400">TypeScript</span> を使え。</div>
      <div class="text-gray-600 font-mono text-sm mt-3">// これが結論</div>
    </div>
  </div>
</div>

---
layout: center
hideInToc: true
---

<h1 class="font-mono"><span class="text-gray-500">//</span> END</h1>
