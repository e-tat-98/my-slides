---
name: slidev-aidd
description: "このリポジトリで新しいSlidevデッキをAIDD（AI駆動開発）で作成・管理するワークフロー。トリガー: 「新しいスライドを作って」「〇〇についてのスライドを作りたい」「新しいデッキを追加して」「プレゼンを作成して」「スライドデッキを作成」など、新規スライドデッキの作成・追加指示。"
---

# Slidev AIDD ワークフロー

`e-tat-98/my-slides` モノレポで新しい Slidev スライドデッキを作成する完全なガイド。

## このリポジトリの構造

```
my-slides/
  slides/
    <name>/          ← 各デッキは独立したパッケージ
      package.json
      slides.md
      public/        ← 画像等の静的アセット（必要な場合）
      layouts/       ← カスタム Vue レイアウト（必要な場合）
  dist/              ← ビルド出力（git 管理外）
  scripts/           ← ビルドスクリプト
```

デッキは `scripts/utils.ts:getSlides()` で自動検出される。`package.json` を配置するだけで登録完了。

---

## ステップ 1: package.json を作成

`slides/<name>/package.json` を以下の形式で作成。`<name>` は URL フレンドリーな英小文字（ハイフン区切り）:

```json
{
  "name": "@slides/<name>",
  "type": "module",
  "private": true,
  "scripts": {
    "dev": "slidev --open slides.md",
    "build": "slidev build slides.md --base /my-slides/<name>/ --out ../../dist/<name>",
    "export": "slidev export slides.md"
  }
}
```

依存関係はルートの `package.json` で一元管理されているため、各デッキの `package.json` には不要。

---

## ステップ 2: slides.md を作成

`slidev-design` スキルのデザイン規約に従って `slides/<name>/slides.md` を作成する。

### ヘッドマター（デッキ全体の設定）

```yaml
---
theme: seriph
title: "スライドタイトル"
info: |
  スライドの説明文（1〜2行）
transition: view-transition
colorSchema: dark
fonts:
  sans: 'Roboto'
  serif: 'Roboto Slab'
  mono: 'Fira Code'
themeConfig:
  primary: 'rgb(187, 255, 204, 1)'
meta:
  slug: <name>
  date: 'YYYY-MM'
  description: "説明"
  published: true
  tags:
    - tag1
---
```

`hideInToc: true` は TOC に載せたくないスライド（タイトル・自己紹介・END 等）の個別フロントマターに付ける。

### スライド構成の選択

発表形式に応じた構成は `slidev-design/references/slide-structures.md` を参照:
- **LT 5分**: 6〜8枚
- **技術セッション 15〜30分**: 15〜25枚
- **チュートリアル**: 20〜30枚

### デザインパターンの適用

各スライドのコンテンツは `slidev-design` スキルのパターンを使用:

| 目的 | 参照先 |
|------|------|
| 全体デザイン規約・基本パターン | `slidev-design/SKILL.md` |
| カード・リスト・Before/After | `slidev-design/references/card-patterns.md` |
| ステップ・図・比較表・コールアウト | `slidev-design/references/visual-patterns.md` |
| 発表形式別の構成テンプレート | `slidev-design/references/slide-structures.md` |

---

## ステップ 3: 開発サーバーで確認

```bash
# デッキのディレクトリで
cd slides/<name> && pnpm dev

# またはルートから
pnpm --filter @slides/<name> dev
```

ブラウザで `http://localhost:3030` を開いてリアルタイムプレビュー。

---

## ステップ 4: ビルドと確認

```bash
# 全スライドをビルド
pnpm build:slides

# ローカルでギャラリーをプレビュー
pnpm preview
```

---

## デッキ命名規則

| 種別 | 命名例 |
|------|------|
| LT | `lt-YYYY-MM-topic` |
| 社内勉強会 | `study-topic` |
| カンファレンス | `conf-YYYY-topic` |
| 自己紹介 | `self-intro` |

---

## よくある作業

### 画像を使う

`slides/<name>/public/` に配置して `/image.png` で参照:

```html
<img src="/image.png" class="w-64" />
```

### カスタムレイアウトを追加

`slides/<name>/layouts/my-layout.vue` を作成すると `layout: my-layout` で使用できる。

### アイコンを使う

ルートに `@iconify-json/logos` が入っているので logos・mdi 系アイコンが使用可能:

```html
<logos-typescript-icon class="text-4xl" />
<mdi-github class="text-2xl text-gray-400" />
```

利用可能なアイコンセットは [Iconify](https://icon-sets.iconify.design/) で検索。

---

## デプロイ

`main` ブランチへの push で GitHub Actions が自動実行され、`https://e-tat-98.github.io/my-slides/` に GitHub Pages デプロイされる。手動操作は不要。
