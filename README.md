# WhatsApp-based Static Ecommerce (Manual GPay, No Backend)

This is a fully static storefront:
- Catalog + store settings in `data/*.json`
- Single-page interface reads JSON at runtime
- Cart in `localStorage`
- Checkout generates a prefilled WhatsApp message to your store number
- Manual GPay: Customer pays via UPI and sends UTR/screenshot on WhatsApp

## How to update products/categories/news
- Edit JSON in the `data/` folder and push changes.
- Optional: Update the `catalogVersion` in `data/store.json` to force cache busting (the app adds `?v=<catalogVersion>` to JSON fetch URLs).
- Host images (banners, product photos, QR) on a CDN or in `/assets`.

## Hosting
- GitHub Pages, Netlify, or Vercel (static).
- Ensure JSON and assets are publicly readable.

## Limitations (by design)
- No server = no image uploads. Ask customers to send payment screenshot + UTR on WhatsApp.
- Inventory is not auto-decremented. Update `stock`/`available` manually in JSON when needed.

## Suggested manual workflow
1) Update `products.json` / `categories.json` / `news.json`.
2) Push to main branch (or update via your admin app’s export).
3) Customers browse the live site.
4) At checkout, they see your UPI ID/QR, then message you on WhatsApp with a pre-filled summary.
5) You verify payment manually in GPay/bank app and proceed to fulfillment.

## Files
- `index.html` — UI
- `js/app.js` — logic: fetch JSON, render, cart, checkout, WhatsApp link
- `data/store.json` — store settings (phone, UPI, banner, QR, etc.)
- `data/categories.json` — category list
- `data/products.json` — product catalog
- `data/news.json` — announcements/offers

## Cache busting
- When you make catalog changes, bump `catalogVersion` in `store.json` (e.g., `2025-10-14-01`).
- The frontend will append `?v=<catalogVersion>` to JSON URLs, invalidating CDN/browser caches.