/* app.js — Tysers reimagined prototype behaviour.
   Shared interactions live in wireframe.js; this file adds the prototype
   layer (notes switch, journeys, pager) and the data-driven page modules.
   Every renderer is keyed off an element on the page, so a page only gets
   the behaviour it declares. Vanilla JS, no dependencies. */

(function () {
  'use strict';

  var TY = window.TY || {};
  var ROOT = /\/(pages|modules)\//.test(location.pathname) ? '../' : './';

  /* ---------- helpers ---------- */
  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  function esc(t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  /* Text in [square brackets] is new content: render it as a visible placeholder. */
  function ph(t) { return esc(t).replace(/\[([^\]]+)\]/g, '<span class="ph-copy">[$1]</span>'); }
  function store(k, v) { try { if (v === undefined) return sessionStorage.getItem(k); sessionStorage.setItem(k, v); } catch (e) { return null; } }
  /* Query string first. As a fallback for hosts that strip query strings,
     a click on any link with parameters stores them for the next page,
     which reads them once and clears them, so nothing goes stale. */
  var PARAMS = (function () {
    var q = new URLSearchParams(location.search), out = {};
    q.forEach(function (v, k) { out[k] = v; });
    if (!location.search) {
      try {
        var next = JSON.parse(sessionStorage.getItem('ty-next') || 'null');
        if (next && location.pathname.slice(-next.path.length) === next.path) out = next.params;
      } catch (e) { /* storage unavailable */ }
    }
    try { sessionStorage.removeItem('ty-next'); } catch (e) { /* storage unavailable */ }
    return out;
  })();
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href*="?"]');
    if (!a) return;
    try {
      var u = new URL(a.href, location.href), params = {};
      u.searchParams.forEach(function (v, k) { params[k] = v; });
      sessionStorage.setItem('ty-next', JSON.stringify({ path: u.pathname.split('/').slice(-2).join('/'), params: params }));
    } catch (err) { /* storage unavailable */ }
  });
  function param(name) { return Object.prototype.hasOwnProperty.call(PARAMS, name) ? PARAMS[name] : null; }
  function specById(id) { return (TY.specialties || []).filter(function (s) { return s[0] === id; })[0]; }
  function personById(id) { return (TY.people || []).filter(function (p) { return p[0] === id; })[0]; }
  function specLink(id) { return ROOT + 'pages/specialty.html?id=' + encodeURIComponent(id); }
  function personLink(id) { return ROOT + 'pages/person.html?id=' + encodeURIComponent(id); }
  function fmtDate(iso) {
    if (!iso) return 'Draft';
    var d = new Date(iso + 'T12:00:00');
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  }
  function initials(n) { return n.indexOf('[') === 0 ? 'Photo' : n.split(' ').map(function (w) { return w[0]; }).join('').slice(0, 2); }

  function personCard(p, opts) {
    opts = opts || {};
    var contact = '';
    if (!opts.noContact && (p[6] || p[7])) {
      contact = '<div class="contact">' + (p[6] ? '<span>' + ph(p[6]) + '</span>' : '') + (p[7] ? '<span>' + ph(p[7]) + '</span>' : '') +
        '<a href="' + ROOT + 'pages/contact.html?to=' + encodeURIComponent(p[0]) + '">Send ' + esc(p[1].indexOf('[') === 0 ? 'an' : p[1].split(' ')[0] + ' an') + ' enquiry</a></div>';
    }
    var tags = (p[4] || []).slice(0, 3).map(function (id) { var s = specById(id); return s ? '<span class="chip-s">' + esc(s[1]) + '</span>' : ''; }).join('');
    return '<article class="person"><div class="wf-placeholder avatar" aria-hidden="true">' + esc(initials(p[1])) + '</div>' +
      '<h3><a href="' + personLink(p[0]) + '">' + ph(p[1]) + '</a></h3><span class="role">' + ph(p[2]) + '</span>' +
      '<span class="role">' + esc(p[5]) + '</span>' + (tags ? '<div class="tags">' + tags + '</div>' : '') + contact + '</article>';
  }

  function insightCard(i) {
    var a = i[6] ? personById(i[6]) : null;
    var mins = i[3] === 'People news' ? 2 : i[3] === 'Report' ? 6 : 4;
    return '<article class="ins"><div class="meta"><span>' + esc(i[3]) + '</span><span>' + fmtDate(i[2]) + '</span><span>' + mins + ' min read</span></div>' +
      '<h3><a href="' + ROOT + (i[0].indexOf('pi-2026') === 0 ? 'pages/pi-report.html' : 'pages/article.html?id=' + i[0]) + '">' + ph(i[1]) + '</a></h3>' +
      '<p>' + ph(i[5]) + '</p>' + (a ? '<div class="meta">By ' + ph(a[1]) + '</div>' : '') + '</article>';
  }

  /* ---------- prototype layer ---------- */
  function initProto() {
    var sw = $('#notes-switch');
    var on = store('ty-notes') === '1';
    var hasNotes = !!$('.wf-note, .proposal');
    function apply() {
      document.body.classList.toggle('notes-on', on);
      if (sw) sw.setAttribute('aria-pressed', on ? 'true' : 'false');
    }
    if (sw) {
      if (!hasNotes) sw.hidden = true;
      sw.addEventListener('click', function () { on = !on; store('ty-notes', on ? '1' : '0'); apply(); });
    }
    apply();

    var j = document.body.getAttribute('data-journey');
    $$('.proto-nav [data-j]').forEach(function (a) { if (a.getAttribute('data-j') === j) a.setAttribute('aria-current', 'true'); });

    var pager = $('#pager');
    if (pager && TY.tour) {
      var here = location.pathname.replace(/\/$/, '/index.html');
      var idx = -1;
      TY.tour.forEach(function (t, i) { var path = t[0].split('?')[0]; if (here.slice(-path.length) === path) idx = i; });
      if (idx > -1) {
        var html = '';
        if (idx > 0) html += '<a class="prev" href="' + ROOT + TY.tour[idx - 1][0] + '"><span>Previous in the tour</span>&larr; ' + esc(TY.tour[idx - 1][1]) + '</a>';
        if (idx < TY.tour.length - 1) html += '<a class="next" href="' + ROOT + TY.tour[idx + 1][0] + '"><span>Next in the tour</span>' + esc(TY.tour[idx + 1][1]) + ' &rarr;</a>';
        pager.innerHTML = html;
      }
    }
  }

  function initMenu() {
    var btn = $('.menu-toggle'), header = $('.site-header');
    if (!btn || !header) return;
    btn.addEventListener('click', function () {
      var open = !header.classList.contains('menu-open');
      header.classList.toggle('menu-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.textContent = open ? 'Close' : 'Menu';
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && header.classList.contains('menu-open')) { header.classList.remove('menu-open'); btn.setAttribute('aria-expanded', 'false'); btn.textContent = 'Menu'; btn.focus(); }
    });
  }

  /* Header search and any form with data-search submit to the search page */
  function initSearchForms() {
    $$('form[data-search]').forEach(function (f) {
      f.addEventListener('submit', function (e) {
        e.preventDefault();
        var q = (f.querySelector('input[name="q"]') || {}).value || '';
        location.href = ROOT + 'pages/search.html?q=' + encodeURIComponent(q.trim());
      });
    });
  }

  /* Pause control for any background video placeholder (R07) */
  function initVideo() {
    $$('.video-wrap .pause').forEach(function (b) {
      var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var paused = reduce;
      function set() { b.textContent = paused ? 'Play video' : 'Pause video'; b.setAttribute('aria-pressed', paused ? 'true' : 'false'); var l = b.parentNode.querySelector('.state'); if (l) l.textContent = paused ? 'Video paused: still frame shown' : 'Video playing, muted'; }
      b.addEventListener('click', function () { paused = !paused; set(); });
      set();
    });
  }

  /* ---------- Specialties A to Z (R25) ---------- */
  function initAZ() {
    var host = $('#az-results');
    if (!host) return;
    var q = $('#az-q'), div = $('#az-div'), ind = $('#az-ind');
    var p = param('q'); if (p) q.value = p;
    var pi = param('ind'); if (pi) ind.value = pi;
    var pd = param('div'); if (pd) div.value = pd;
    function render() {
      var term = q.value.trim().toLowerCase();
      var rows = TY.specialties.filter(function (s) {
        return (!term || (s[1] + ' ' + s[3] + ' ' + s[5]).toLowerCase().indexOf(term) > -1) &&
          (!div.value || s[2] === div.value) && (!ind.value || s[4].join(' ').indexOf(ind.value) > -1);
      }).sort(function (a, b) { return a[1].localeCompare(b[1]); });
      $('#az-count').textContent = rows.length + ' of ' + TY.specialties.length + ' specialties';
      if (!rows.length) { host.innerHTML = '<p class="empty-state">No specialties match. Try a broader term, or <a href="' + ROOT + 'pages/contact.html">tell us what you need to cover</a>.</p>'; return; }
      var groups = {};
      rows.forEach(function (s) { var L = s[1][0].toUpperCase(); (groups[L] = groups[L] || []).push(s); });
      host.innerHTML = Object.keys(groups).sort().map(function (L) {
        return '<div class="az-group"><h2>' + L + '</h2><ul class="az-list">' + groups[L].map(function (s) {
          return '<li><a href="' + specLink(s[0]) + '">' + esc(s[1]) + '</a><small>' + esc(s[2]) + ' · ' + esc(s[3]) + '</small></li>';
        }).join('') + '</ul></div>';
      }).join('');
    }
    [q, div, ind].forEach(function (el) { el.addEventListener('input', render); el.addEventListener('change', render); });
    $('#az-reset').addEventListener('click', function () { q.value = ''; div.value = ''; ind.value = ''; render(); q.focus(); });
    render();
  }

  /* ---------- People directory (R26) ---------- */
  function initPeople() {
    var host = $('#people-results');
    if (!host) return;
    var q = $('#pp-q'), div = $('#pp-div'), off = $('#pp-office'), spec = $('#pp-spec');
    TY.specialties.slice().sort(function (a, b) { return a[1].localeCompare(b[1]); }).forEach(function (s) { var o = document.createElement('option'); o.value = s[0]; o.textContent = s[1]; spec.appendChild(o); });
    var p = param('q'); if (p) q.value = p;
    var pd = param('div'); if (pd) div.value = pd;
    var ps = param('spec'); if (ps) spec.value = ps;
    var po = param('office'); if (po) off.value = po;
    function render() {
      var term = q.value.trim().toLowerCase();
      var rows = TY.people.filter(function (x) {
        var specNames = x[4].map(function (id) { var s = specById(id); return s ? s[1] : ''; }).join(' ');
        return (!term || (x[1] + ' ' + x[2] + ' ' + specNames).toLowerCase().indexOf(term) > -1) &&
          (!div.value || x[3] === div.value) && (!off.value || x[5] === off.value) && (!spec.value || x[4].indexOf(spec.value) > -1);
      });
      $('#pp-count').textContent = rows.length + ' of ' + TY.people.length + ' people';
      host.innerHTML = rows.length ? rows.map(function (x) { return personCard(x); }).join('') :
        '<p class="empty-state">Nobody matches. Clear a filter, or <a href="' + ROOT + 'pages/contact.html">send an enquiry</a> and we will route it.</p>';
    }
    [q, div, off, spec].forEach(function (el) { el.addEventListener('input', render); el.addEventListener('change', render); });
    $('#pp-reset').addEventListener('click', function () { q.value = ''; div.value = ''; off.value = ''; spec.value = ''; render(); q.focus(); });
    render();
  }

  /* ---------- Person profile (R27) ---------- */
  function initPerson() {
    var host = $('#person');
    if (!host) return;
    var p = personById(param('id') || 'simon-smart') || personById('simon-smart');
    document.title = p[1] + ' | Tysers';
    $('#pr-name').innerHTML = ph(p[1]);
    $('#pr-role').innerHTML = ph(p[2]);
    $('#pr-crumb').innerHTML = ph(p[1]);
    $('#pr-meta').innerHTML = '<dt>Team</dt><dd>' + esc(p[3]) + '</dd><dt>Office</dt><dd><a href="' + ROOT + 'pages/offices.html">' + esc(p[5]) + '</a></dd>' +
      (p[6] ? '<dt>Email</dt><dd>' + ph(p[6]) + '</dd>' : '') + (p[7] ? '<dt>Direct line</dt><dd>' + ph(p[7]) + '</dd>' : '') + '<dt>LinkedIn</dt><dd><span class="ph-copy">[profile link]</span></dd>';
    $('#pr-enquiry').setAttribute('href', ROOT + 'pages/contact.html?to=' + encodeURIComponent(p[0]));
    $('#pr-specs').innerHTML = p[4].length ? p[4].map(function (id) { var s = specById(id); return s ? '<li><a href="' + specLink(id) + '">' + esc(s[1]) + '</a></li>' : ''; }).join('') : '<li><span class="ph-copy">[Specialties to confirm with ' + esc(p[1]) + ']</span></li>';
    var written = TY.insights.filter(function (i) { return i[6] === p[0]; });
    $('#pr-insights').innerHTML = written.length ? written.map(insightCard).join('') : '<p class="empty-state">Nothing published yet. When ' + esc(p[1].split(' ')[0]) + ' writes for Tysers, it appears here automatically.</p>';
    var peers = TY.people.filter(function (x) { return x[0] !== p[0] && x[3] === p[3]; }).slice(0, 3);
    $('#pr-peers').innerHTML = peers.map(function (x) { return personCard(x, { noContact: true }); }).join('');
  }

  /* ---------- Specialty page (R23) ---------- */
  function initSpecialty() {
    var host = $('#specialty');
    if (!host) return;
    var id = param('id') || 'pi';
    var s = specById(id) || specById('pi');
    if (s[0] !== 'pi') {
      document.title = s[1] + ' | Tysers';
      $$('[data-sp="name"]').forEach(function (e) { e.textContent = s[1]; });
      $('#sp-summary').innerHTML = ph(s[5]);
      $('#sp-practice').textContent = s[3];
      $('#sp-division').textContent = s[2];
      $$('.pi-only').forEach(function (e) { e.hidden = true; });
      $$('.generic-only').forEach(function (e) { e.hidden = false; });
      $('#sp-oldurl').textContent = s[6];
      var divPage = { 'Wholesale & Specialty': 'wholesale.html', 'Tysers Live': 'live.html', 'Business & Private Clients': 'business-private.html' }[s[2]];
      $('#sp-division').setAttribute('href', ROOT + 'pages/' + divPage);
    }
    $('#sp-enquire2').setAttribute('href', ROOT + 'pages/contact.html?spec=' + encodeURIComponent(s[0]));
    var team = TY.people.filter(function (p) { return p[3] !== 'Claims' && p[4].indexOf(s[0]) > -1; });
    $('#sp-team').innerHTML = team.length ? team.map(function (p) { return personCard(p); }).join('') :
      '<p class="empty-state">[Team for ' + esc(s[1]) + ' to confirm. Each person is a People node in Umbraco, picked here once.]</p>';
    var claims = TY.people.filter(function (p) { return p[3] === 'Claims' && p[4].indexOf(s[0]) > -1; })[0];
    $('#sp-claims').innerHTML = claims ?
      '<p><strong>' + ph(claims[1]) + '</strong><br>' + ph(claims[2]) + '</p><p>' + ph(claims[7]) + '<br>' + ph(claims[6]) + '</p>' :
      '<p class="ph-copy">[Claims lead for ' + esc(s[1]) + ']</p>';
    $('#sp-notify').setAttribute('href', ROOT + 'pages/claim-notify.html?spec=' + encodeURIComponent(s[0]));
    $('#sp-enquire').setAttribute('href', ROOT + 'pages/contact.html?spec=' + encodeURIComponent(s[0]));
    var rel = TY.insights.filter(function (i) { return i[4] === s[2] && (s[0] === 'pi' ? /P&I/.test(i[1]) : i[3] !== 'People news'); }).slice(0, 3);
    $('#sp-related').innerHTML = rel.map(insightCard).join('') || '<p class="empty-state">[Related insight]</p>';
    var sib = TY.specialties.filter(function (x) { return x[3] === s[3] && x[0] !== s[0]; });
    $('#sp-siblings').innerHTML = sib.map(function (x) { return '<li><a href="' + specLink(x[0]) + '">' + esc(x[1]) + '</a></li>'; }).join('');
  }

  /* ---------- Team strips on other pages ---------- */
  function initTeams() {
    $$('[data-team]').forEach(function (el) {
      var key = el.getAttribute('data-team'), limit = +el.getAttribute('data-limit') || 6;
      var rows = TY.people.filter(function (p) {
        if (key.indexOf('div:') === 0) return p[3] === key.slice(4);
        if (key.indexOf('ids:') === 0) return key.slice(4).split(',').indexOf(p[0]) > -1;
        return p[4].indexOf(key) > -1;
      }).slice(0, limit);
      el.innerHTML = rows.map(function (p) { return personCard(p, { noContact: el.hasAttribute('data-nocontact') }); }).join('');
    });
  }

  /* ---------- Practice groups on division pages (R21) ---------- */
  function initPractices() {
    $$('[data-practices]').forEach(function (el) {
      var d = el.getAttribute('data-practices'), groups = {};
      TY.specialties.filter(function (s) { return s[2] === d; }).forEach(function (s) { (groups[s[3]] = groups[s[3]] || []).push(s); });
      el.innerHTML = Object.keys(groups).map(function (g) {
        return '<article class="card"><h3 class="card-title">' + esc(g) + '</h3><ul class="ticks">' + groups[g].map(function (s) {
          return '<li><a href="' + specLink(s[0]) + '">' + esc(s[1]) + '</a></li>';
        }).join('') + '</ul></article>';
      }).join('');
    });
    $$('[data-industry]').forEach(function (el) {
      var ind = el.getAttribute('data-industry');
      el.innerHTML = TY.specialties.filter(function (s) { return s[4].indexOf(ind) > -1; }).map(function (s) {
        return '<article class="card"><span class="wf-meta">' + esc(s[3]) + '</span><h3 class="card-title"><a href="' + specLink(s[0]) + '">' + esc(s[1]) + '</a></h3><p class="card-text">' + ph(s[5]) + '</p></article>';
      }).join('');
    });
  }

  /* ---------- Insight strips and hub (R30) ---------- */
  function initInsights() {
    $$('[data-insights]').forEach(function (el) {
      var f = el.getAttribute('data-insights'), limit = +el.getAttribute('data-limit') || 3;
      var rows = TY.insights.filter(function (i) { return !f || i[3] === f || i[4] === f; }).filter(function (i) { return i[3] !== 'People news' || f === 'People news'; }).slice(0, limit);
      el.innerHTML = rows.map(insightCard).join('');
    });
    var host = $('#ins-results');
    if (!host) return;
    var type = 'All', div = $('#ins-div'), year = $('#ins-year'), q = $('#ins-q');
    var pt = param('type'); if (pt) type = pt;
    var chips = $$('#ins-types .fchip');
    function render() {
      chips.forEach(function (c) { c.setAttribute('aria-pressed', c.getAttribute('data-type') === type ? 'true' : 'false'); });
      var term = q.value.trim().toLowerCase();
      var rows = TY.insights.filter(function (i) {
        return (type === 'All' ? i[3] !== 'People news' : i[3] === type) && (!div.value || i[4] === div.value) &&
          (!year.value || (i[2] || '').indexOf(year.value) === 0) && (!term || (i[1] + ' ' + i[5]).toLowerCase().indexOf(term) > -1);
      });
      $('#ins-count').textContent = rows.length + (rows.length === 1 ? ' item' : ' items') + (type === 'All' ? ' (people news is under its own tab)' : '');
      host.innerHTML = rows.length ? rows.map(insightCard).join('') : '<p class="empty-state">Nothing matches these filters.</p>';
    }
    chips.forEach(function (c) { c.addEventListener('click', function () { type = c.getAttribute('data-type'); render(); }); });
    [div, year, q].forEach(function (el) { el.addEventListener('input', render); el.addEventListener('change', render); });
    render();
  }

  /* ---------- Article template (R31) ---------- */
  function initArticle() {
    var host = $('#article');
    if (!host) return;
    var id = param('id') || 'cyber-fraud';
    var i = TY.insights.filter(function (x) { return x[0] === id; })[0] || TY.insights.filter(function (x) { return x[0] === 'cyber-fraud'; })[0];
    if (i[0] !== 'cyber-fraud') {
      $$('.cf-only').forEach(function (e) { e.hidden = true; });
      $$('.gen-only').forEach(function (e) { e.hidden = false; });
    }
    document.title = i[1].replace(/[\[\]]/g, '') + ' | Tysers';
    $('#ar-title').innerHTML = ph(i[1]);
    $('#ar-crumb').innerHTML = ph(i[1]);
    $('#ar-meta').textContent = i[3] + ' · ' + fmtDate(i[2]) + ' · ' + i[4];
    $('#ar-summary').innerHTML = ph(i[5]);
    var a = i[6] ? personById(i[6]) : null;
    $('#ar-author').innerHTML = a ? personCard(a) : '<p class="ph-copy">[Author: every article names a person from the People library]</p>';
  }

  /* ---------- Offices (R34) ---------- */
  function initOffices() {
    var host = $('#office-results');
    if (!host) return;
    var region = 'All';
    var chips = $$('#office-regions .fchip');
    function peopleLink(o) {
      var town = o[1].replace('Tysers ', '').replace(' (headquarters)', '');
      return TY.people.some(function (p) { return p[5] === town; }) ? '<a href="' + ROOT + 'pages/people.html?office=' + encodeURIComponent(town) + '">People in ' + esc(town) + '</a>' : '';
    }
    function render() {
      chips.forEach(function (c) { c.setAttribute('aria-pressed', c.getAttribute('data-region') === region ? 'true' : 'false'); });
      var rows = TY.offices.filter(function (o) { return region === 'All' || o[2] === region; });
      host.innerHTML = rows.map(function (o) {
        return '<article class="office" id="o-' + o[0] + '"><h3>' + esc(o[1]) + '</h3><span>' + ph(o[3]) + '</span><span>' + ph(o[4]) + '</span><span>' + ph(o[5]) + '</span>' +
          '<span class="wf-meta">' + ph(o[6]) + '</span><span class="reg">Regulated by: ' + ph(o[7]) + '</span>' + peopleLink(o) + '</article>';
      }).join('');
      $('#office-count').textContent = rows.length + ' locations';
    }
    chips.forEach(function (c) { c.addEventListener('click', function () { region = c.getAttribute('data-region'); render(); }); });
    render();
  }

  /* ---------- Search (R05) ---------- */
  function initSearch() {
    var host = $('#search-results');
    if (!host) return;
    var input = $('#search-q');
    var q = param('q') || 'p&i';
    input.value = q;
    function render() {
      var t = input.value.trim().toLowerCase();
      if (!t) { host.innerHTML = '<p class="empty-state">Type a product, a person, an office or a topic.</p>'; return; }
      function has(s) { return s.toLowerCase().indexOf(t) > -1; }
      var groups = [
        ['Specialties', TY.specialties.filter(function (s) { return has(s[1] + ' ' + s[3] + ' ' + s[5]); }).map(function (s) { return '<li><a href="' + specLink(s[0]) + '">' + esc(s[1]) + '</a><small>' + esc(s[2]) + ' · ' + ph(s[5]) + '</small></li>'; })],
        ['People', TY.people.filter(function (p) { return has(p[1] + ' ' + p[2]); }).map(function (p) { return '<li><a href="' + personLink(p[0]) + '">' + ph(p[1]) + '</a><small>' + ph(p[2]) + ' · ' + esc(p[5]) + '</small></li>'; })],
        ['Insights', TY.insights.filter(function (i) { return has(i[1] + ' ' + i[5]); }).map(function (i) { return '<li><a href="' + ROOT + 'pages/article.html?id=' + i[0] + '">' + ph(i[1]) + '</a><small>' + esc(i[3]) + ' · ' + fmtDate(i[2]) + '</small></li>'; })],
        ['Offices', TY.offices.filter(function (o) { return has(o[1] + ' ' + o[3] + ' ' + o[6]); }).map(function (o) { return '<li><a href="' + ROOT + 'pages/offices.html#o-' + o[0] + '">' + esc(o[1]) + '</a><small>' + ph(o[3]) + '</small></li>'; })]
      ];
      var claimTerms = /claim|loss|notify|incident/.test(t);
      var total = groups.reduce(function (n, g) { return n + g[1].length; }, 0);
      $('#search-count').textContent = total + ' results for “' + input.value.trim() + '”';
      host.innerHTML = (claimTerms ? '<div class="panel dark"><h2>Making a claim?</h2><p>Notify us online and get a reference straight away, or call the out-of-hours lines.</p><a class="btn" href="' + ROOT + 'pages/claim-notify.html">Notify a claim</a> <a href="' + ROOT + 'pages/claims.html">Claims contacts</a></div>' : '') +
        groups.filter(function (g) { return g[1].length; }).map(function (g) {
          return '<section class="res-group"><h2><span>' + g[0] + '</span><small>' + g[1].length + '</small></h2><ul>' + g[1].slice(0, 6).join('') + '</ul></section>';
        }).join('') + (total ? '' : '<p class="empty-state">No results. Try another word, or <a href="' + ROOT + 'pages/contact.html">ask us directly</a>.</p>');
    }
    $('#search-form').addEventListener('submit', function (e) { e.preventDefault(); render(); });
    input.addEventListener('input', render);
    render();
  }

  /* ---------- Claims hub selector (R28) ---------- */
  function initClaimsFinder() {
    var div = $('#cf-div'), cls = $('#cf-class'), out = $('#cf-out');
    if (!div) return;
    Object.keys(TY.claims).forEach(function (d) { var o = document.createElement('option'); o.value = d; o.textContent = d; div.appendChild(o); });
    function fillClasses() {
      cls.innerHTML = '<option value="">Choose a class</option>';
      if (!div.value) { cls.disabled = true; return; }
      cls.disabled = false;
      Object.keys(TY.claims[div.value]).forEach(function (c) { var o = document.createElement('option'); o.value = c; o.textContent = c; cls.appendChild(o); });
    }
    function show() {
      if (!div.value || !cls.value) { out.innerHTML = '<p class="wf-meta">Choose who your policy is with and the class of cover to see the right team.</p>'; return; }
      var r = TY.claims[div.value][cls.value];
      var lead = r.lead ? personById(r.lead) : null, alt = r.alt ? personById(r.alt) : null;
      out.innerHTML = '<div class="route-out"><h3>' + esc(r.team) + '</h3>' +
        (r.phone ? '<p>Phone: ' + ph(r.phone) + '<br>Email: ' + ph(r.email) + '</p>' : '') +
        '<div class="people-grid">' + [lead, alt].filter(Boolean).map(function (p) { return personCard(p); }).join('') + '</div>' +
        '<p style="margin-top:1rem"><a class="btn" href="' + ROOT + 'pages/claim-notify.html?div=' + encodeURIComponent(div.value) + '&cls=' + encodeURIComponent(cls.value) + '">Notify this team online</a></p></div>';
    }
    div.addEventListener('change', function () { fillClasses(); show(); });
    cls.addEventListener('change', show);
    fillClasses(); show();
  }

  /* ---------- Stepped forms: notify a claim (R29) ---------- */
  function initStepper() {
    var form = $('form[data-stepper]');
    if (!form) return;
    var steps = $$('.form-step', form), marks = $$('.steps li');
    var i = 0;
    var div = $('#nc-div'), cls = $('#nc-class');
    if (div && TY.claims) {
      Object.keys(TY.claims).forEach(function (d) { var o = document.createElement('option'); o.value = d; o.textContent = d; div.appendChild(o); });
      var fill = function () {
        cls.innerHTML = '<option value="">Choose a class</option>';
        if (div.value) Object.keys(TY.claims[div.value]).forEach(function (c) { var o = document.createElement('option'); o.value = c; o.textContent = c; cls.appendChild(o); });
      };
      div.addEventListener('change', fill);
      var pd = param('div'), pc = param('cls'), ps = param('spec');
      if (ps) { var s = specById(ps); if (s) { pd = s[2]; pc = Object.keys(TY.claims[s[2]] || {})[0]; } }
      if (pd && TY.claims[pd]) { div.value = pd; fill(); if (pc) cls.value = pc; }
    }
    function show(n) {
      i = n;
      steps.forEach(function (s, k) { s.classList.toggle('active', k === i); });
      marks.forEach(function (m, k) { m.classList.toggle('done', k < i); if (k === i) m.setAttribute('aria-current', 'step'); else m.removeAttribute('aria-current'); });
      var h = steps[i].querySelector('h2'); if (h) { h.setAttribute('tabindex', '-1'); h.focus(); }
      if (steps[i].hasAttribute('data-review')) review();
    }
    function validate(step) {
      var ok = true;
      $$('[required]', step).forEach(function (el) {
        var field = el.closest('.field') || el.closest('fieldset');
        var bad = el.type === 'radio' ? !step.querySelector('input[name="' + el.name + '"]:checked') : el.type === 'email' ? !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(el.value) : !el.value.trim();
        if (field) {
          field.classList.toggle('has-error', bad);
          var msg = field.querySelector('.field-error');
          if (bad && !msg) { msg = document.createElement('p'); msg.className = 'field-error'; msg.textContent = el.getAttribute('data-error') || 'This is required.'; field.appendChild(msg); }
          if (!bad && msg) msg.remove();
        }
        if (bad && ok) { ok = false; el.focus(); }
      });
      return ok;
    }
    function review() {
      var dl = $('#review-list'); if (!dl) return;
      dl.innerHTML = $$('[data-label]', form).map(function (el) {
        var v = el.type === 'radio' ? ((form.querySelector('input[name="' + el.name + '"]:checked') || {}).value || '') : el.value;
        if (el.type === 'radio' && el !== form.querySelector('input[name="' + el.name + '"]')) return '';
        return '<dt>' + esc(el.getAttribute('data-label')) + '</dt><dd>' + (esc(v) || '<span class="wf-meta">Not given</span>') + '</dd>';
      }).join('');
    }
    $$('[data-next]', form).forEach(function (b) { b.addEventListener('click', function () { if (validate(steps[i])) show(i + 1); }); });
    $$('[data-back]', form).forEach(function (b) { b.addEventListener('click', function () { show(i - 1); }); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate(steps[i])) return;
      var ref = 'TYC-' + new Date().getFullYear() + '-' + String(Math.floor(10000 + Math.random() * 89999));
      var team = div && cls && div.value && cls.value ? TY.claims[div.value][cls.value].team : 'the claims team';
      form.hidden = true; $('.steps').hidden = true;
      var c = $('#confirm');
      c.hidden = false;
      $('#confirm-ref').textContent = ref;
      $('#confirm-team').textContent = team;
      c.querySelector('h2').setAttribute('tabindex', '-1'); c.querySelector('h2').focus();
    });
    show(0);
  }

  /* ---------- Routed enquiry form (R33) ---------- */
  function initEnquiry() {
    var form = $('#enquiry');
    if (!form) return;
    var who = form.elements['who'], need = $('#eq-need'), spec = $('#eq-spec'), out = $('#eq-route');
    TY.specialties.slice().sort(function (a, b) { return a[1].localeCompare(b[1]); }).forEach(function (s) { var o = document.createElement('option'); o.value = s[0]; o.textContent = s[1] + ' (' + s[2] + ')'; spec.appendChild(o); });
    var ps = param('spec'), pt = param('to'), pw = param('who');
    if (ps && specById(ps)) spec.value = ps;
    if (pw) { var r = form.querySelector('input[name="who"][value="' + pw + '"]'); if (r) r.checked = true; }
    if (ps || pt) need.value = 'new';
    if (pt && personById(pt)) {
      var person = personById(pt);
      $('#eq-to').hidden = false;
      $('#eq-to').innerHTML = '<p>Your enquiry will go to <strong>' + ph(person[1]) + '</strong>, ' + ph(person[2]) + '. <button type="button" class="btn btn-secondary" id="eq-clear">Send to a team instead</button></p>';
      $('#eq-clear').addEventListener('click', function () { $('#eq-to').hidden = true; pt = null; route(); });
      if (person[4][0] && !ps) spec.value = person[4][0];
    }
    function route() {
      var w = (form.querySelector('input[name="who"]:checked') || {}).value;
      var s = specById(spec.value);
      var team = 'Enquiries, London (+44 (0)20 3037 8000)';
      if (need.value === 'claim') { out.innerHTML = '<p><strong>This sounds like a claim.</strong> Claims are faster through the claims form, which gives you a reference straight away. <a href="' + ROOT + 'pages/claim-notify.html">Notify a claim</a></p>'; return; }
      if (need.value === 'media') team = 'Press and media: Celia Mather';
      else if (need.value === 'careers') team = '[People team]';
      else if (s) {
        var lead = TY.people.filter(function (p) { return p[3] !== 'Claims' && p[4].indexOf(s[0]) > -1; })[0];
        team = s[3] + ' team' + (lead ? ', led for this enquiry by ' + lead[1] : '');
      } else if (w === 'broker' || w === 'client') team = 'Wholesale & Specialty placing team';
      else if (w === 'reinsurer') team = 'Reinsurance team, led by Richard Johnston';
      else if (w === 'event') team = 'Tysers Live';
      else if (w === 'private' || w === 'business') team = 'Business & Private Clients';
      if (pt && personById(pt)) team = personById(pt)[1];
      out.innerHTML = '<p>Goes to: <strong>' + ph(team) + '</strong>. We reply within <span class="ph-copy">[one working day]</span>.</p>';
    }
    $$('input[name="who"]', form).forEach(function (r) { r.addEventListener('change', route); });
    need.addEventListener('change', route); spec.addEventListener('change', route);
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      $$('[required]', form).forEach(function (el) {
        var f = el.closest('.field') || el.closest('fieldset');
        var bad = el.type === 'radio' ? !form.querySelector('input[name="' + el.name + '"]:checked') : el.type === 'email' ? !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(el.value) : !el.value.trim();
        if (f) {
          f.classList.toggle('has-error', bad);
          var msg = f.querySelector('.field-error');
          if (bad && !msg) { msg = document.createElement('p'); msg.className = 'field-error'; msg.textContent = el.getAttribute('data-error') || 'This is required.'; f.appendChild(msg); }
          if (!bad && msg) msg.remove();
        }
        if (bad && ok) { ok = false; el.focus(); }
      });
      if (!ok) return;
      form.hidden = true;
      var c = $('#eq-confirm'); c.hidden = false;
      $('#eq-confirm-team').innerHTML = out.querySelector('strong') ? out.querySelector('strong').innerHTML : 'our enquiries team';
      c.querySelector('h2').setAttribute('tabindex', '-1'); c.querySelector('h2').focus();
    });
    route();
  }

  /* ---------- Simple validated forms (briefings, quote) ---------- */
  function initSimpleForms() {
    $$('form[data-simple]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var ok = true;
        $$('[required]', form).forEach(function (el) {
          var f = el.closest('.field') || el.closest('fieldset');
          var bad = el.type === 'checkbox' ? !form.querySelector('input[name="' + el.name + '"]:checked') : el.type === 'email' ? !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(el.value) : !el.value.trim();
          if (f) {
            f.classList.toggle('has-error', bad);
            var msg = f.querySelector('.field-error');
            if (bad && !msg) { msg = document.createElement('p'); msg.className = 'field-error'; msg.textContent = el.getAttribute('data-error') || 'This is required.'; f.appendChild(msg); }
            if (!bad && msg) msg.remove();
          }
          if (bad && ok) { ok = false; el.focus(); }
        });
        if (!ok) return;
        var done = document.getElementById(form.getAttribute('data-simple'));
        form.hidden = true; if (done) { done.hidden = false; done.setAttribute('tabindex', '-1'); done.focus(); }
      });
    });
  }

  /* ---------- P&I club table (R32) ---------- */
  function initClubs() {
    var body = $('#club-body');
    if (!body) return;
    var key = 0, dir = 1, picks = [];
    var heads = ['Club', 'Combined ratio %', 'Free reserves $m', 'GT entered (m)', 'General increase %'];
    function render() {
      var rows = TY.clubs.slice().sort(function (a, b) { return (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0) * dir; });
      body.innerHTML = rows.map(function (c) {
        var sel = picks.indexOf(c[0]) > -1;
        return '<tr class="' + (sel ? 'sel' : '') + '"><td><label style="display:flex;gap:.5rem;font-weight:400;margin:0"><input type="checkbox" data-club="' + esc(c[0]) + '"' + (sel ? ' checked' : '') + '> ' + esc(c[0]) + '</label></td>' +
          c.slice(1).map(function (v) { return '<td class="n">' + v + '</td>'; }).join('') + '</tr>';
      }).join('');
      $$('#club-table .sort-btn').forEach(function (b, k) { b.setAttribute('aria-label', 'Sort by ' + heads[k]); b.textContent = heads[k] + (k === key ? (dir > 0 ? ' ▲' : ' ▼') : ''); });
      $$('input[data-club]', body).forEach(function (cb) {
        cb.addEventListener('change', function () {
          var n = cb.getAttribute('data-club');
          if (cb.checked) { picks.push(n); if (picks.length > 2) picks.shift(); } else picks = picks.filter(function (x) { return x !== n; });
          render(); compare();
        });
      });
    }
    function compare() {
      var host = $('#club-compare');
      if (picks.length < 2) { host.innerHTML = '<p class="wf-meta">Tick two clubs to compare them side by side (' + picks.length + ' of 2 chosen).</p>'; return; }
      host.innerHTML = '<div class="compare">' + picks.map(function (n) {
        var c = TY.clubs.filter(function (x) { return x[0] === n; })[0];
        return '<div class="panel"><h3>' + esc(n) + '</h3><dl class="kv">' + heads.slice(1).map(function (h, k) { return '<dt>' + h + '</dt><dd>' + c[k + 1] + '</dd>'; }).join('') + '</dl><p class="ph-copy">[Tysers commentary on ' + esc(n) + ' from the report]</p></div>';
      }).join('') + '</div>';
    }
    $$('#club-table .sort-btn').forEach(function (b, k) { b.addEventListener('click', function () { dir = key === k ? -dir : 1; key = k; render(); }); });
    render(); compare();
  }

  document.addEventListener('DOMContentLoaded', function () {
    initProto(); initMenu(); initSearchForms(); initVideo();
    initAZ(); initPeople(); initPerson(); initSpecialty(); initPractices(); initTeams(); initInsights(); initArticle();
    initOffices(); initSearch(); initClaimsFinder(); initStepper(); initEnquiry(); initSimpleForms(); initClubs();
  });
})();
