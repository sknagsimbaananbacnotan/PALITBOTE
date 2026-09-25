# Palit-Bote Monitoring System — SK Nagsimbaanan

GitHub Pages frontend with automatic Semaphore SMS through a serverless backend.

## Repository contents
- `index.html` — complete monitoring website
- `api/send-sms.js` — serverless Semaphore SMS endpoint
- `package.json` / `vercel.json` — Vercel backend configuration
- `.gitignore` — prevents local environment/secrets from being committed

## GitHub Pages
Upload the full contents of this folder to the root of your GitHub repository.

Then:
1. Repository **Settings**
2. **Pages**
3. Source: **Deploy from a branch**
4. Branch: **main**
5. Folder: **/(root)**
6. Save

## Automatic SMS backend
GitHub Pages cannot safely store or execute your Semaphore API key. Deploy this same repository to Vercel.

In Vercel add these Environment Variables:

`SEMAPHORE_API_KEY` = your Semaphore API key

Optional:
`SEMAPHORE_SENDER_NAME` = your approved Sender Name

Recommended after your GitHub Pages URL is known:
`ALLOWED_ORIGIN` = `https://YOUR-USERNAME.github.io`

Deploy the Vercel project. Your SMS endpoint becomes:

`https://YOUR-PROJECT.vercel.app/api/send-sms`

Open your GitHub Pages website → **Semaphore SMS** → paste that endpoint → **Save API URL** → reload.

## SMS behavior
- New Claim 1 → automatically sends “1 claim remaining”
- New Claim 2 → automatically sends “2/2 claims complete”
- Editing without a new claim → no duplicate SMS

## Security
Never place `SEMAPHORE_API_KEY` inside `index.html`, JavaScript visible to the browser, or a committed `.env` file.
