# One-time setup guide

This file is for the developer or repository owner. Content editors should use `OPERATIONS_GUIDE.md` after setup is complete.

## 1. Verify the project locally

From the repository folder:

```bash
pnpm install
pnpm run build
pnpm run preview
```

Open the preview address shown in the terminal and check the desktop and mobile layouts.

## 2. Connect the repository

`public/admin/config.yml` is already connected to:

```yaml
repo: ZhangPeizhou/ISFP_Web
```

If the project is later moved or forked, change this `owner/repository` value. Keep `branch: main` unless the repository uses another publishing branch.

## 3. Enable GitHub Pages

1. Push the project to the `main` branch.
2. Open the repository on GitHub.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, choose **GitHub Actions**.
5. Open the **Actions** tab and wait for `Deploy to GitHub Pages` to finish.

The site will normally be available at:

```text
https://zhangpeizhou.github.io/ISFP_Web/
```

The Vite configuration uses relative asset paths, so no repository-name change is required in `vite.config.js`.

## 4. Enable Decap CMS login

GitHub requires an OAuth service for browser-based CMS login. This is a one-time infrastructure step; a static GitHub Pages site cannot safely store a GitHub client secret by itself.

Choose an OAuth provider or deploy an OAuth proxy, then add its public URL to `public/admin/config.yml`:

```yaml
backend:
  name: github
  repo: ZhangPeizhou/ISFP_Web
  branch: main
  base_url: https://YOUR-OAUTH-PROXY-DOMAIN
  auth_endpoint: auth
```

Every CMS user must also have permission to write to the GitHub repository. Follow the official [Decap GitHub backend guide](https://decapcms.org/docs/github-backend/) and [OAuth proxy overview](https://decapcms.org/docs/backends-overview/#using-github-with-an-oauth-proxy).

After authentication is configured, the editor is available at:

```text
https://zhangpeizhou.github.io/ISFP_Web/admin/
```

## 5. Replace sample content

Before sharing the public URL:

- Update the organization name and all homepage wording.
- Replace `hello@example.ca`, Instagram, and WeChat details.
- Delete or edit every sample event and past highlight.
- Upload real 16:9 activity photos.
- Turn off `Sample content` on finished entries.

## 6. Handover

Give the editor:

- the `/admin/` URL;
- a GitHub account with repository write access;
- the short `OPERATIONS_GUIDE.md` file.

Do not share OAuth client secrets with content editors or commit secrets to this repository.
