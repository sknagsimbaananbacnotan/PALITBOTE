PALIT-BOTE — GITHUB PAGES + AUTOMATIC SEMAPHORE SMS

WHAT GOES WHERE
A. GitHub Pages:
   - index.html

B. Vercel serverless backend:
   - api/send-sms.js
   - package.json
   - vercel.json

IMPORTANT: Your Semaphore API key is intentionally NOT written into index.html or the repository files.
Put it in Vercel as an Environment Variable named:
SEMAPHORE_API_KEY

OPTIONAL:
SEMAPHORE_SENDER_NAME = your approved Semaphore sender name
ALLOWED_ORIGIN = your exact GitHub Pages origin, e.g. https://USERNAME.github.io

SETUP
1. Create a GitHub repository and upload index.html.
2. Settings > Pages > Deploy from branch > main / root.
3. Create a Vercel project for the backend files in this package.
4. In Vercel Project Settings > Environment Variables, add SEMAPHORE_API_KEY.
5. Deploy Vercel.
6. Your backend endpoint will look like:
   https://YOUR-VERCEL-PROJECT.vercel.app/api/send-sms
7. Open the GitHub Pages Palit-Bote website.
8. Go to Semaphore SMS.
9. Paste the Vercel endpoint into “Serverless SMS API URL” and click Save API URL.
10. Reload once.

AUTOMATIC FLOW
- New Claim 1 + Save Household -> automatic SMS: 1 claim remaining.
- New Claim 2 + Save Household -> automatic SMS: 2/2 claims complete.
- Editing without a new claim -> no duplicate SMS.

SECURITY
Do not paste the Semaphore API key into index.html.
Because an API key was previously shared in chat, rotating it before public deployment is recommended.
