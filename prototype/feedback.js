/* ═══════════════════════════════════════════════════════════════════════
   feedback.js — shared draft ribbon + feedback widget
   Loaded by both views. Self-contained: injects its own CSS and DOM.

   MODE: email. Answers are assembled into a structured message and handed
   to the person's mail client via mailto:, with a copy-to-clipboard
   fallback for anyone without one configured. Zero setup, zero backend,
   works the moment the site is live.

   ── TO UPGRADE TO A GOOGLE FORM LATER (~5 min) ──────────────────────
   Set CFG.formAction to your form's .../formResponse URL and fill in the
   four entry IDs. The widget then POSTs into a hidden iframe, so the
   person never leaves the page, and results land in a Sheet. Everything
   else keeps working unchanged. Instructions in DEPLOY.md.
   ══════════════════════════════════════════════════════════════════════ */

(function () {
  const CFG = {
    // Where email feedback goes. Add Lucas here too: 'a@x.edu,b@y.edu'
    // NOTE: this address is visible in the page source on a public URL.
    // The site is noindex + unlisted, so scraping exposure is low, but if
    // you'd rather not publish it, swap in an alias.
    to: 'natwong@stanford.edu',
    subject: 'A&D map — feedback',

    // Optional Google Form upgrade. Leave formAction '' to stay on email.
    formAction: '',
    entry: { learned: '', named: '', wanted: '', context: '' },

    // Shown in the ribbon
    draftNote: 'Working draft. Coverage percentages and risk ratings are our ' +
               'estimates, not published statistics — the underlying facts are sourced. ' +
               'Tell us what looks wrong.',
  };

  /* ── styles ─────────────────────────────────────────────────────── */
  const css = `
  #adfb-ribbon { position: fixed; z-index: 40; top: 0; left: 0; right: 0;
    background: #1c1405; border-bottom: 1px solid #4a3a12;
    color: #f0dfae; font: 400 12px/1.5 ui-sans-serif, -apple-system, sans-serif;
    padding: 8px 46px 8px 16px; text-align: center; }
  #adfb-ribbon b { color: #ffd98a; font-weight: 640; }
  #adfb-ribbon button { position: absolute; top: 5px; right: 9px; background: none;
    border: none; color: #a08a55; font-size: 17px; cursor: pointer; padding: 2px 6px;
    width: auto; flex: none; line-height: 1; }
  #adfb-ribbon button:hover { color: #ffd98a; background: none; }
  body.adfb-ribbon-on { --adfb-top: 37px; }

  #adfb-btn { position: fixed; z-index: 41; right: 22px; bottom: 22px;
    padding: 10px 17px; border-radius: 999px; cursor: pointer;
    border: 1px solid #2c3852; background: #101728; color: #e8ecf8;
    font: 500 13px ui-sans-serif, -apple-system, sans-serif;
    box-shadow: 0 6px 22px rgba(0,0,0,.45); width: auto; flex: none; }
  #adfb-btn:hover { background: #18213a; border-color: #3d4c6e; }

  #adfb-panel { position: fixed; z-index: 42; right: 22px; bottom: 22px;
    width: 352px; max-width: calc(100vw - 32px); max-height: calc(100vh - 44px);
    overflow-y: auto; background: #0a0e1a; border: 1px solid #2c3852;
    border-radius: 14px; padding: 18px 19px 19px;
    box-shadow: 0 16px 50px rgba(0,0,0,.6);
    font: 400 13px/1.55 ui-sans-serif, -apple-system, sans-serif; color: #e8ecf8;
    display: none; }
  #adfb-panel.open { display: block; }
  #adfb-panel h3 { margin: 0 0 3px; font-size: 15px; font-weight: 620; }
  #adfb-panel .sub { font-size: 12px; color: #8b95b2; margin-bottom: 15px; }
  #adfb-panel label { display: block; font-size: 11.5px; color: #8b95b2;
    margin: 15px 0 7px; }
  #adfb-panel .opts { display: flex; flex-direction: column; gap: 5px; }
  #adfb-panel .opt { display: flex; align-items: center; gap: 9px;
    padding: 8px 11px; border: 1px solid #1e2637; border-radius: 8px;
    cursor: pointer; font-size: 12.5px; background: #0c1220; }
  #adfb-panel .opt:hover { border-color: #3d4c6e; }
  #adfb-panel .opt.sel { border-color: #4dd0e1; background: #10202a; }
  #adfb-panel .opt i { width: 9px; height: 9px; border-radius: 50%;
    border: 1px solid #47536f; flex: 0 0 auto; }
  #adfb-panel .opt.sel i { background: #4dd0e1; border-color: #4dd0e1; }
  #adfb-panel input[type=text], #adfb-panel textarea {
    width: 100%; padding: 9px 11px; border-radius: 8px; border: 1px solid #1e2637;
    background: #0c1220; color: #e8ecf8; font: inherit; font-size: 12.5px;
    outline: none; resize: vertical; }
  #adfb-panel input:focus, #adfb-panel textarea:focus { border-color: #3d4c6e; }
  #adfb-panel textarea { min-height: 74px; }
  #adfb-panel .ctx { font-size: 10.5px; color: #59617d; margin-top: 13px;
    font-family: ui-monospace, monospace; }
  #adfb-panel .row { display: flex; gap: 8px; margin-top: 16px; }
  #adfb-panel .row button { flex: 1; padding: 9px 12px; border-radius: 8px;
    cursor: pointer; font: inherit; font-size: 12.5px; border: 1px solid #2c3852;
    background: #101728; color: #e8ecf8; }
  #adfb-panel .row button.go { background: #1c4a55; border-color: #2a7180;
    color: #d6f6fb; font-weight: 560; }
  /* index.html has a global button:hover rule; restate background and border
     here so it cannot bleed through into the widget. (Do not use backticks in
     this comment — it lives inside a template literal.) */
  #adfb-panel .row button:hover { background: #18213a; border-color: #3d4c6e; }
  #adfb-panel .row button.go:hover { background: #246070; border-color: #35909f; }
  #adfb-x { position: absolute; top: 13px; right: 14px; background: none;
    border: none; color: #8b95b2; font-size: 17px; cursor: pointer;
    padding: 0; width: auto; flex: none; }
  #adfb-x:hover { color: #e8ecf8; background: none; }
  #adfb-done { display: none; text-align: center; padding: 14px 4px 6px; }
  #adfb-done.open { display: block; }
  #adfb-done .tick { font-size: 26px; color: #4ade80; }
  #adfb-done p { font-size: 12.5px; color: #8b95b2; margin: 9px 0 0; }
  #adfb-copy { font-size: 11.5px; color: #7fb0ff; background: none; border: none;
    cursor: pointer; padding: 0; margin-top: 11px; width: auto; flex: none;
    text-decoration: underline; }
  @media (max-width: 560px) {
    #adfb-panel { right: 16px; left: 16px; width: auto; }
    #adfb-ribbon { font-size: 11px; padding: 7px 40px 7px 12px; }
  }`;
  const st = document.createElement('style'); st.textContent = css;
  document.head.appendChild(st);

  /* ── draft ribbon ───────────────────────────────────────────────── */
  let ribbonDismissed = false;
  try { ribbonDismissed = sessionStorage.getItem('adfb-ribbon') === 'off'; } catch (e) {}
  if (!ribbonDismissed) {
    const rib = document.createElement('div');
    rib.id = 'adfb-ribbon';
    rib.innerHTML = `<b>Working draft.</b> ${CFG.draftNote}
      <button title="Dismiss" aria-label="Dismiss">&times;</button>`;
    document.body.appendChild(rib);
    document.body.classList.add('adfb-ribbon-on');
    rib.querySelector('button').onclick = () => {
      rib.remove(); document.body.classList.remove('adfb-ribbon-on');
      try { sessionStorage.setItem('adfb-ribbon', 'off'); } catch (e) {}
    };
  }

  /* ── widget ─────────────────────────────────────────────────────── */
  const LEARNED = [
    ['several', "Yes — several things I didn't know"],
    ['one',     "Yes — one thing"],
    ['no',      'No, nothing new to me'],
  ];

  const btn = document.createElement('button');
  btn.id = 'adfb-btn'; btn.textContent = 'Feedback';
  document.body.appendChild(btn);

  const panel = document.createElement('div');
  panel.id = 'adfb-panel';
  panel.innerHTML = `
    <button id="adfb-x" title="Close" aria-label="Close">&times;</button>
    <div id="adfb-form">
      <h3>Was this useful?</h3>
      <div class="sub">Three questions, about sixty seconds.</div>

      <label>Did this show you a company or a supply-chain issue you didn't already know?</label>
      <div class="opts" id="adfb-learned">${LEARNED.map(([v, l]) =>
        `<div class="opt" data-v="${v}"><i></i><span>${l}</span></div>`).join('')}</div>

      <label for="adfb-named">Name one, if you can. <span style="color:#59617d">(optional)</span></label>
      <input type="text" id="adfb-named" placeholder="e.g. Hadrian, or the titanium sponge thing" />

      <label for="adfb-wanted">What would make this more useful to you?</label>
      <textarea id="adfb-wanted" placeholder="What's missing, what's confusing, what you'd actually use it for…"></textarea>

      <label for="adfb-who">Your name <span style="color:#59617d">(optional — helps us follow up)</span></label>
      <input type="text" id="adfb-who" placeholder="" />

      <div class="ctx" id="adfb-ctx"></div>
      <div class="row">
        <button id="adfb-cancel">Cancel</button>
        <button id="adfb-send" class="go">Send</button>
      </div>
    </div>
    <div id="adfb-done">
      <div class="tick">&#10003;</div>
      <p>Thank you — this is genuinely the useful part.<br />
         If your mail client didn't open, copy the text instead:</p>
      <button id="adfb-copy">Copy feedback to clipboard</button>
    </div>`;
  document.body.appendChild(panel);

  const $ = id => panel.querySelector('#' + id);
  let learned = '';

  const open = () => { panel.classList.add('open'); btn.style.display = 'none';
    $('adfb-ctx').textContent = 'context · ' + context(); };
  const close = () => { panel.classList.remove('open'); btn.style.display = ''; };
  btn.onclick = open;
  $('adfb-x').onclick = close;
  $('adfb-cancel').onclick = close;

  $('adfb-learned').addEventListener('click', e => {
    const o = e.target.closest('.opt'); if (!o) return;
    learned = o.dataset.v;
    [...$('adfb-learned').children].forEach(x => x.classList.toggle('sel', x === o));
  });

  /* Which view, and what they were looking at. Each page may define
     window.AD_CONTEXT() to describe its own state. */
  function context() {
    const page = location.pathname.split('/').pop() || 'index.html';
    const view = page.includes('valuechain') ? 'value chain' : 'constellation';
    let extra = '';
    try { extra = (typeof window.AD_CONTEXT === 'function' && window.AD_CONTEXT()) || ''; }
    catch (e) {}
    return view + (extra ? ' · ' + extra : '');
  }

  function body() {
    const label = (LEARNED.find(([v]) => v === learned) || [, '(not answered)'])[1];
    return [
      'Learned something new: ' + label,
      'Named: ' + ($('adfb-named').value.trim() || '—'),
      '',
      'What would make it more useful:',
      $('adfb-wanted').value.trim() || '—',
      '',
      'From: ' + ($('adfb-who').value.trim() || 'anonymous'),
      'Context: ' + context(),
      'Screen: ' + innerWidth + '×' + innerHeight,
      'Sent: ' + new Date().toISOString(),
    ].join('\n');
  }

  $('adfb-send').onclick = () => {
    const text = body();

    if (CFG.formAction && CFG.entry.learned) {
      // Google Form mode: a real form POST into a hidden iframe. Not fetch —
      // fetch would be blocked by CORS; a form submit is not.
      const sink = document.createElement('iframe');
      sink.name = 'adfb-sink'; sink.style.display = 'none';
      document.body.appendChild(sink);
      const f = document.createElement('form');
      f.action = CFG.formAction; f.method = 'POST'; f.target = 'adfb-sink';
      const put = (k, v) => { if (!k) return;
        const i = document.createElement('input');
        i.type = 'hidden'; i.name = k; i.value = v; f.appendChild(i); };
      put(CFG.entry.learned, learned);
      put(CFG.entry.named,   $('adfb-named').value.trim());
      put(CFG.entry.wanted,  $('adfb-wanted').value.trim());
      put(CFG.entry.context, context() + ' | ' + ($('adfb-who').value.trim() || 'anonymous'));
      document.body.appendChild(f); f.submit(); f.remove();
    } else {
      // Email mode (default).
      const url = 'mailto:' + CFG.to
        + '?subject=' + encodeURIComponent(CFG.subject)
        + '&body=' + encodeURIComponent(text);
      const w = window.open(url, '_blank');
      if (!w) location.href = url;
    }

    $('adfb-form').style.display = 'none';
    $('adfb-done').classList.add('open');
    $('adfb-copy').onclick = async () => {
      try { await navigator.clipboard.writeText(CFG.to + '\n\n' + text);
        $('adfb-copy').textContent = 'Copied — paste it into an email'; }
      catch (e) { $('adfb-copy').textContent = 'Copy failed — select the page and copy manually'; }
    };
    setTimeout(() => { close();
      $('adfb-form').style.display = ''; $('adfb-done').classList.remove('open');
    }, 5200);
  };

  addEventListener('keydown', e => {
    if (e.key === 'Escape' && panel.classList.contains('open')) close();
  });
})();
