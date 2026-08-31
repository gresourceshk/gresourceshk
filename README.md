# G-Resources Group Limited (HKEx: 1051)

Static IR site for www.g-resources.com. No build step.

## Put this on the domain

Upload **the contents of this folder** to the web root (so `index.html` is at `/`).

Apache, nginx, IIS, or any static host is fine. Do not open the files as `file://` if you need search or the stock quote.

| Language | Path |
|---|---|
| English | `/` |
| Traditional Chinese | `/zh/` |
| Simplified Chinese | `/cn/` |

## What is in here

- HTML, CSS, JS, images
- IR PDFs (announcements, circulars, annual/interim/ESG reports, including 2014–2016)
- White page background, white header, navy footer
- Homepage 1051 quote loads after the page (Yahoo, then Tencent)

## Server notes

- HTTPS is recommended. Mixed-content is not required; PDFs are local.
- If you use Apache, `DirectoryIndex index.html` is enough.
- If you use nginx, `try_files $uri $uri/ $uri.html /index.html;` is optional; all pages already end in `.html`.
