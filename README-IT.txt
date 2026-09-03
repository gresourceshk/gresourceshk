G-Resources Group Limited (HKEx: 1051)
IR update — 3 September 2026
================================================

What this zip is
  Overwrite pack only. Not a full site. Unzip into the existing
  website document root (same folder as index.html). Keep all
  other files on the server.

New HKEx filing
  Date:  03/09/2026
  EN:    Monthly Return for Equity Issuer on Movements in
         Securities for the month ended 31 August 2026
  繁:    截至2026年8月31日之股份發行人的證券變動月報表
  简:    截至2026年8月31日之股份发行人的证券变动月报表
  HKEx:  https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0903/2026090300301.pdf
         https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0903/2026090300302_c.pdf

How to upload (GitHub Pages / gresourceshk.github.io)
  1. Do NOT delete the live site first.
  2. Copy these paths onto the existing tree, overwriting:
       index.html
       zh/index.html
       cn/index.html
       ir/returns.html
       zh/ir/returns.html
       cn/ir/returns.html
       wp-content/uploads/Report/Latest/ENG/e_FF301_MONTHLY_RETURN_EQUITY_V1_2_1_3-9-2026.pdf
       wp-content/uploads/Report/Latest/CHI/c_FF301_MONTHLY_RETURN_EQUITY_V1_2_1_3-9-2026.pdf
       wp-content/uploads/Report/Returns_on_Share_Capital/ENG/2026/e_FF301_MONTHLY_RETURN_EQUITY_V1_2_1_3-9-2026.pdf
       wp-content/uploads/Report/Returns_on_Share_Capital/CHI/2026/c_FF301_MONTHLY_RETURN_EQUITY_V1_2_1_3-9-2026.pdf
  3. Commit and push. Wait a few minutes for Pages + Fastly cache
     (live HTML currently caches ~10 minutes).
  4. Spot-check:
       https://www.g-resources.com/
       https://www.g-resources.com/ir/returns.html
       https://www.g-resources.com/zh/ir/returns.html
       https://www.g-resources.com/cn/ir/returns.html
     Homepage "Latest news" / 「最新消息」 should show 03/09/2026 first.
     Click the PDF; it must open, not 404.

Do not
  - Replace the whole repo with this zip
  - Mix these files into the Funderstone site
  - Change DNS or GitHub Pages settings
