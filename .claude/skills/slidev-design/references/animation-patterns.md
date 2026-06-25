# アニメーションパターン

このリポジトリのダークテーマ（seriph + dark）での実践的なアニメーションレシピ集。
API リファレンスは `slidev/references/core-animations.md` と `animation-rough-marker.md` を参照。

---

## 1. 入場アニメーション一覧

### 方向バリエーション

```html
<!-- 左から（デフォルト） -->
v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0 }"

<!-- 右から -->
v-motion :initial="{ opacity: 0, x: 20 }" :enter="{ opacity: 1, x: 0 }"

<!-- 下から -->
v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }"

<!-- 上から -->
v-motion :initial="{ opacity: 0, y: -20 }" :enter="{ opacity: 1, y: 0 }"

<!-- フェードのみ（動かさない） -->
v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1 }"

<!-- スケール -->
v-motion :initial="{ opacity: 0, scale: 0.8 }" :enter="{ opacity: 1, scale: 1 }"

<!-- タイトル用（大きく下から） -->
v-motion :initial="{ opacity: 0, y: 30 }" :enter="{ opacity: 1, y: 0 }"
```

ルール: **同一スライド内は方向を統一する**。左から入場なら全要素を左から。

### スプリング（弾む入場）

```html
<div v-click v-motion
  :initial="{ opacity: 0, scale: 0.5 }"
  :enter="{ opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 15 } }">
  アイコンやバッジに使う
</div>
```

---

## 2. タイトルスライドの演出

ページ遷移時に要素を順番に登場させる（クリック不要）:

```html
<div class="h-full w-full flex items-center justify-center p-8">
  <div class="text-center">
    <!-- 1. アイコン（即座） -->
    <div v-motion :initial="{ opacity: 0, scale: 0.5 }"
         :enter="{ opacity: 1, scale: 1, transition: { delay: 0, type: 'spring', stiffness: 200 } }"
         class="text-6xl mb-4">
      <logos-typescript-icon />
    </div>

    <!-- 2. タイトル（100ms 後） -->
    <div v-motion :initial="{ opacity: 0, y: 30 }"
         :enter="{ opacity: 1, y: 0, transition: { delay: 100 } }"
         class="text-7xl font-black tracking-tight text-white">
      タイトル
    </div>

    <!-- 3. サブタイトル（300ms 後） -->
    <div v-motion :initial="{ opacity: 0 }"
         :enter="{ opacity: 1, transition: { delay: 300 } }"
         class="text-2xl font-bold text-gray-400 mt-4">
      サブタイトル
    </div>

    <!-- 4. バッジ群（500ms 後） -->
    <div v-motion :initial="{ opacity: 0, y: 10 }"
         :enter="{ opacity: 1, y: 0, transition: { delay: 500 } }"
         class="flex items-center justify-center gap-3 mt-6">
      <span class="px-3 py-1 bg-green-500/20 border border-green-500 text-green-400 text-sm font-mono">v1.0</span>
      <span class="px-3 py-1 bg-blue-500/20 border border-blue-500 text-blue-400 text-sm font-mono">TypeScript</span>
    </div>

    <!-- 5. 登壇者名（700ms 後） -->
    <div v-motion :initial="{ opacity: 0 }"
         :enter="{ opacity: 1, transition: { delay: 700 } }"
         class="text-gray-500 text-sm font-mono mt-6">
      発表者名 / YYYY-MM-DD
    </div>
  </div>
</div>
```

---

## 3. ステージ表示（段階的な情報開示）

### パターン A: クリックごとに1つずつ登場

```html
<div class="space-y-3">
  <div v-click v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0 }"
       class="p-3 bg-gray-900/50 border border-gray-700 rounded">
    1つ目（1クリック目に登場）
  </div>
  <div v-click v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0 }"
       class="p-3 bg-gray-900/50 border border-gray-700 rounded">
    2つ目（2クリック目に登場）
  </div>
  <div v-click v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0 }"
       class="p-3 bg-gray-900/50 border border-gray-700 rounded">
    3つ目（3クリック目に登場）
  </div>
</div>
```

### パターン B: 1クリックで全員ストール（スタガー）

```html
<div class="space-y-3">
  <div v-motion :initial="{ opacity: 0, x: -20 }"
       :enter="{ opacity: 1, x: 0 }"
       class="p-3 bg-gray-900/50 border border-gray-700 rounded">
    1つ目（0ms）
  </div>
  <div v-motion :initial="{ opacity: 0, x: -20 }"
       :enter="{ opacity: 1, x: 0, transition: { delay: 150 } }"
       class="p-3 bg-gray-900/50 border border-gray-700 rounded">
    2つ目（150ms 後）
  </div>
  <div v-motion :initial="{ opacity: 0, x: -20 }"
       :enter="{ opacity: 1, x: 0, transition: { delay: 300 } }"
       class="p-3 bg-gray-900/50 border border-gray-700 rounded">
    3つ目（300ms 後）
  </div>
</div>
```

### パターン C: グリッドカードのスタガー（下からスケール）

```html
<div class="grid grid-cols-3 gap-4">
  <div v-motion :initial="{ opacity: 0, y: 20, scale: 0.9 }"
       :enter="{ opacity: 1, y: 0, scale: 1 }"
       class="p-4 bg-blue-950/30 border border-blue-500/50 rounded-lg">カード1</div>
  <div v-motion :initial="{ opacity: 0, y: 20, scale: 0.9 }"
       :enter="{ opacity: 1, y: 0, scale: 1, transition: { delay: 100 } }"
       class="p-4 bg-green-950/30 border border-green-500/50 rounded-lg">カード2</div>
  <div v-motion :initial="{ opacity: 0, y: 20, scale: 0.9 }"
       :enter="{ opacity: 1, y: 0, scale: 1, transition: { delay: 200 } }"
       class="p-4 bg-purple-950/30 border border-purple-500/50 rounded-lg">カード3</div>
</div>
```

---

## 4. フォーカス＆ディム

クリックで特定要素を強調し、他を薄くする。`$clicks` でクリック数を参照:

```html
<div class="space-y-3">
  <!-- クリック1でフォーカス、クリック2以降は薄く -->
  <div :class="$clicks === 1 ? 'border-green-500 bg-green-950/30 scale-[1.02]' : $clicks > 1 ? 'opacity-30' : 'border-gray-700 bg-gray-900/50'"
       class="transition-all duration-500 p-4 border rounded-lg">
    <div class="font-bold text-white">要素 A</div>
  </div>

  <!-- クリック2でフォーカス、前後は薄く -->
  <div :class="$clicks === 2 ? 'border-blue-500 bg-blue-950/30 scale-[1.02]' : ($clicks > 0 && $clicks !== 2) ? 'opacity-30' : 'border-gray-700 bg-gray-900/50'"
       class="transition-all duration-500 p-4 border rounded-lg">
    <div class="font-bold text-white">要素 B</div>
  </div>

  <!-- クリック3でフォーカス -->
  <div :class="$clicks === 3 ? 'border-purple-500 bg-purple-950/30 scale-[1.02]' : $clicks > 0 && $clicks !== 3 ? 'opacity-30' : 'border-gray-700 bg-gray-900/50'"
       class="transition-all duration-500 p-4 border rounded-lg">
    <div class="font-bold text-white">要素 C</div>
  </div>
</div>
```

---

## 5. v-mark 活用パターン

コード・テキストへの手書き風マーカー。クリックと連動:

```html
<!-- クリック1でサークル、クリック2でアンダーライン -->
<div class="font-mono text-lg leading-loose">
  <span v-mark.circle.green="1">重要な関数</span>() {
    return <span v-mark.underline.yellow="2">result</span>
  }
</div>
```

コードブロックと組み合わせ:

```html
<div class="bg-gray-900 border border-gray-700 rounded p-4 font-mono text-sm leading-loose">
  <div><span class="text-purple-400">async function</span> <span v-mark.box.blue="1" class="text-yellow-300">fetchData</span>() {</div>
  <div class="pl-4">
    <span class="text-purple-400">const</span>
    <span class="text-cyan-300"> res</span> =
    <span v-mark.underline.green="2" class="text-purple-400">await</span>
    <span class="text-yellow-300"> fetch</span>(url)
  </div>
  <div class="pl-4 text-gray-600">// <span v-mark.highlight.orange="3">エラーハンドリング未実装</span></div>
  <div>}</div>
</div>
```

---

## 6. v-click による要素切り替え（v-switch）

同じ位置に異なる内容を順番に表示:

```html
<v-switch>
  <template #1>
    <div class="p-6 bg-red-950/20 border border-red-500/50 rounded-lg">
      <div class="text-red-400 font-mono text-xs mb-2">// ❌ Before</div>
      <div class="font-mono text-gray-300 text-sm">問題のある実装</div>
    </div>
  </template>
  <template #2>
    <div v-motion :initial="{ opacity: 0, x: 20 }" :enter="{ opacity: 1, x: 0 }"
         class="p-6 bg-green-950/20 border border-green-500/50 rounded-lg">
      <div class="text-green-400 font-mono text-xs mb-2">// ✓ After</div>
      <div class="font-mono text-gray-300 text-sm">改善後の実装</div>
    </div>
  </template>
</v-switch>
```

---

## 7. CSS ループアニメーション（デコレーション）

スライドに動きを添えるデコレーション要素。`<style>` ブロックをスライド内に記述:

```html
<!-- パルスするドット（接続中・処理中を示す） -->
<div class="flex gap-1.5">
  <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
  <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse" style="animation-delay: 0.2s"></div>
  <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse" style="animation-delay: 0.4s"></div>
</div>

<!-- 浮遊するアイコン -->
<div class="animate-bounce text-4xl text-gray-600">⬇</div>
```

カスタムキーフレーム（スライドの `<style>` に記述）:

```html
<div class="float-icon text-5xl">🚀</div>

<style>
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
}
.float-icon {
  animation: float 3s ease-in-out infinite;
}
</style>
```

---

## 8. View Transition（スライド間アニメーション）

`transition: view-transition` が設定されている場合、同じ `view-transition-name` を持つ要素がスライド間でモーフィングする:

```yaml
# headmatter
transition: view-transition
```

```html
<!-- スライド N のタイトル（大きく） -->
<div style="view-transition-name: hero-title"
     class="text-5xl font-black text-white">
  TypeScript
</div>

<!-- スライド N+1 の見出し（小さく） -->
<h1 style="view-transition-name: hero-title"
    class="text-2xl font-bold text-white">
  TypeScript
</h1>
```

タイトルが滑らかに縮小しながら見出しに変化する。

---

## 9. 全スライドのアニメーション設定指針

| 場面 | 推奨アニメーション | 備考 |
|------|----------------|------|
| タイトルスライド | 段階的フェードイン（遅延 100〜700ms） | クリック不要、遷移時に自動実行 |
| リスト項目 | `v-click` + 左から | 1項目ずつ開示 |
| カードグリッド | スタガー（100ms 刻み） | 一度に登場させる場合 |
| コード解説 | `v-click` + `v-mark` | クリックで行ごとにマーク |
| Before/After | `v-switch` + 右からスライド | After は右から登場 |
| まとめ | `v-click` + 下から | 3点を順番に |
| セクションブレイク | フェードのみ（大きい文字は動かさない） | 動かすと重くなる |
| デコレーション | CSS ループ（pulse/bounce） | 情報要素には使わない |
