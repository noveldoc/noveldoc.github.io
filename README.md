# Novel Document Reader product website

This is a dependency-free static website intended for GitHub Pages and Stripe business-profile review. It is separate from `word_plugin_en` and does not include extension runtime code.

## Required launch configuration

Edit `site-config.js` before publishing:

```js
window.NDR_SITE_CONFIG = {
  supportEmail: "noveldoc@outlook.com",
  chromeWebStoreUrl: "https://chromewebstore.google.com/category/extensions"
};
```

The support address must be monitored and must match the contact information supplied to Stripe. The current Chrome Web Store URL is a temporary category-page placeholder and must be replaced with the extension's public detail-page URL before final Stripe or Chrome Web Store review.

## Publish with GitHub Pages

1. Put the contents of this folder at the root of a GitHub repository or in its `/docs` folder.
2. In the repository, open **Settings → Pages**.
3. Select **Deploy from a branch**, then choose the branch and folder that contain `index.html`.
4. After deployment, test `index.html`, `privacy.html`, `terms.html`, `refunds.html`, and `support.html` without signing in.
5. Use the published HTTPS URL for the Stripe business website field.

No build command is required.

## Assets

- Product screenshots were captured from the real local `word_plugin_en/reader.html` preview.
- The product icon is copied from the extension and is based on Font Awesome Free's file-word icon under CC BY 4.0; see `assets/ASSET_LICENSES.md`.
- Figtree is licensed under the SIL Open Font License 1.1; see `assets/fonts/OFL.txt`.
