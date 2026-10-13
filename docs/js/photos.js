/* photos.js — Tysers photography for the designed prototype.

   Images are hotlinked from tysers.com (Photography © Tysers). Each is
   applied only once it has loaded; if it fails, the illustrated navy
   placeholder from theme.css stays in place. Floorplans, charts, maps,
   portraits and logos stay drawn.

   Runs after app.js so that cards app.js generates already exist. */

(function () {
  'use strict';

  var BASE = 'https://www.tysers.com/app/uploads/';
  /* Image library: key -> path under /app/uploads/. Keys mirror the
     specialty ids in data.js where there is a specialty-specific image. */
  var P = {
    home: '2026/06/GettyImages-2247169642-scaled.jpg',
    wholesale: '2026/06/GettyImages-1301586113-scaled.jpg',
    ws: '2026/06/GettyImages-2247169642-scaled.jpg',
    marine: '2026/06/GettyImages-2228381305-1-scaled.jpg',
    marineHero: '2026/06/GettyImages-2172828234-scaled.jpg',
    ahPractice: '2026/06/GettyImages-637851338-scaled.jpg',
    mr: '2026/06/GettyImages-1367572246-scaled.jpg',
    pcPractice: '2026/06/GettyImages-1172901474-scaled.jpg',
    rePractice: '2026/06/GettyImages-183264463-scaled.jpg',
    reHero: '2026/07/GettyImages-2224314123-1-scaled.jpg',
    wclaims: '2026/06/GettyImages-184619832-scaled.jpg',
    claims: '2026/06/GettyImages-2198967056-edit-V7.jpg',
    about: '2026/06/GettyImages-1351571961-1-scaled.jpg',
    offices: '2026/06/GettyImages-2219836032-scaled.jpg',
    contact: '2026/06/GettyImages-1251442349.jpg',
    piHero: '2026/06/GettyImages-514469248-scaled.jpg',
    cyberHero: '2026/06/GettyImages-1414267480-scaled.jpg',
    biz: '2026/06/GettyImages-1351571961-1-scaled.jpg',
    bizHero: '2026/08/GettyImages-1295925635-scaled.jpg',
    hnw: '2026/06/shutterstock_120218377-scaled.jpg',
    hnwHero: '2026/06/AdobeStock_440173591-scaled.jpeg',
    live: '2026/06/AdobeStock_142515886-scaled.jpeg',
    liveHero: '2026/06/shutterstock_583403449.jpg',
    music: '2026/06/GettyImages-2185398610.jpg',
    media: '2026/06/GettyImages-2254775619-scaled.jpg',
    theatre: '2026/06/AdobeStock_630442468-2-scaled.jpg',
    contingency: '2026/04/GettyImages-1148471940-1.jpg',
    advert: '2026/04/GettyImages-1423343445-scaled-e1776223854182.jpg',
    sportPractice: '2026/06/AdobeStock_789275807.jpg',
    esportPractice: '2026/06/GettyImages-1170073824-scaled.jpg',
    energyHero: '2026/06/AdobeStock_244094814-scaled.jpeg',

    /* specialty ids */
    pi: '2026/06/GettyImages-2264193758-scaled.jpg',
    hull: '2026/06/GettyImages-960532070-scaled.jpg',
    cargo: '2026/04/GettyImages-1255083673.jpg',
    cargorej: '2026/04/GettyImages-1487004297.jpg',
    ports: '2026/04/GettyImages-2177790332-scaled.jpg',
    yacht: '2026/06/GettyImages-2166348629-1.jpg',
    trade: '2026/06/jpeg-v6.2-scaled.jpg',
    aviation: '2026/04/GettyImages-473690352.jpg',
    pv: '2026/06/GettyImages-2240294827-scaled.jpg',
    energy: '2026/06/GettyImages-1452805990-scaled-e1788861256323.jpg',
    ah: '2026/06/GettyImages-637851338-scaled.jpg',
    cyber: '2026/06/AdobeStock_445362578-scaled.jpeg',
    'do': '2026/06/GettyImages-1367572246-scaled.jpg',
    epl: '2026/06/GettyImages-2198967056-scaled.jpg',
    fpr: '2026/06/AdobeStock_1114193237-scaled.jpeg',
    health: '2026/06/GettyImages-506438390-scaled.jpg',
    help: '2026/06/Two-flying-army-helicopters.jpg',
    ip: '2026/06/GettyImages-1352130435-scaled.jpg',
    ma: '2026/06/AdobeStock_52149432-scaled.jpeg',
    'pi-prof': '2026/06/GettyImages-172391954-scaled.jpg',
    sam: '2026/06/AdobeStock_327080575-scaled.jpeg',
    da: '2026/06/GettyImages-908031820-scaled.jpg',
    intcas: '2026/06/GettyImages-981344368-scaled.jpg',
    intprop: '2026/08/GettyImages-1952464101-scaled.jpg',
    naprop: '2026/06/GettyImages-1172901474-scaled.jpg',
    nacap: '2026/06/AdobeStock_1583122377-scaled.jpeg',
    usaunz: '2026/06/GettyImages-2202601502-scaled.jpg',
    re: '2026/06/GettyImages-183264463-scaled.jpg',
    band: '2026/06/GettyImages-2184753415-1-scaled-e1782588778475.jpg',
    eventprod: '2026/06/GettyImages-622064544.jpg',
    promoter: '2026/06/AdobeStock_1082687150.jpg',
    festival: '2026/06/AdobeStock_234297445.jpg',
    freelancepl: '2026/06/GettyImages-2160462743.jpg',
    av: '2026/06/GettyImages-1152344841-scaled.jpg',
    conf: '2026/06/GettyImages-1482847294-scaled.jpg',
    production: '2026/06/GettyImages-1621445968-scaled.jpg',
    freelancer: '2026/06/GettyImages-2212856084-scaled.jpg',
    ob: '2026/06/GettyImages-1215776349-1-scaled.jpg',
    post: '2026/06/AdobeStock_658372752.jpg',
    influencer: '2026/06/GettyImages-846333904-scaled.jpg',
    theatrevenue: '2026/06/GettyImages-1207064525-scaled.jpg',
    theatreprod: '2026/06/GettyImages-1348130742-scaled.jpg',
    theatretrade: '2026/06/AdobeStock_407460182-scaled.jpeg',
    cancel: '2026/06/GettyImages-1222777369.jpg',
    prize: '2026/06/GettyImages-1145778603-scaled.jpg',
    kr: '2026/06/GettyImages-1149905211-scaled.jpg',
    adagency: '2026/04/GettyImages-2151886097.jpg',
    commercial: '2026/06/GettyImages-2231431800-scaled.jpg',
    sportevent: '2026/06/GettyImages-506979575-scaled.jpg',
    governing: '2026/06/iStock_000002825478_Medium.jpg',
    prosport: '2026/06/GettyImages-1135508703-scaled.jpg',
    sportmgmt: '2026/06/AdobeStock_697976898-scaled.jpeg',
    venue: '2026/06/AdobeStock_255750500-scaled.jpeg',
    motorsport: '2026/06/AdobeStock_721381330-scaled.jpeg',
    esport: '2026/06/GettyImages-2211905938-scaled.jpg'
  };

  /* Practice name (data.js) -> image, used for practice cards and as a
     fallback for specialties without their own picture. */
  var PRACTICE = {
    'Marine & Aviation': 'marine', 'Management Risk': 'mr', 'Property & Casualty': 'pcPractice',
    'Energy & Construction': 'energyHero', 'Accident & Health': 'ahPractice', 'Reinsurance': 'rePractice',
    'Music & Live Events': 'music', 'Media, Film & TV': 'media', 'Theatre & Venues': 'theatre',
    'Contingency': 'contingency', 'Advertising & Commercials': 'advert', 'Sport & Motorsport': 'sportPractice',
    'Esports': 'esportPractice', 'Business': 'biz', 'Private clients': 'hnw'
  };

  function url(key) { return P[key] ? BASE + P[key] : null; }

  /* Apply only after load, so a failed image never replaces the placeholder. */
  function apply(el, key) {
    var src = url(key);
    if (!el || !src) return;
    var img = new Image();
    img.decoding = 'async';
    img.onload = function () {
      el.style.setProperty('--photo', 'url("' + src + '")');
      el.classList.add('has-photo');
    };
    img.src = src;
  }
  function q(sel) { return document.querySelector(sel); }
  function qa(sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); }

  var TY = window.TY || {};
  var page = location.pathname.split('/').pop() || 'index.html';
  var params = new URLSearchParams(location.search);

  function specialtyKey(id) {
    if (P[id]) return id;
    var s = (TY.specialties || []).filter(function (x) { return x[0] === id; })[0];
    return s ? PRACTICE[s[3]] : null;
  }

  /* Heroes: one per page, chosen to match the live page's own image. */
  var HERO = {
    'home.html': 'home', 'wholesale.html': 'wholesale', 'industry.html': 'marineHero', 'specialties.html': 'ws',
    'people.html': 'about', 'person.html': null, 'claims.html': 'claims', 'claim-notify.html': 'wclaims',
    'insights.html': 'marine', 'pi-report.html': 'piHero', 'article.html': 'cyberHero', 'contact.html': 'contact',
    'offices.html': 'offices', 'brokers.html': 'reHero', 'live.html': 'liveHero', 'business-private.html': 'bizHero',
    'about.html': 'about', 'regulatory.html': null, 'portal.html': null, 'search.html': null, '404.html': null
  };

  function run() {
    var head = q('.page-head');
    if (head) {
      var key = HERO[page];
      if (page === 'specialty.html') key = { pi: 'piHero', cyber: 'cyberHero', re: 'reHero', energy: 'energyHero' }[params.get('id') || 'pi'] || specialtyKey(params.get('id') || 'pi');
      if (page === 'article.html' && params.get('id') && params.get('id') !== 'cyber-fraud') key = 'marine';
      if (key) apply(head, key);
    }

    /* Framed images beside page heads and in content blocks */
    var frame = {
      'home.html': [['.page-head .video-wrap .wf-placeholder', 'wholesale'], ['.content-highlight .wf-placeholder', 'cyber'], ['.feature .wf-placeholder', 'pi']],
      'wholesale.html': [['.page-head .wf-placeholder', 'marine']],
      'live.html': [['.page-head .wf-placeholder', 'music']],
      'business-private.html': [['.page-head .wf-placeholder', 'biz'], ['#private .wf-placeholder', 'hnw']],
      'about.html': [['.page-head .video-wrap .wf-placeholder', 'ws']],
      'industry.html': [['.feature .wf-placeholder', 'pi']],
      'specialty.html': [['.feature .wf-placeholder', 'piHero']],
      'claims.html': [['.content-highlight .wf-placeholder', 'cyber']],
      'insights.html': [['.feature .wf-placeholder', 'pi']],
      'article.html': [['article .wf-placeholder', 'cyber']],
      'person.html': [],
      'library.html': [['.feature .wf-placeholder', 'pi'], ['.content-highlight .wf-placeholder', 'marine'], ['.video-wrap .wf-placeholder', 'ws']]
    }[page] || [];
    frame.forEach(function (f) { apply(q(f[0]), f[1]); });

    /* Route tiles: picture by destination */
    qa('.route').forEach(function (r) {
      var h = r.getAttribute('href') || '';
      var key = /wholesale\.html#reinsurance/.test(h) ? 'rePractice' : /wholesale/.test(h) ? 'ws' : /live/.test(h) ? 'live' : /business-private/.test(h) ? 'biz' :
        /specialties/.test(h) ? 'marine' : /people/.test(h) ? 'about' : /claims/.test(h) ? 'wclaims' : /contact/.test(h) ? 'contact' : null;
      if (key) apply(r, key);
    });

    /* Practice and industry cards: add a photo header */
    qa('[data-practices] .card, [data-industry] .card').forEach(function (card) {
      var key = null;
      var link = card.querySelector('a[href*="specialty.html?id="]');
      if (card.closest('[data-industry]') && link) key = specialtyKey(link.getAttribute('href').split('id=')[1]);
      else { var t = card.querySelector('.card-title'); key = t ? PRACTICE[t.textContent.trim()] : null; }
      if (!key || card.querySelector('.card-photo')) return;
      var d = document.createElement('div');
      d.className = 'card-photo';
      d.setAttribute('aria-hidden', 'true');
      card.insertBefore(d, card.firstChild);
      var src = url(key), img = new Image();
      img.onload = function () { d.style.setProperty('--photo', 'url("' + src + '")'); };
      img.src = src;
    });
  }

  document.addEventListener('DOMContentLoaded', run);
})();
