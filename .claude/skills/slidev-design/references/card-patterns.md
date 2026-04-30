# カードパターン

## 基本カード

```html
<div class="p-4 bg-gray-900/50 border border-gray-700 rounded">...</div>
```

## アクセントカード

色: green / red / blue / purple / yellow / cyan / orange

```html
<div class="p-4 bg-green-950/20 border border-green-500/30 rounded-lg">
  <div class="text-xs text-green-500 font-mono mb-1">// ラベル</div>
  <div class="text-base text-gray-300">内容</div>
</div>
```

## 左ボーダーカード（まとめ向き）

3カラム横並びで使用:

```html
<div class="flex gap-6">
  <div class="flex-1 border-l-2 border-green-500 pl-4 py-3">
    <div class="text-green-400 text-xs font-mono mb-1">// LABEL</div>
    <div class="text-lg font-bold text-white mb-1">見出し</div>
    <div class="text-gray-500 text-sm">説明</div>
  </div>
  <!-- 2つ目、3つ目も同様 -->
</div>
```

## リストカード

アイテムを縦に並べる:

```html
<div class="space-y-3">
  <div v-click v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0 }"
       class="flex items-center gap-4 p-3 bg-gray-900/50 border border-gray-700 rounded">
    <div class="text-2xl w-12 text-center font-bold text-yellow-400">M</div>
    <div class="flex-1">
      <div class="font-bold text-white">タイトル</div>
      <div class="text-xs text-gray-500">補足</div>
    </div>
    <div class="text-red-400 text-xs font-mono px-2 py-1 bg-red-950/50 rounded">ステータス</div>
  </div>
</div>
```

## Before/After 比較パターン

diff 風の2カラムレイアウト:

```html
<div class="grid grid-cols-2 gap-6">
  <div class="text-sm text-red-400 font-mono mb-1">--- a/Before</div>
  <div class="text-sm text-green-400 font-mono mb-1">+++ b/After</div>
</div>
<div class="grid grid-cols-2 gap-6">
  <div class="bg-red-950/20 border-l-2 border-red-500 p-3 rounded-r font-mono text-sm">
    <div class="text-gray-600 text-xs mb-1">// 問題のコード</div>
    <div class="text-gray-400">...</div>
    <div class="text-red-400 text-xs">// 問題点</div>
  </div>
  <div class="bg-green-950/20 border-l-2 border-green-500 p-3 rounded-r font-mono text-sm">
    <div class="text-gray-600 text-xs mb-1">// 改善後</div>
    <div class="text-gray-400">...</div>
    <div class="text-green-400 text-xs">// 改善点</div>
  </div>
</div>
```

## バッジ

```html
<span class="px-3 py-1 bg-green-500/20 border border-green-500 text-green-400 text-sm font-mono">テキスト</span>
```

## タイムライン

```html
<div class="relative">
  <div class="absolute left-6 top-0 bottom-0 w-px bg-gray-700"></div>
  <div class="space-y-4">
    <div v-click v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0 }"
         class="flex items-center gap-4 pl-0">
      <div class="w-12 h-12 rounded-full bg-gray-800 border-2 border-gray-600 flex items-center justify-center text-xs font-mono text-gray-400 z-10">2024</div>
      <div class="flex-1 p-3 bg-gray-900/50 border border-gray-700 rounded">
        <div class="font-bold text-white text-sm">イベント名</div>
        <div class="text-xs text-gray-500">説明</div>
      </div>
    </div>
  </div>
</div>
```

## グリッドカード（型一覧など）

```html
<div class="grid grid-cols-3 gap-3">
  <div v-click v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }"
       class="p-4 bg-blue-950/30 border border-blue-500/50 rounded">
    <div class="text-blue-400 font-bold text-sm mb-1">タイトル</div>
    <div class="text-xs text-gray-400 mb-2">説明</div>
    <div class="font-mono text-xs text-gray-500">コード例</div>
    <div class="text-xs text-gray-600 mt-2">ユースケース</div>
  </div>
</div>
```
