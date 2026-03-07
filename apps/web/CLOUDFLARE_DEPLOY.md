# Deploying `apps/web` to Cloudflare Pages

This guide outlines the exact steps required to deploy the Next.js landing page & ecommerce application to Cloudflare Pages using `@cloudflare/next-on-pages` and `wrangler`.

## Prerequisites
- You must have a Cloudflare account.
- The terminal must be open and configured.

## Step-by-Step Deployment

**Pre-Requisite: Make sure you are in the correct directory!**
Open a terminal and navigate to the web application directory:
```powershell
cd d:\Develop\VinaFlightControl\apps\web
```

### 1. Authenticate with Cloudflare
First, you need to log in to Wrangler. Run this command:
```powershell
bunx wrangler login
```
*This will open a browser window asking you to authorize Wrangler. Click "Allow" and return to the terminal.*

### 2. Trigger the Build & Deploy Script
We have added a custom script to `package.json` that handles building the Next.js app for the Edge runtime and deploying it.

Run the deployment script:
```powershell
bun run deploy:cf
```

### What happens next?
1. `@cloudflare/next-on-pages` will build the Next.js application, converting standard Next.js routing into an Edge-compatible worker stored in `.vercel/output/static`.
2. `wrangler` will prompt you to create a new project. You can name it `vinafc-web` or similar.
3. Select the production branch (usually `main`).
4. Wrangler will automatically upload the bundled files and provide you with a live URL (e.g., `https://vinafc-web.pages.dev`).

---

**Note:** Since we are using a Monorepo, if Cloudflare prompts you about the build directory, it is handled automatically through the `deploy:cf` script. You do not need to link a GitHub repository to Cloudflare Pages if you prefer this direct CLI deployment method.
