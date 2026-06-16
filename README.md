# Customer Account Dashboard (Shopify, native theme build)

A native, **app-free** customer account dashboard for Shopify — built entirely
in the Online Store theme using the Liquid `customer` object, plus light
client-side JS for wishlist and recently-viewed. Server-rendered by Shopify, so
it scales on Shopify's CDN with **no backend and no monthly app cost**.

Replicates: sidebar nav, stat cards (Total Orders / Total Spent / Wishlist
Items), profile card, and recent/all orders with status badges.

## Files

| File | Purpose |
|---|---|
| `sections/customer-dashboard.liquid` | The dashboard section (sidebar + panels). Has theme-editor settings (primary color, recent-order count, guest message). |
| `snippets/dashboard-order-row.liquid` | Reusable order row. |
| `templates/page.customer-dashboard.json` | OS 2.0 page template that mounts the section. |
| `assets/customer-dashboard.css` | Styles. |
| `assets/customer-dashboard.js` | Tab switching + wishlist/recently-viewed rendering. |
| `snippets/wishlist-button.liquid` | Heart toggle for product pages/cards (localStorage). |
| `snippets/track-recently-viewed.liquid` | Records viewed products (localStorage). |

## Install

These files belong in your live theme. Recommended: develop against an
**unpublished/development theme**, never the live theme directly.

1. **Pull your theme** into this repo (Shopify CLI):
   ```bash
   shopify theme pull --theme <dev-theme-id>
   ```
   …or copy the files above into your theme's matching folders.

2. **Push to a dev theme** and preview:
   ```bash
   shopify theme dev
   ```

3. **Create the page** in Shopify admin:
   - Online Store → Pages → Add page → title e.g. *My Account* (handle
     `customer-dashboard`).
   - In **Theme template**, choose **customer-dashboard**.

4. **Route customers to it:**
   - Point the header account icon at `/pages/customer-dashboard`.
   - (Optional) Set it as the post-login redirect.

5. **Wire the product-page hooks** (for wishlist + recently viewed):
   - In `sections/main-product.liquid` (or your product template) add:
     ```liquid
     {%- render 'track-recently-viewed' -%}
     {%- render 'wishlist-button', product: product -%}
     ```

6. **Style** to match your brand in the theme editor (primary color) or
   `assets/customer-dashboard.css`.

## Requirements / notes

- Store must use **Classic customer accounts** (this uses the Liquid
  `customer` object and `/account` routes). Check Settings → Customer accounts.
- Theme must be **Online Store 2.0** (JSON templates). For a vintage theme,
  rename `templates/page.customer-dashboard.json` to
  `templates/page.customer-dashboard.liquid` and have it render the section:
  `{% section 'customer-dashboard' %}`.
- Wishlist/recently-viewed are **device-local** (localStorage). To make them
  follow a logged-in customer across devices, persist handles to a customer
  metafield via an **App Proxy** — this is Phase 2 (the storage format stays
  the same).

## Roadmap

- **Phase 1 (this repo):** theme dashboard — orders, profile, totals,
  recently-viewed, local wishlist. ✅
- **Phase 2:** App Proxy + backend for cross-device wishlist, wallet/loyalty,
  recommendations (webhook-synced DB, caching).
