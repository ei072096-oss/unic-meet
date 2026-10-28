# unic MEET 恋愛タイプ診断

2026-10-28 改訂版。既存のタイプ名・診断の一般解説・10問の判定ロジックを維持し、元のキャラクターに近いポートレートへ調整しました。

## 今回の変更
- 12種類を元の表情・衣装・顔中心の構図に近づけて再生成。1254×1254px WebP＋384px軽量版。
- 動物ごとの下のunic MEET表示、イベント用トークカード、結果文章コピー／結果URLコピーボタンを削除。
- 四柱推命をローカル実装。年柱・月柱・日柱、出生時刻が分かる場合は時柱と、日干の一般的な補足を表示。
- 出生地のIANAタイムゾーン・夏時間を反映。出生時刻不明の節入り日は年柱・月柱の候補を併記。時柱は推測しない。
- 診断内のサービス紹介を落ち着いたカードへ整理。
- ユーザーがデザイン変更を希望したリンク先 https://quiet-pasca-d4a0c0.netlify.app/ はHTTP 403で取得不可のため、その別サイト自体の改修は未着手。

## 四柱推命の計算基準
lunar-javascript 1.7.7（MIT）の節入り時刻を出生地の瞬間へ換算して年・月柱を計算。日柱は出生地の民間時の0時切り替え。時柱も出生地の時計を使い、23時台の時干は当日の日干から算出。真太陽時補正なし。対応生年1900〜2099年（入力は未来日不可）。流派によって結果が異なることを結果の計算基準に表示しています。
参考サイト https://aisare-fourpillars.info/ は環境からHTTP 403で取得できず、内容の転載・API利用・同サイトとの照合は行っていません。実際の暦計算から結果を出し、架空の命式を表示しません。
入力はブラウザ内だけで処理し、サーバー送信・永続保存・共有URLへの記載なし。

## 起動と検証
既存の /workspace/unic-meet を使用。明示依頼なしでworktreeを作成しません。ビルド・依存導入は不要。配信に必要な暦ライブラリはvendor/に同梱しています。

```
python -m http.server 8766 --bind 127.0.0.1
node tests/logic.cjs
node tests/calendar.cjs
node tests/browser.cjs
node tests/calendar-browser.cjs
node tests/share.cjs
node tests/assets.cjs
```
ブラウザテストは起動済みサーバー、環境付属Playwrightと/usr/bin/chromiumを使用します。実機・Safari・LINE/Instagramアプリでの検証は別途必要です。

## サイト設定
site-config.js の BOOKING_URL（無料Zoom予約）、LINE_OA_URL（既存公式LINE）、COACH_CREDENTIAL（確認済み資格名）を設定できます。未設定の予約・登録ボタンは準備中の無効表示。資格名は未設定なら非表示です。

## 配信対象
index.html、site-config.js、story.js、four-pillars.js、vendor/、assets/logo.jpg、assets/type-*.webpを同じルートから配信。
前回の更新用ZIPには新しいfour-pillars.jsとvendor/が含まれないため、今回の最新版を使用してください。
公開前に既存NetlifyのDeployを控え、内容確認後、既存サイトへアップロードしてください。GitHubへの保存とNetlifyへの公開は別です。

素材対応：assets-manifest.json／ASSETS-NEEDED.md。改修・テスト詳細：改修報告.md。ライセンス：THIRD-PARTY.md。
