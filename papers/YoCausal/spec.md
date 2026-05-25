要求:
幫我撰寫一個HTML的網頁，影片、Prompt的部分我之後再填入，先幫我寫出模板就好
影片先統一用: /project/AoTbenchmark/data/processed_dataset/mit/fwd/applauding_getty-wide-shot-men-and-women-in-formal-restaurant-standing-clapping-for-video-id670-52_7.mp4 代替
Prompt都先填入 "Prompt"
RSI排行榜的部分，參考: /project/AoTbenchmark/Figures/RSI/RSI.csv
CCI排行榜的部分，參考: /project/AoTbenchmark/Figures/CCI/CCI.csv
標題使用: YoCausal: How Far is Video Generation from World Model? A Causality Perspective

以下是網頁的形式

1. 論文標題與作者： 由於目前是匿名投稿（Anonymous ECCV 2026 Submission），請確保網頁上不要出現真實姓名與機構，僅標示 Paper ID #9660 。
2. 放Teaser的影片與排行榜
    - Teaser用: figs/teaser.pdf
    - 後面接3支並列(同個row)的影片 v1 / v2 / v3
3. Abstract
4. Contribution (條列式)
5. Methodology Framework (Pipeline圖)
6. Ranking of
    - RSI (可以選擇不同 Dataset)
    - CCI
    - Aggregate Rank
7. Subset Video
    - 放他們的正放&倒放影片
    - 附上prompt
    - 2 * 4
    - General / Physics / Human / Animal 
    - vG_f / vP_f / vH_f / vA_f
    - vG_r / vP_r / vH_r / vA_r
8. Causal / Non-Causal Video
    - 放他們的正放&倒放影片
    - 附上prompt
    - 2 * 4
    - Causal    /   Non-Casual
    - v1_f, v2_f / v3_f, v4_f
    - v1_r, v2_r / v3_r, v4_r
9. Temporal Symmetric Example
    - 放4組影片，包含正倒放
    - v1_f, v2_f / v3_f, v4_f
    - v1_r, v2_r / v3_r, v4_r
10. Human Labeling Page Figures
11. Human Preference Page Figures
