document.addEventListener('DOMContentLoaded', function () {
  /* navigation mobile */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () { nav.classList.toggle('open'); });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  /* formulaire (démonstration : non connecté à un serveur) */
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = form.querySelector('.form-note');
      if (note) note.classList.add('show');
      form.reset();
    });
  }

  /* accordéon des expertises */
  document.querySelectorAll('.sr-head').forEach(function (head) {
    head.setAttribute('aria-expanded', 'false');
    head.addEventListener('click', function () {
      var row = head.closest('.service-row');
      var wasOpen = row.classList.contains('open');
      row.parentNode.querySelectorAll('.service-row.open').forEach(function (r) {
        r.classList.remove('open');
        r.querySelector('.sr-head').setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen) { row.classList.add('open'); head.setAttribute('aria-expanded', 'true'); }
    });
  });
  var hash = window.location.hash ? window.location.hash.slice(1) : '';
  if (hash) {
    var target = document.getElementById(hash);
    if (target && target.classList.contains('service-row')) target.classList.add('open');
  }

  /* diagnostic interactif */
  var diag = document.getElementById('diag');
  if (diag) {
    var results = {};
    try { results = JSON.parse(diag.getAttribute('data-results') || '{}'); } catch (e) { results = {}; }
    var ctaLabel = diag.getAttribute('data-cta') || 'Voir';
    var opts = diag.querySelectorAll('.diag-opt');
    var resultBox = diag.querySelector('.diag-result');
    var resetBtn = diag.querySelector('.diag-reset');
    opts.forEach(function (opt) {
      opt.addEventListener('click', function () {
        opts.forEach(function (o) { o.classList.remove('selected'); });
        opt.classList.add('selected');
        var r = results[opt.getAttribute('data-key')];
        if (!r) return;
        resultBox.innerHTML = '';
        var tag = document.createElement('span'); tag.className = 'dr-tag';
        tag.style.background = 'color-mix(in srgb, ' + r.color + ' 14%, white)'; tag.style.color = r.color; tag.textContent = r.tag;
        var h = document.createElement('h4'); h.textContent = r.title;
        var p = document.createElement('p'); p.textContent = r.text;
        var a = document.createElement('a'); a.className = 'btn btn-wine'; a.href = r.link; a.textContent = ctaLabel;
        resultBox.appendChild(tag); resultBox.appendChild(h); resultBox.appendChild(p); resultBox.appendChild(a);
        resultBox.classList.add('show');
      });
    });
    if (resetBtn) resetBtn.addEventListener('click', function () {
      opts.forEach(function (o) { o.classList.remove('selected'); });
      resultBox.classList.remove('show'); resultBox.innerHTML = '';
    });
  }

  /* compteurs animés */
  var counters = document.querySelectorAll('.cnum[data-target]');
  function render(el, val) {
    var suffix = el.getAttribute('data-suffix') || '';
    el.textContent = val;
    if (suffix) { var s = document.createElement('span'); s.className = 'suffix'; s.textContent = suffix; el.appendChild(s); }
  }
  function animate(el) {
    var target = parseInt(el.getAttribute('data-target'), 10), start = null;
    function step(ts) {
      if (!start) start = ts;
      var k = Math.min((ts - start) / 900, 1);
      render(el, Math.round(target * (1 - Math.pow(1 - k, 3))));
      if (k < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if (counters.length) {
    if ('IntersectionObserver' in window) {
      var seen = new WeakSet();
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting && !seen.has(en.target)) { seen.add(en.target); animate(en.target); }
        });
      }, { threshold: 0.4 });
      counters.forEach(function (c) { obs.observe(c); });
    } else {
      counters.forEach(function (c) { render(c, c.getAttribute('data-target')); });
    }
  }

  /* fenêtre de choix de langue (accueil, première visite) */
  var overlay = document.getElementById('lang-modal-overlay');
  if (overlay) {
    var KEY = 'rigorislex_lang_prompted', already = false;
    try { already = localStorage.getItem(KEY) === '1'; } catch (e) { already = false; }
    function remember() { try { localStorage.setItem(KEY, '1'); } catch (e) {} }
    function dismiss() { remember(); overlay.hidden = true; }
    if (!already) overlay.hidden = false;
    var skip = overlay.querySelector('.lm-skip');
    if (skip) skip.addEventListener('click', dismiss);
    overlay.querySelectorAll('.lm-opt').forEach(function (a) { a.addEventListener('click', remember); });
    overlay.addEventListener('click', function (e) { if (e.target === overlay) dismiss(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !overlay.hidden) dismiss(); });
  }
});

/* onglets des profils (pains / gains) */
document.addEventListener('DOMContentLoaded', function () {
  var tabs = document.querySelectorAll('.seg-tab');
  if (!tabs.length) return;
  function show(key, focus) {
    tabs.forEach(function (t) {
      var on = t.getAttribute('data-key') === key;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      if (on && focus) t.focus();
    });
    document.querySelectorAll('.seg-panel').forEach(function (p) { p.hidden = p.getAttribute('data-key') !== key; });
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { show(t.getAttribute('data-key')); });
    t.addEventListener('keydown', function (e) {
      var rtl = document.documentElement.dir === 'rtl';
      var next = (e.key === 'ArrowRight') !== rtl ? 1 : -1;
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        var n = tabs[(i + next + tabs.length) % tabs.length];
        show(n.getAttribute('data-key'), true);
      }
    });
  });
  var h = window.location.hash ? window.location.hash.slice(1) : '';
  if (h.indexOf('profil-') === 0) show(h.slice(7));
});
