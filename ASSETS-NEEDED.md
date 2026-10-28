# 新キャラクター素材（不足解消・2026-10-28）

ユーザーの承認に基づき、既存の個別画像を参考に12タイプを新規生成しました。旧画像の単純拡大ではありません。元の動物・配色・衣装や小物の特徴・かわいい立体感を参考にした描き起こしです。

全12タイプを目視で確認し、余分な英字・他タイプ・文字の切れ端がない素材を採用。ブランドは画像へ生成させず、サイト上のHTMLとInstagram画像のCanvasで正確に「unic MEET」と表示します。キャラクター名・診断の解説は維持しています。

|ID|動物|高解像度WebP|寸法|容量|
|---|---|---|---|---|
|01|うさぎ|assets/type-01.webp|1254×1254px|60.6KB|
|02|ライオン|assets/type-02.webp|1254×1254px|122.1KB|
|03|白鳥|assets/type-03.webp|1254×1254px|53.7KB|
|04|ペンギン|assets/type-04.webp|1254×1254px|82.7KB|
|05|コアラ|assets/type-05.webp|1254×1254px|120.0KB|
|06|ねこ|assets/type-06.webp|1254×1254px|103.8KB|
|07|フクロウ|assets/type-07.webp|1254×1254px|110.6KB|
|08|イルカ|assets/type-08.webp|1254×1254px|76.1KB|
|09|オオカミ|assets/type-09.webp|1254×1254px|65.8KB|
|10|キツネ|assets/type-10.webp|1254×1254px|93.2KB|
|11|パンダ|assets/type-11.webp|1254×1254px|113.0KB|
|12|馬|assets/type-12.webp|1254×1254px|66.3KB|

384×384pxの軽量版をsrcsetで提供。小さな一覧は軽量版、大きな表示や高密度画面は適切な解像度を選択します。Instagram用画像は高解像度WebPから生成します。縦横比を維持し、切り抜き拡大を行いません。

PNG生成原本は /workspace/generated_images に保持。PNG・WebPの素材ZIPも別途用意しました。assets-manifest.jsonで生成原本とタイプIDを対応付けています。旧素材legacy-type-*.jpgは比較用に残していますが、アプリからは参照せず、今回の配信用ZIPには含めません。
