# Deploy to Vercel

Everything in the repo is ready. The two things I can't do are the ones that
need your login: creating the GitHub repo and signing into Vercel. Those are
the only manual steps.

---

## What's ready

The repo root has a `vercel.json` that tells Vercel to serve the `prototype/`
folder as the site root, so **the Vercel import needs no settings changed** —
no build command, no root directory, no output directory. Import and deploy.

| File | Purpose |
|---|---|
| `vercel.json` (repo root) | Serves `prototype/` as the site; `noindex` headers, cache policy |
| `prototype/index.html` | Constellation view (entry point) |
| `prototype/valuechain.html` | Value chain view |
| `prototype/data.js` | The shared dataset both views read |
| `prototype/feedback.js` | Draft ribbon + feedback widget |
| `prototype/robots.txt` | `Disallow: /` while it's a draft |
| `prototype/favicon.svg` | So the browser tab isn't a blank page icon |

Total payload: about 135 KB. One external request at runtime —
`3d-force-graph` from jsDelivr, used only by the constellation view. The value
chain view has zero dependencies and works offline.

---

## Deploy it (GitHub + Vercel — recommended)

The local git repo is already initialised and committed. You need to create an
empty GitHub repo and push to it.

**1. Create the repo.** Go to [github.com/new](https://github.com/new). Name it
`ad-constellation`, set it **Private**, and **do not** add a README,
`.gitignore`, or licence — the repo already has them. Copy the URL it shows you.

**2. Push** — from `ad-constellation/`, with your GitHub username swapped in:

```bash
git remote add origin https://github.com/YOUR-USERNAME/ad-constellation.git && git push -u origin main
```

**3. Import into Vercel.** Go to
[vercel.com/new](https://vercel.com/new), sign in with GitHub, pick the
`ad-constellation` repo, and click **Deploy**. Change nothing on the
configuration screen — the root `vercel.json` already handles it.

You'll get something like `https://ad-constellation.vercel.app`. That's the link
you share. Hobby plan, $0.

### To update it later

```bash
git add -A && git commit -m "your message" && git push
```

Every push redeploys automatically, and every pull request gets its own preview
URL — genuinely useful when you and Lucas are both editing `data.js`.

---

## Alternative: Vercel CLI, no GitHub

Run these from the repo root (not from `prototype/` — the config lives at the
root now):

```bash
npm i -g vercel
vercel login     # opens your browser — "Continue with Google" works
vercel           # first deploy; accept every default
vercel --prod    # promote it to the real URL
```

Faster to a URL, but you lose preview deploys and the push-to-update loop.

## Alternative: zero CLI, zero GitHub

**Netlify Drop** (`app.netlify.com/drop`) takes a folder in the browser with no
account and no CLI — drag in `prototype/`. Same $0 static hosting. Note that
`vercel.json` is Vercel-only, so you'd lose the `X-Robots-Tag` header; the
`robots.txt` and the meta tags still apply.

---

## After it's live — 2-minute check

Open the URL on a machine that has never seen the project and confirm:

- [ ] Constellation loads and nodes appear (this is the one that needs the CDN —
      if the graph is blank, jsDelivr is blocked on that network)
- [ ] The **Value chain** link in the top bar works
- [ ] The amber **Working draft** ribbon is at the top
- [ ] The **Feedback** button is bottom-right, and opens the panel
- [ ] Clicking a segment, switching lenses, and the three tabs all work
- [ ] Open it on your phone — it should be usable, not beautiful
- [ ] `yoursite.vercel.app/robots.txt` shows `Disallow: /`

If the constellation is blank but the value chain works, that's the CDN, not
your code. Worth knowing before someone tells you "it's broken."

---

## How feedback reaches you

The **Feedback** button is on both views. It asks three questions, then opens
the person's mail client with a structured message addressed to
`natwong@stanford.edu`, including which view and which segment they were looking
at when they clicked. If their mail client doesn't open, there's a
copy-to-clipboard fallback.

**Add Lucas:** open `prototype/feedback.js`, line ~23:

```js
to: 'natwong@stanford.edu,lucas@stanford.edu',
```

Then commit and push (or `vercel --prod` if you're on the CLI path).

**Note:** that address is visible in the page source. The site is `noindex` and
unlisted so scraping exposure is low, but if you'd rather not publish it, use an
alias.

### Upgrading to a Google Form later (~5 min)

Email works from minute one but you'll be collating by hand. Once you have more
than ~10 responses, switch to a Form so answers land in a Sheet:

1. Create a Google Form with four questions, in this order — a multiple choice,
   then three short answers: *learned something new*, *named it*, *what would
   make it useful*, *context*.
2. Click **Send → link**, open the form, then **view page source** and search
   for `entry.` — you'll find an ID like `entry.1234567890` for each question,
   in order.
3. Take the form URL and change the trailing `/viewform` to `/formResponse`.
4. Fill both into `prototype/feedback.js`:

```js
formAction: 'https://docs.google.com/forms/d/e/1FAIpQL.../formResponse',
entry: { learned:'entry.111', named:'entry.222', wanted:'entry.333', context:'entry.444' },
```

5. Commit and push.

The widget then POSTs directly into the form — the person never leaves the
page. (It uses a real form POST into a hidden iframe rather than `fetch`,
because `fetch` to Google Forms is blocked by CORS and a form submit isn't.)

---

## When you're ready to make it public

Right now the site is deliberately hard to find: `robots.txt` disallows
everything, `vercel.json` sends `X-Robots-Tag: noindex`, and both pages carry a
`noindex` meta tag. That is the right setting for a draft carrying estimates
under your names.

To lift it later you have to change all three, which is intentional friction —
so you don't do it by accident:

1. `prototype/robots.txt` → `Allow: /`
2. `vercel.json` (repo root) → remove the `X-Robots-Tag` header
3. Both HTML files → remove the `<meta name="robots">` line

**Do that only after** the coverage and risk scores have been replaced with
sourced figures, or removed. `docs/06-cost-model.md` calls this the reputational
cost line, and this is the mechanism by which you'd pay it.

---

## A custom domain, if you want one

Vercel: **Project → Settings → Domains → Add**. A `.com` is about $12/yr at
Cloudflare Registrar or Namecheap. Free tier includes the SSL certificate.

Not necessary for a feedback round. `ad-value-chain.vercel.app` is fine and
signals "prototype", which is accurate and buys you goodwill.
