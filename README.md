# IZMA. — Personal Archive

A responsive, editorial-minimalist personal gallery built with plain HTML, CSS and JavaScript for GitHub Pages. No build tools or dependencies are required.

## Preview locally
Because the gallery reads `data/projects.json` with `fetch`, open the folder through a local server rather than double-clicking `index.html`.
- VS Code: install/use Live Server, then choose **Open with Live Server**.
- Or run `python -m http.server 8000` in this folder and visit `http://localhost:8000`.

## Publish on GitHub Pages
1. Create a new **public** repository, for example `izma-gallery`.
2. Upload the contents of this folder (not the enclosing folder) to the repository root. `index.html` must be at the root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Choose branch `main`, folder `/(root)`, then Save.
6. Wait for the deployment to finish. Your site will be at `https://YOUR-USERNAME.github.io/izma-gallery/`.

GitHub Pages publishes static files. The `.nojekyll` file is included. Official guide: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Add or edit an entry
Edit `data/projects.json`. Copy an object and change its fields:
- `title`, `category`, `year`, `status`, `description`, `tags`, `mark`
- Optional `url`: adds a “Visit project” link in the detail popup.
Allowed categories currently used by the filters: `Engineering`, `Research`, `Ventures`, `Creative`.

Use relative image paths if you later add image support. Keep images in `assets/images/`. Do not add confidential, unpublished, patient, or personally identifying research data to a public repository.

## Customize
- Colors, typography, spacing: `css/style.css` (CSS variables at the top).
- Mobile layout: `css/responsive.css`.
- Homepage content: `index.html`.
- About page: `about.html`.
- Gallery cards, search and detail popup: `js/gallery.js`.
- Navigation and modal behavior: `js/main.js`.

## Important
This is a public-facing starter archive, not a private storage space. Verify personal contact details and project descriptions before publishing. The CV content is summarized and should be reviewed for accuracy. The site currently uses typographic artwork placeholders rather than project photographs; replace them with images you own or have permission to use.
