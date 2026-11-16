# nikijasko.github.io
Niki Jaško — Architecture and urban design portfolio, published with GitHub Pages.

## How the site is put together

Every page is a plain HTML file in the repository root. Project pages contain their full text in the HTML (so they read well without JavaScript and in search results), and JavaScript then adds the interactive parts: drawing tabs, enlarged views, maps and the 3D models.

| Page | Page-specific styles | Page-specific scripts |
|---|---|---|
| `index.html` (projects grid) | — | `preview-assets.js`, `preview-markup.js`, `projects.js`, `site.js` |
| `about.html` | `about.css` | `site.js` |
| `emergence.html` | `thesis-theory.css`, `case-analyses.css`, `masterplan.css`, `thesis-media.css`, `thesis-layout.css`, `network.css` | `case-analyses-data.js`, `case-analyses.js`, `masterplan-data.js`, `masterplan.js`, `thesis-media.js`, `network.js`, `thesis-theory.js` |
| `market.html` | `market.css` | `market-data.js`, `market.js` |
| `gullbergsvass.html`, `strazna.html` | `housing.css` (+ `gull-street.css`) | `housing-assets.js`, `housing.js` (+ `gull-street.js`) |
| `viikki.html` | `viikki.css` | `viikki-assets.js`, `viikki.js` |
| `kapitulska.html`, `matadorka.html`, `dordrecht.html` | `practice.css` | `practice-assets.js`, `practice.js` |
| `school.html` | `school.css` | `school.js` |
| `footbridges.html` | `footbridges.css` | `footbridges-assets.js`, `footbridges.js` |

Shared by all project pages:

- **Styles**, loaded in this order (the order matters): `base.css` → `project-layout.css` → `project-system.css` → `site-shared.css` → *page styles* → `site-overrides.css` (`market.css` and `gull-street.css` come after `site-overrides.css`). Changing this order changes how pages look, so keep it when adding pages.
- **Scripts**: `projects.js` (titles, years and text for every project), `project-credits.js`, `project-gallery.js`, `project-router.js` (loads the page scripts listed above and starts them) and `site.js` (contents menu, enlarged image viewer, link fixes).

`project.html?id=…` is an older address that still works: it shows any project by id.

### 3D model viewers

`construction-viewer.html` (school structure) and `viikki-viewer.html` use `three.module.js` / `three.core.js` with `construction-viewer.js` / `viikki-viewer.js`. The model data are the `structure-*` and `viikki-structure-*` files. The old addresses (`construction-viewer-v18.html`, `construction-viewer-v97.html`, `viikki-viewer-v4.html`, `viikki-viewer-v97.html`) are tiny pages that forward to the current viewers.

### Images and documents

Image files keep a version number in their name (for example `viikki-hero-v49.webp`). The `*-assets.js` files list each image's size so pages can reserve space before it loads. When replacing an image, add the new file, update its entry in the matching `*-assets.js` file and the reference in the page.

The full portfolio PDF is a GitHub release download (about 120 MB). Phones and tablets are linked to the 12.5 MB `Niki-Jasko-Portfolio-Web.pdf` instead.
