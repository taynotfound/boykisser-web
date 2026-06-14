# Boykisser Linux — website

The landing page for [Boykisser Linux](https://github.com/taynotfound/BoykisserLinux),
served at **[boykisser.taymaerz.de](https://boykisser.taymaerz.de)**.

Plain static HTML + CSS + a sprinkle of JS. No build step. :3

## Run locally

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy

Pushing to `main` publishes via GitHub Pages (`.github/workflows/pages.yml`).
The custom domain comes from the `CNAME` file.

### One-time GitHub setup

1. Push this folder to `taynotfound/boykisser-web`.
2. Settings → Pages → Source: **GitHub Actions**.
3. DNS: add a `CNAME` record `boykisser` → `taynotfound.github.io`.

## Links

- Discord: https://discord.gg/3ZpwE9PPfP
- OS repo: https://github.com/taynotfound/BoykisserLinux

