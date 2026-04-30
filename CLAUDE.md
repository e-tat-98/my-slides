# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 概要

[Slidev](https://sli.dev/) のプレゼンテーションをまとめたモノレポ。`https://e-tat-98.github.io/my-slides/` に GitHub Pages でデプロイされる。各スライドデッキは `slides/<name>/` に独立した pnpm ワークスペースパッケージとして存在する。

## コマンド

**特定のスライドを開発する:**
```bash
cd slides/<name> && pnpm dev
# またはルートから:
pnpm --filter @slides/<name> dev
```

**全スライドをビルドする:**
```bash
pnpm build:slides
```

**サムネイルを生成する** (Playwright Chromium が必要):
```bash
pnpm build:thumbnail
```

**ルートの `dist/index.html` ギャラリーを生成する:**
```bash
pnpm build:index
```

**ビルド済みサイトをローカルでプレビューする:**
```bash
pnpm preview
```

## アーキテクチャ

### ワークスペース構成
- `slides/<name>/` — 各ディレクトリは独立した Slidev パッケージ。`package.json`・`slides.md`・任意の `layouts/`（カスタム Vue レイアウトコンポーネント）・`public/`（静的アセット）を持つ
- `scripts/` — `tsx` で実行される TypeScript ビルドスクリプト
- `dist/` — ビルド出力先。各スライドは各パッケージのビルドスクリプト内の `--out` フラグで `dist/<name>/` に出力される

### ビルドパイプライン
1. `pnpm --filter './slides/*' --parallel build` — 各パッケージが `slidev build slides.md --base /my-slides/<name>/ --out ../../dist/<name>/` を実行
2. `gen-thumbnail.ts` — 全スライドパッケージ（`scripts/utils.ts:getSlides` で検出）を走査し、Playwright で `slidev export` を実行して `dist/<name>/thumbnail/1.png` を生成
3. `gen-index.ts` — フロントマターからスライドタイトルを読み取り、各デッキへのカードギャラリーとして `dist/index.html` を生成

### 新しいスライドデッキを追加する
1. `slides/<name>/` を作成し、`package.json`（既存のものをコピーして `name` と `--base`/`--out` パスを調整）と、フロントマターに `title:` を持つ `slides.md` を配置する
2. ビルドスクリプトは `scripts/utils.ts` の `getSlides()` によってデッキを自動検出する

### デプロイ
GitHub Actions (`.github/workflows/deploy.yml`) が `main` へのプッシュ時に実行される。依存関係のインストール・Playwright Chromium のキャッシュ・スライドのビルド・サムネイルとインデックスの生成を行い、`dist/` を GitHub Pages にデプロイする。
