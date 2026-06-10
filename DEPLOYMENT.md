# Deployment Checklist

Use this checklist before pushing the Paigos Barbershop website to GitHub.

## GitHub Repository Setup

Recommended repository name:

```text
Paigos-Barbershop
```

Recommended description:

```text
Professional website for Paigos Barbershop in Mdantsane, East London.
```

When creating the repository on GitHub:

- Leave **Add README** off.
- Leave **Add .gitignore** off.
- Leave **Add license** off.

Those files already exist locally.

## Push Commands

Run from this folder:

```bash
cd /home/raz/Paigos
git branch -M main
git add index.html styles.css script.js assets README.md DEPLOYMENT.md LICENSE .gitignore .nojekyll
git commit -m "Launch Paigos Barbershop website"
git remote add origin https://github.com/YOUR-USERNAME/Paigos-Barbershop.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username.

## GitHub Pages

After pushing:

1. Open the repository on GitHub.
2. Go to **Settings > Pages**.
3. Choose **Deploy from a branch**.
4. Select:
   - Branch: `main`
   - Folder: `/root`
5. Save.

GitHub will publish the site at a URL similar to:

```text
https://YOUR-USERNAME.github.io/Paigos-Barbershop/
```

## Do Not Upload

The `.gitignore` excludes raw scraped Facebook pages, local PDFs, and source notes. Keep those private unless you intentionally want them public.
