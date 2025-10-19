# Publish to GitHub from Flask (Auto Commit + Push)

This adds a small Flask backend that commits and pushes your workspace to GitHub when you click a Publish button or call an endpoint.

## What you get
- Endpoint: `POST http://127.0.0.1:5001/publish`
- Actions: `git add -A`, `git commit -m`, `git push`
- Auth: GitHub token via environment variable (no token stored in code)

Backend source: `app.py` (or your Flask entrypoint)

---

## Prerequisites

- Git installed (verify in PowerShell):
  ```powershell
  git --version
  ```
- Python 3.9+ installed:
  ```powershell
  python --version
  ```
- A GitHub repository created (HTTPS recommended)
- A GitHub Personal Access Token (classic) with `repo` scope
  - Create at: https://github.com/settings/tokens

---

## Configure (Windows PowerShell)

1) Create a `.env` from the template
```powershell
Copy-Item .env.example .env
```

2) Edit `.env` and set:
- REPO_DIR = absolute path to your local repo (e.g., `C:/Users/DELL/Downloads/files`)
- GITHUB_TOKEN = your token (format: `ghp_xxx...`)
- GITHUB_REPO_URL = `https://github.com/USERNAME/REPO.git`
- PUBLISH_BRANCH = `dev` (or `main`)
- Optional: GIT_AUTHOR_NAME, GIT_AUTHOR_EMAIL

3) Create and activate a virtual environment (optional but recommended)
```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

4) Install backend dependencies
```powershell
pip install -r requirements.txt
```

---

## Run the Flask server
```powershell
python app.py
```
- Server runs at: `http://127.0.0.1:5001`
- Health check: `GET /health`

---

## Test the publish endpoint

- Quick test in browser:
  - Navigate to: `http://127.0.0.1:5001/publish`
- Or with PowerShell:
  ```powershell
  Invoke-WebRequest -Uri "http://127.0.0.1:5001/publish" -Method Get | Select-Object -ExpandProperty Content
  ```
- Or with a commit message:
  ```powershell
  Invoke-WebRequest -Uri "http://127.0.0.1:5001/publish?message=Auto%20publish%20from%20admin" -Method Get | Select-Object -ExpandProperty Content
  ```
- For POST JSON:
  ```powershell
  Invoke-RestMethod -Uri "http://127.0.0.1:5001/publish" -Method Post -ContentType 'application/json' -Body '{"message":"Auto publish from site"}'
  ```

Expected JSON response:
```json
{
  "ok": true,
  "pushed": true,
  "message": "Committed and pushed",
  "branch": "dev",
  "repoDir": "C:/Users/DELL/Downloads/files",
  "remote": "origin"
}
```

---

## Security notes

- The token is read from environment (.env) and is never stored in the repo URL permanently.
- The remote URL is temporarily set with the token only for the push, and restored immediately.
- Keep your `.env` file out of version control.

---

## Optional: Wire a Publish button in your admin

Add a button in your admin HTML:
```html
<button onclick="publishToGitHub()" class="px-4 py-2 bg-primary text-white rounded">Publish</button>
```

Add a function in your JS:
```javascript
async function publishToGitHub() {
  try {
    const res = await fetch('http://127.0.0.1:5001/publish?message=' + encodeURIComponent('Publish from Admin'), { method: 'GET' });
    const data = await res.json();
    if (data.ok) {
      alert('Published successfully to GitHub (' + data.branch + ')');
    } else {
      alert('Publish failed: ' + (data.error || 'Unknown error'));
    }
  } catch (e) {
    alert('Publish error: ' + e.message);
  }
}
```

Note: For production, restrict the backend endpoint and enable CORS properly.

---

## Troubleshooting

- fatal: could not read Username for 'https://github.com':
  - Ensure `GITHUB_TOKEN` is set and `GITHUB_REPO_URL` is HTTPS.
- error: src refspec dev does not match any:
  - Ensure the branch exists locally or set `PUBLISH_BRANCH` to an existing branch.
- Permission denied:
  - Regenerate your token with `repo` scope; verify 2FA requirements.
- No changes to commit:
  - The endpoint still performs a push; if nothing changed, message will say "Pushed (no new commit)".

---

## Files created
- `app.py` — Flask app with /publish endpoint
- `requirements.txt` — Dependencies
- `.env.example` — Env template
- `publish_automation.md` — This guide

---

Happy publishing! 🚀