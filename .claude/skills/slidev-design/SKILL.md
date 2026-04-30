---
name: slidev-design
description: "Slidev スライドのデザインテンプレート。新しいスライドの作成、既存スライドのデザイン改善、スタイル統一に使用する。トリガー: 「スライド作成」「新しいスライド」「スライドのデザイン」「slides.md」「Slidev」「プレゼン作成」「LT スライド」などスライドの作成・編集・デザインに関する指示。"
---

# Slidev スライドデザインテンプレート

スライドプロジェクトで使用するデザイン規約。全スライドでこのパターンに従う。

## フロントマター

```yaml
theme: seriph
title: "スライドタイトル"
info: |
  スライドの説明文
transition: view-transition
layout: intro
hideInToc: true
colorSchema: dark
fonts:
  sans: 'Robot'
  serif: 'Robot Slab'
  mono: 'Fira Code'
themeConfig:
  primary: 'rgb(187, 255, 204, 1)'
meta:
  slug: url-identifier
  date: 'YYYY-MM'
  description: "説明"
  icon: "iconify:icon-name"
  published: true
  tags:
    - tag1
```

## レイアウトルール

- `layout: center` は **END スライドのみ**で使用
- 他の全スライドはカスタム flex レイアウトを使用:

```html
<div class="h-full flex items-center justify-center px-12">
  <div class="w-full max-w-2xl">
    <!-- コンテンツ -->
  </div>
</div>
```

- `max-w-2xl` ~ `max-w-5xl` をコンテンツ量に応じて選択
- `px-8` ~ `px-12` をコンテンツ量に応じて選択

## スライド構成パターン

### 1. タイトルスライド

```html
<div class="h-full w-full flex items-center justify-center p-8">
  <div v-motion :initial="{ opacity: 0, y: 30 }" :enter="{ opacity: 1, y: 0 }" class="text-center">
    <div class="flex items-center justify-center gap-4 mb-4">
      <icon-component class="text-6xl" />
      <div class="text-7xl font-black tracking-tight text-white">タイトル</div>
    </div>
    <div v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, delay: 300 }"
        class="text-2xl font-bold text-gray-400 mb-4">サブタイトル</div>
    <div v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, delay: 500 }"
        class="flex items-center justify-center gap-3 mb-3">
      <span class="px-3 py-1 bg-green-500/20 border border-green-500 text-green-400 text-sm font-mono">Badge1</span>
    </div>
  </div>
</div>
```

### 3. TOC スライド

```html
<div class="h-full flex items-center justify-center">
  <div class="w-full max-w-xl">
    <div class="text-gray-500 font-mono text-sm mb-6"># 今日の流れ</div>
    <Toc maxDepth="1" class="space-y-3 text-lg" />
  </div>
</div>
```

### 4. コンテンツスライドの見出し

```html
<h1 class="text-3xl font-bold mb-2 font-mono">
  <span class="text-gray-500">//</span> 見出し <span class="text-gray-400 text-xl">— サブ見出し</span>
</h1>
<div class="text-gray-500 text-sm font-mono mb-4">補足テキスト</div>
```

### 5. END スライド

唯一 `layout: center` を使用:

```html
<h1 class="font-mono"><span class="text-gray-500">//</span> END</h1>
```

## アニメーション

- **左からスライドイン** (デフォルト): `:initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0 }"`
- **右からスライドイン**: `:initial="{ opacity: 0, x: 20 }" :enter="{ opacity: 1, x: 0 }"`
- **下からスライドイン**: `:initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }"`
- **タイトル用**: `:initial="{ opacity: 0, y: 30 }" :enter="{ opacity: 1, y: 0 }"`

ルール:
- 同一スライド内のアニメーション方向は統一する
- `v-click` + `v-motion` で段階表示する
- 遅延: `delay: 200`, `delay: 400` で段階的に

## コードブロック

markdown の ` ``` ` ではなく HTML styled blocks を使用:

```html
<div class="bg-gray-900 border border-{accent}-800/50 rounded p-4 font-mono text-sm leading-relaxed">
  <div><span class="text-purple-400">const</span> <span class="text-cyan-300">x</span> = ...</div>
</div>
```

シンタックスハイライト:
- キーワード: `text-purple-400`
- 変数: `text-cyan-300`
- 関数名/文字列: `text-yellow-300`
- コメント: `text-gray-600`
- エラー: `text-red-400`

## カードスタイル

詳細パターンは [references/card-patterns.md](references/card-patterns.md) を参照。

## カラースキーム

- **ポジティブ**: green (`text-green-400`, `bg-green-950/20`, `border-green-500`)
- **ネガティブ**: red (`text-red-400`, `bg-red-950/20`, `border-red-500`)
- **ラベル**: cyan (`text-cyan-400`)
- **アクセント**: blue, purple, orange, yellow
- **テキスト**: white (見出し), `text-gray-300` (本文), `text-gray-400` (サブ), `text-gray-500` (補足), `text-gray-600` (薄い)
