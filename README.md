# Grid Cell Solutions — Website

Single-page marketing site for **Grid Cell Solutions** (ERPNext, Odoo, Salesforce,
Zoho, ERP consulting, Excel Automation, Power BI & Looker services).

## Files

```
gridcell-site/
├── index.html
├── style.css
├── script.js
├── assets/
│   └── favicon.svg
├── google-apps-script/
│   └── Code.gs          ← paste this into Google Apps Script (not into the website)
└── README.md
```

## 1. Connect the contact form to a Google Sheet

The form on the site does **not** save anywhere until you complete this step.

1. Go to [sheets.google.com](https://sheets.google.com) → create a new blank Sheet.
2. Rename the first tab (bottom-left) to `Leads`.
3. In row 1, add these column headers exactly:
   `Timestamp | Name | Phone | Email | Service | Message`
4. In the Sheet menu, go to **Extensions → Apps Script**.
5. Delete the placeholder code you see there, and paste in the entire contents
   of `google-apps-script/Code.gs` from this folder.
6. Click **Deploy → New deployment**.
   - Click the gear icon next to "Select type" → choose **Web app**.
   - Description: anything, e.g. "Grid Cell contact form".
   - Execute as: **Me**
   - Who has access: **Anyone**
7. Click **Deploy**. Google will ask you to authorize — click through
   (you may see an "unverified app" warning since it's your own script;
   click **Advanced → Go to project (unsafe)** → **Allow**. This is expected
   for personal Apps Script projects).
8. Copy the **Web app URL** shown after deployment
   (looks like `https://script.google.com/macros/s/XXXXXXXX/exec`).
9. Open `script.js` in this project, find this line near the bottom:
   ```js
   const GOOGLE_SCRIPT_URL = 'PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';
   ```
   Replace the placeholder text with the URL you copied.
10. Save, and re-upload/push the updated `script.js`. Every form submission
    will now appear as a new row in your `Leads` sheet.

> If you ever change the script's code later, you must create a
> **New deployment** again (or use "Manage deployments → Edit" to update
> the existing one) for changes to go live.

## 2. Host it for free on GitHub Pages

1. Create a new **public** repository on GitHub (e.g. `gridcell-website`).
2. Upload all files from this folder — keep the same folder structure
   (`index.html` must sit in the repository root, not inside a subfolder).
3. Go to the repo's **Settings → Pages**.
4. Under "Build and deployment" → Source, select **Deploy from a branch**.
5. Branch: `main`, folder: `/ (root)` → **Save**.
6. Wait 1–2 minutes. GitHub will show your live URL, e.g.
   `https://yourusername.github.io/gridcell-website/`.

### Using a custom domain (optional)
If you later buy a domain, add a `CNAME` file at the repo root containing
just the domain name, then point your domain's DNS `A`/`CNAME` records to
GitHub Pages per [GitHub's custom domain docs](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site).

## 3. Editing content

- All visible text is in `index.html` — search for the section you want to
  change (`<!-- ============ SERVICES ============ -->` etc.) and edit directly.
- Colors and spacing live in `style.css` under `:root` at the top (change the
  hex values once, and they update everywhere).
- Company contact details (phone, email, LinkedIn) appear in three places in
  `index.html`: the "About" section, the "Contact" section, and the footer —
  update all three if they ever change.

## 4. Local preview before publishing

You can just double-click `index.html` to open it in a browser, or for a
closer-to-production preview, run a simple local server from this folder:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.
