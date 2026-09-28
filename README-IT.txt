G-Resources Group Limited (HKEx: 1051)
IR update — 28 September 2026
================================================

What this zip is
  Overwrite pack only. Not a full site. Unzip into the existing
  website document root (same folder as index.html). Keep all
  other files on the server.

New HKEx filings (3)
  1) Interim Financial Report For The Six Months Ended 30 June 2026
     Date:  28/09/2026 16:54
     EN:    wp-content/uploads/Report/Interim_Reports/2026092800794.pdf
     繁/简: wp-content/uploads/Report/Interim_Reports/2026092800795_c.pdf
     Cover: E_IR2026.jpg / C_IR2026.jpg (Interim Reports page)
     HKEx:  https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0928/2026092800794.pdf
            https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0928/2026092800795_c.pdf

  2) Notification Letter to Non-Registered Shareholders
     Date:  28/09/2026 17:00
     EN:    wp-content/uploads/Report/Circulars/ENG/2026/2026092800846.pdf
     繁/简: wp-content/uploads/Report/Circulars/CHI/2026/2026092800847_c.pdf
     HKEx:  https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0928/2026092800846.pdf
            https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0928/2026092800847_c.pdf

  3) Notification Letter and Reply Form to Registered Shareholders
     Date:  28/09/2026 16:58
     EN:    wp-content/uploads/Report/Circulars/ENG/2026/2026092800824.pdf
     繁/简: wp-content/uploads/Report/Circulars/CHI/2026/2026092800825_c.pdf
     HKEx:  https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0928/2026092800824.pdf
            https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0928/2026092800825_c.pdf

How to upload (GitHub Pages / gresourceshk.github.io)
  1. Do NOT delete the live site first.
  2. Copy these paths onto the existing tree, overwriting:
       index.html
       zh/index.html
       cn/index.html
       ir/interim-reports.html
       zh/ir/interim-reports.html
       cn/ir/interim-reports.html
       ir/circulars.html
       zh/ir/circulars.html
       cn/ir/circulars.html
       wp-content/uploads/Report/Interim_Reports/2026092800794.pdf
       wp-content/uploads/Report/Interim_Reports/2026092800795_c.pdf
       wp-content/uploads/Report/Interim_Reports/E_IR2026.jpg
       wp-content/uploads/Report/Interim_Reports/C_IR2026.jpg
       wp-content/uploads/Report/Circulars/ENG/2026/2026092800824.pdf
       wp-content/uploads/Report/Circulars/CHI/2026/2026092800825_c.pdf
       wp-content/uploads/Report/Circulars/ENG/2026/2026092800846.pdf
       wp-content/uploads/Report/Circulars/CHI/2026/2026092800847_c.pdf
  3. Commit and push. Wait a few minutes for Pages + Fastly cache
     (live HTML currently caches ~10 minutes).
  4. Spot-check:
       https://www.g-resources.com/
       https://www.g-resources.com/zh/
       https://www.g-resources.com/cn/
       https://www.g-resources.com/ir/interim-reports.html
       https://www.g-resources.com/zh/ir/interim-reports.html
       https://www.g-resources.com/cn/ir/interim-reports.html
       https://www.g-resources.com/ir/circulars.html
       https://www.g-resources.com/zh/ir/circulars.html
       https://www.g-resources.com/cn/ir/circulars.html
     Homepage "Latest news" / 「最新消息」 should show 28/09/2026 interim first.
     Circulars 2026: non-registered letter first, then registered.
     Click each PDF; it must open, not 404.

Do not
  - Replace the whole repo with this zip
  - Mix these files into the Funderstone site
  - Change DNS or GitHub Pages settings
  - Publish until instructed (this pack is for IT overwrite only)
