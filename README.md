# unic MEET 改修版（2026-10-28／公開前レビュー用）

公開サイトから2026-10-27に取得したHTMLを基に、既存デザイン・12タイプを維持して改修。
**10月28日の公開サイト再取得は403で失敗。現在公開中の最新版との一致は未確認です。公開は行っていません。**
元取得ファイルSHA-256: `10fb315456720249be6d539ad98167ce2bb4feb5b33377902bd69394b516103a`。
12タイプの名称・解説・特徴ベクトルは元取得版と完全一致することを検証しました。
公開サイトが10月27日以降に更新されていれば、最新版ファイルと比較・統合する必要があります。

詳細は [改修報告.md](改修報告.md) を参照。

## 起動・テスト
既存の `/workspace/unic-meet` を使用します。タスクは隔離済みのため、明示依頼なしでworktreeを作成しません。
静的サイトなので依存導入・ビルドは不要です。

```
cd /workspace/unic-meet
python -m http.server 8765 --bind 127.0.0.1
```

別ターミナルから `node tests/logic.cjs`、`node tests/browser.cjs`、`node tests/share.cjs`、`node tests/assets.cjs`。
ブラウザテストには環境に備わったPlaywrightと `/usr/bin/chromium` を使用します。
ブラウザテストの画面幅確認は実機・Safari検証を意味しません。

## 設定
`site-config.js` の以下の項目を設定します。HTTPS URLのみ有効、未設定時は準備中の無効ボタンです。
- `BOOKING_URL`: 無料Zoom恋愛・婚活相談の予約URL
- `LINE_OA_URL`: 既存の婚活イベント用公式LINEの登録URL
- `COACH_CREDENTIAL`: 正式名称の確認後に掲載する資格名。空欄は非表示。
秘密情報や認証情報は記載しないでください。

## 画像
12タイプの高解像度画像を新規生成・差し替え済み（1254×1254px）。全12点のWebP合計は約1.04MiB、一覧用384px版の合計は約144KiB。トップ・個人結果・共有結果・相性・Instagram生成で使用。ASSETS-NEEDED.mdに対応表、characters-preview.htmlに一覧を収録。

## 未完了
- 正確な四柱推命は未実装。「現在準備中」。架空の鑑定は表示しない。
- 予約URL・公式LINE URL・資格正式名称が未設定。
- タイプ別OGP、実機のLINE/Instagram/iOS/Android確認は未実施。
- 現在の公開サイトとの再照合、Netlifyへの反映は未実施。

## 配信対象
`index.html`, `site-config.js`, `story.js`, `assets/` が必要です。
`unic-meet-update-highres.zip` は配信対象のみをZIPルートに収録。
`unic-meet-source-highres.zip` は資料・テストも含むレビュー用。

素材のみの unic-meet-characters-highres.zip はPNG原本と高解像度WebPを収録。新素材は公開サイトへ未反映です。
