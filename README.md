# 日本語テキスト整形ツール試作

## 使い方

1. `index.html` をブラウザで開く
2. テキストを入力するか、`サンプルを入れる` を押す
3. `整形する` を押す
4. 結果を `コピーする`

## 収録ファイル

- `index.html`
- `privacy.html`
- `styles.css`
- `script.js`
- `robots.txt`
- `.nojekyll`

## 実装済みのMVP範囲

- 全角英数字を半角へ変換
- 連続空白の整理
- 連続空行の整理
- 箇条書き記号の統一
- 行末空白の削除

## 公開向けの補助

- `privacy.html` で最小のプライバシー表記を用意
- `robots.txt` を配置
- `.nojekyll` を配置して GitHub Pages に載せやすくした
