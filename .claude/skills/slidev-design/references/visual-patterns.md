# ビジュアルパターン

`card-patterns.md` に加えて、より複雑なビジュアル要素のパターン集。

## ステップフロー（縦）

番号付きステップを縦に並べる。最後のステップはコネクター線なし:

```html
<div class="space-y-0">
  <div v-click v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0 }"
       class="flex gap-4">
    <div class="flex flex-col items-center">
      <div class="w-9 h-9 rounded-full bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center text-blue-400 font-bold font-mono text-xs shrink-0">01</div>
      <div class="w-0.5 h-8 bg-gray-700"></div>
    </div>
    <div class="pb-6">
      <div class="font-bold text-white text-sm mb-1">ステップ名</div>
      <div class="text-gray-400 text-sm">説明テキスト</div>
    </div>
  </div>
  <div v-click v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0 }"
       class="flex gap-4">
    <div class="flex flex-col items-center">
      <div class="w-9 h-9 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center text-green-400 font-bold font-mono text-xs shrink-0">02</div>
    </div>
    <div>
      <div class="font-bold text-white text-sm mb-1">ステップ名</div>
      <div class="text-gray-400 text-sm">説明テキスト</div>
    </div>
  </div>
</div>
```

## ステップフロー（横）

```html
<div class="flex items-start justify-center gap-0">
  <div v-click v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }"
       class="flex flex-col items-center gap-2 w-32">
    <div class="w-12 h-12 rounded-full bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center text-blue-400 font-bold font-mono text-sm">01</div>
    <div class="text-center text-xs text-white font-bold">ステップ名</div>
    <div class="text-center text-xs text-gray-500">説明</div>
  </div>
  <div class="text-gray-700 mt-4 font-mono text-xl px-2">→</div>
  <div v-click v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }"
       class="flex flex-col items-center gap-2 w-32">
    <div class="w-12 h-12 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center text-green-400 font-bold font-mono text-sm">02</div>
    <div class="text-center text-xs text-white font-bold">ステップ名</div>
    <div class="text-center text-xs text-gray-500">説明</div>
  </div>
</div>
```

## アーキテクチャ図（ボックス＋矢印）

```html
<div class="flex items-center justify-center gap-3 flex-wrap">
  <div v-click class="px-4 py-3 bg-blue-950/30 border border-blue-500/50 rounded-lg text-center min-w-24">
    <div class="text-xs text-blue-500 font-mono mb-1">// Client</div>
    <div class="text-blue-300 font-bold text-sm">Browser</div>
  </div>
  <div v-click class="text-gray-600 font-mono text-lg">──▶</div>
  <div v-click class="px-4 py-3 bg-green-950/30 border border-green-500/50 rounded-lg text-center min-w-24">
    <div class="text-xs text-green-500 font-mono mb-1">// API</div>
    <div class="text-green-300 font-bold text-sm">Server</div>
  </div>
  <div v-click class="text-gray-600 font-mono text-lg">──▶</div>
  <div v-click class="px-4 py-3 bg-purple-950/30 border border-purple-500/50 rounded-lg text-center min-w-24">
    <div class="text-xs text-purple-500 font-mono mb-1">// Data</div>
    <div class="text-purple-300 font-bold text-sm">Database</div>
  </div>
</div>
```

縦並びの場合は `flex-col` + `↓` で同様に構成できる。

## 3列比較テーブル

```html
<div class="border border-gray-700 rounded-lg overflow-hidden">
  <div class="grid grid-cols-3">
    <div class="bg-gray-800 p-3 text-center text-gray-400 text-xs font-mono border-b border-gray-700">機能</div>
    <div class="bg-gray-800 p-3 text-center text-blue-400 text-xs font-mono border-b border-l border-gray-700">Option A</div>
    <div class="bg-green-950/30 p-3 text-center text-green-400 text-xs font-mono border-b border-l border-gray-700">Option B ★</div>
  </div>
  <div class="grid grid-cols-3">
    <div class="p-3 text-gray-300 text-sm border-b border-gray-800">性能</div>
    <div class="p-3 text-center border-b border-l border-gray-800 text-yellow-400">△</div>
    <div class="p-3 text-center border-b border-l border-gray-800 bg-green-950/10 text-green-400">◎</div>
  </div>
  <div class="grid grid-cols-3">
    <div class="p-3 text-gray-300 text-sm">コスト</div>
    <div class="p-3 text-center border-l border-gray-800 text-green-400">◎</div>
    <div class="p-3 text-center border-l border-gray-800 bg-green-950/10 text-yellow-400">△</div>
  </div>
</div>
```

## コールアウトボックス

### Info（補足情報）
```html
<div class="flex gap-3 p-4 bg-blue-950/20 border border-blue-500/40 rounded-lg">
  <div class="text-blue-400 text-lg mt-0.5 shrink-0">ℹ</div>
  <div>
    <div class="text-blue-300 font-bold text-sm mb-1">INFO</div>
    <div class="text-gray-300 text-sm">補足情報テキスト</div>
  </div>
</div>
```

### Tip（ヒント）
```html
<div class="flex gap-3 p-4 bg-green-950/20 border border-green-500/40 rounded-lg">
  <div class="text-green-400 text-lg mt-0.5 shrink-0">✓</div>
  <div>
    <div class="text-green-300 font-bold text-sm mb-1">TIP</div>
    <div class="text-gray-300 text-sm">ヒントテキスト</div>
  </div>
</div>
```

### Warning（注意）
```html
<div class="flex gap-3 p-4 bg-yellow-950/20 border border-yellow-500/40 rounded-lg">
  <div class="text-yellow-400 text-lg mt-0.5 shrink-0">⚠</div>
  <div>
    <div class="text-yellow-300 font-bold text-sm mb-1">WARNING</div>
    <div class="text-gray-300 text-sm">注意事項テキスト</div>
  </div>
</div>
```

### NG（やってはいけない）
```html
<div class="flex gap-3 p-4 bg-red-950/20 border border-red-500/40 rounded-lg">
  <div class="text-red-400 text-lg mt-0.5 shrink-0">✗</div>
  <div>
    <div class="text-red-300 font-bold text-sm mb-1">NG</div>
    <div class="text-gray-300 text-sm">してはいけないことの説明</div>
  </div>
</div>
```

## 数値ハイライト

大きな数字で実績・効果を印象的に表示:

```html
<div class="flex gap-12 justify-center">
  <div v-click class="text-center">
    <div class="text-6xl font-black text-green-400 font-mono">99%</div>
    <div class="text-gray-500 text-sm font-mono mt-1">// 削減</div>
    <div class="text-gray-300 text-sm mt-1">ビルド時間</div>
  </div>
  <div v-click class="text-center">
    <div class="text-6xl font-black text-blue-400 font-mono">10x</div>
    <div class="text-gray-500 text-sm font-mono mt-1">// 高速化</div>
    <div class="text-gray-300 text-sm mt-1">開発速度</div>
  </div>
  <div v-click class="text-center">
    <div class="text-6xl font-black text-purple-400 font-mono">0</div>
    <div class="text-gray-500 text-sm font-mono mt-1">// 件</div>
    <div class="text-gray-300 text-sm mt-1">本番バグ</div>
  </div>
</div>
```

## アイコングリッド

```html
<div class="grid grid-cols-4 gap-3">
  <div v-click v-motion :initial="{ opacity: 0, scale: 0.8 }" :enter="{ opacity: 1, scale: 1 }"
       class="flex flex-col items-center gap-2 p-4 bg-gray-900/50 border border-gray-700 rounded-lg">
    <div class="text-3xl">⚡</div>
    <div class="text-white text-xs font-bold text-center">高速</div>
    <div class="text-gray-500 text-xs text-center">説明</div>
  </div>
  <!-- 同パターンを繰り返す -->
</div>
```

## セクションブレイクスライド

```
---
hideInToc: true
---
```

```html
<div class="h-full flex items-center justify-center">
  <div>
    <div class="text-gray-600 font-mono text-sm mb-3">// 01</div>
    <div class="text-5xl font-black text-white leading-tight">セクション名</div>
    <div class="w-16 h-1 bg-green-500 mt-4 rounded"></div>
    <div class="text-gray-500 text-base mt-3">サブタイトル（任意）</div>
  </div>
</div>
```

セクション番号は `01`, `02`, `03` と増やす。

## コード＋解説の2カラム

```html
<div class="grid grid-cols-2 gap-6 items-start">
  <div>
    <div class="text-gray-500 font-mono text-xs mb-2">// コード</div>
    <div class="bg-gray-900 border border-gray-700 rounded p-4 font-mono text-sm leading-relaxed">
      <div><span class="text-purple-400">const</span> <span class="text-cyan-300">result</span> = <span class="text-yellow-300">fn</span>()</div>
    </div>
  </div>
  <div class="space-y-3">
    <div v-click class="flex gap-3 items-start">
      <span class="text-green-400 font-mono text-sm mt-0.5 shrink-0">▶</span>
      <div>
        <div class="text-white font-bold text-sm">ポイント1</div>
        <div class="text-gray-400 text-xs">説明</div>
      </div>
    </div>
    <!-- 同パターンを繰り返す -->
  </div>
</div>
```
