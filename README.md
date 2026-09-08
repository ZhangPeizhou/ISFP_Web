# Maple Bridge Community website

A bilingual, content-managed static website for an international student community in Canada. English and Chinese are shown together on every page: English is the primary visual language, while Chinese appears as a smaller supporting translation.

## What is included

- Responsive React + Vite website
- Simultaneous English and Chinese content
- Auto-playing, swipeable past-event highlights carousel
- Month calendar generated from event content
- Contact section and editable social details
- Decap CMS editor at `/admin/`
- Markdown-based content in the repository
- Automatic GitHub Pages deployment through GitHub Actions
- Accessible keyboard controls and reduced-motion support

All editable wording, activity records, dates, links, and photos live in `content/` or `public/uploads/`. Day-to-day editors do not need to touch React code.

## Project structure

```text
ISFP_Web/
├── content/
│   ├── pages/          # Homepage, about, and contact wording
│   ├── highlights/     # One Markdown file per past activity
│   └── events/         # One Markdown file per upcoming event
├── public/
│   ├── admin/          # Decap CMS editor and field configuration
│   └── uploads/        # Uploaded activity photos
├── src/                # Website components and design
└── .github/workflows/  # GitHub Pages deployment
```

## Local development

Requirements: Node.js 22 or a current Node.js LTS release, with Corepack/pnpm enabled.

```bash
pnpm install
pnpm run dev
```

Build the same version GitHub Pages will publish:

```bash
pnpm run build
pnpm run preview
```

## Before publishing

1. Replace the sample organization name, wording, contact details, events, and highlights.
2. Upload real activity photos and turn off the `Sample content` switch on each finished record.
3. Complete the one-time Decap CMS authentication setup in [SETUP_GUIDE.md](SETUP_GUIDE.md).
4. In GitHub, open **Settings → Pages** and choose **GitHub Actions** as the source.

The sample illustrations and contact details are intentionally labelled as sample content on the website.

## Guides

- [SETUP_GUIDE.md](SETUP_GUIDE.md) — one-time technical setup and deployment
- [OPERATIONS_GUIDE.md](OPERATIONS_GUIDE.md) — simple instructions for content editors

## 官方技术文档

- [Vite GitHub Pages deployment](https://vite.dev/guide/static-deploy)
- [Decap CMS configuration](https://decapcms.org/docs/configure-decap-cms/)
- [Decap CMS GitHub backend](https://decapcms.org/docs/github-backend/)
