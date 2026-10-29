# unic MEET 恋愛タイプ診断（2026-10-29）

「あなたの恋、どんなタイプ？」を入口に、タイプを知る → 自分に合う恋の進め方を考える → LINEで結果をもとに相談、の流れに変更しました。

## 現在の導線
- 恋愛攻略のヒントを探す10問の無料タイプ診断。8問で動物、残り2問で次の一歩の参考を表示。
- 結果に27,000円のコーチング料金、エステ・結婚相談所への直接申し込み、Instagram画像生成・OS共有は出しません。
- 相談の名称・体験価格は未決定のため、無料Zoom・1,980円・4,980円・戦略ミーティングなどを確定した案内として表示しません。
- 相談は既存の公式LINEから。登録済みの方は再登録不要。結果スクショや結果リンクと、気になることを自分で送ってもらう運用。
- 年齢などの追加確認は必要な通話調整時に行う案内。新しい事前アンケートは追加しません。
- 診断結果の閲覧はLINE登録不要。生年月日・出生時刻・回答はブラウザ内のみで処理し、自動転送・保存しません。
- 友達に結果をLINEで送る機能を維持。URLはタイプ／サブタイプのみ。紹介とサービスサイトへのボタンを下部に掲載。
- 12タイプの元のキャラに近い個別画像と、実装済み四柱推命を維持。

## 必須設定
site-config.js の LINE_OA_URL に、既存の婚活イベント用公式LINEのHTTPS友だち追加URLを設定してください。現在は未設定で、相談ボタンは準備中です。
BOOKING_URL と COACH_CREDENTIAL は将来用に保持していますが、現在の診断画面には使用しません。

## 起動・検証
既存の/workspace/unic-meetを使用。隔離済みのため明示依頼なしにworktreeは作成しません。静的サイトでビルド・依存導入は不要です。

```
python -m http.server 8767 --bind 127.0.0.1
node tests/logic.cjs
node tests/calendar.cjs
node tests/browser.cjs
node tests/calendar-browser.cjs
node tests/assets.cjs
```
ブラウザテストは起動済みサーバー、環境付属Playwright・/usr/bin/chromiumを使用します。実機iPhone/AndroidやLINEアプリ操作を保証するものではありません。

## 四柱推命
lunar-javascript 1.7.7（MIT）を同梱。年・月は節入りの瞬間、日柱は出生地の日界0時、時柱は出生地の時計の時刻（23時台も当日の日干使用）、真太陽時補正なし。IANAタイムゾーン・夏時間を換算。時刻不明の節入り日は候補併記、時柱は推測しません。流派差と境界の計算モデル差を結果に表示しています。
41 upstream tests、120独立JDN日柱、48独立天文節入り（最大差24.014秒）を検証。THIRD-PARTY.md参照。

## 配信
index.html、site-config.js、four-pillars.js、vendor/、assets/logo.jpg、assets/type-*.webpが必要です。story.jsは廃止しました。
GitHubの最新版ZIPを使い、内容確認後に既存Netlifyサイトへ反映してください。GitHub保存とNetlify公開は別です。
リンク先quiet-pasca-d4a0c0.netlify.appのサービス紹介サイト自体は別プロジェクトで、既存コードの取得がHTTP 403で未完了です。この改修ではその価格・名称を変更していません。
