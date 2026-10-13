/* Puducherry Travel Guide: app logic (vanilla JS, no dependencies) */
(function () {
  'use strict';

  /* ---------- config ---------- */
  var CFG = {
    local: false,   // true = use img/photos/<id>.jpg (run tools/download_photos.py first)
    api: ''         // optional FastAPI proxy (see backend/main.py) for live Google photos
  };
  var PLACES = window.PLACES, PX = window.PX, G = window.GUIDE;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- helpers ---------- */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var fmt = function (n) { return Number(n).toLocaleString('en-IN'); };
  var byName = {}; PLACES.forEach(function (p) { byName[p.n] = p; });
  var bySlug = {}; PLACES.forEach(function (p) { bySlug[p.s] = p; });

  var LOCAL = window.LOCAL || {};
  function pxUrl(key, w) {
    if (LOCAL[key]) return LOCAL[key][0];
    var id = PX[key][0];
    return CFG.local ? 'img/photos/' + id + '.jpg'
      : 'https://images.pexels.com/photos/' + id + '/pexels-photo-' + id + '.jpeg?auto=compress&cs=tinysrgb&w=' + w;
  }
  function pxAlt(key) { return PX[key][1]; }
  function img(key, w, opts) {
    opts = opts || {};
    var isLocal = !!LOCAL[key]; if (isLocal && !opts.pos) opts.pos = LOCAL[key][2];
    var srcset = (CFG.local || isLocal) ? '' : ' srcset="' + pxUrl(key, Math.round(w * .6)) + ' ' + Math.round(w * .6) + 'w, ' + pxUrl(key, w) + ' ' + w + 'w, ' + pxUrl(key, Math.round(w * 1.6)) + ' ' + Math.round(w * 1.6) + 'w"';
    return '<img src="' + pxUrl(key, w) + '"' + srcset + ' sizes="' + (opts.sizes || '(max-width:700px) 92vw, 420px') + '" alt="' + esc(opts.alt != null ? opts.alt : pxAlt(key)) + '"' +
      (opts.eager ? ' fetchpriority="high"' : ' loading="lazy"') + ' decoding="async"' + (opts.pos ? ' style="object-position:' + opts.pos + '"' : '') + '>';
  }
  var ICON = { 'Beaches': 'wave', 'Temples': 'temple', 'Churches & Mosques': 'church', 'Heritage & Museums': 'museum', 'Parks & Nature': 'tree', 'Auroville': 'sun', 'Veg': 'leaf', 'Non-Veg': 'fish', 'Cafes & Bakeries': 'coffee', 'Fast Food': 'burger', 'Hotels & Stays': 'bed', 'Malls & Shops': 'bag', 'Cinemas': 'film', 'Nightlife': 'glass', 'Rentals': 'scooter', 'Car Rentals': 'car', 'Day Trips': 'compass' };
  var ic = function (n, cls) { return '<svg class="ic' + (cls ? ' ' + cls : '') + '" aria-hidden="true"><use href="#i-' + n + '"/></svg>'; };
  var mapQ = function (o) { return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(o.n + ' Puducherry') + (o.id ? '&query_place_id=' + o.id : ''); };
  var dirQ = function (o) { return 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(o.n + ' Puducherry') + (o.id ? '&destination_place_id=' + o.id : ''); };
  var toastT;
  function toast(msg) { var t = $('#toast'); t.textContent = msg; t.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(function () { t.classList.remove('on'); }, 2400); }
  function store(k, v) { try { if (v === undefined) return JSON.parse(localStorage.getItem(k) || 'null'); localStorage.setItem(k, JSON.stringify(v)); } catch (e) { return null; } }

  /* broken photos fall back to the gradient + icon */
  document.addEventListener('error', function (e) {
    var t = e.target;
    if (t && t.tagName === 'IMG' && !t.dataset.failed) {
      t.dataset.failed = '1'; t.style.opacity = '0'; t.removeAttribute('srcset');
      if (t.parentElement && !t.parentElement.querySelector('.noimg')) { t.parentElement.insertAdjacentHTML('beforeend', '<span class="noimg">' + ic('compass') + '</span>'); }
    }
  }, true);

  /* ---------- favourites ---------- */
  var favs = store('pdyfav') || [];
  function isFav(s) { return favs.indexOf(s) > -1; }
  function toggleFav(s) {
    var i = favs.indexOf(s);
    if (i > -1) { favs.splice(i, 1); toast('Removed from My Trip'); } else { favs.push(s); toast('Added to My Trip'); }
    store('pdyfav', favs); syncFavs();
  }
  function syncFavs() {
    $('#trip-count').textContent = favs.length;
    $$('.heart').forEach(function (b) { var on = isFav(b.dataset.fav); b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); b.setAttribute('aria-label', on ? 'Remove from My Trip' : 'Add to My Trip'); });
    renderTrip();
  }
  function heart(s) { return '<button class="heart" data-fav="' + s + '" aria-pressed="false" aria-label="Add to My Trip">' + ic('heart') + '</button>'; }

  /* ---------- header ---------- */
  var header = $('#header'), prog = $('#progress');
  var lastY = window.scrollY, hdrH = false;
  function setHdr(h) { if (h === hdrH) return; hdrH = h; header.classList.toggle('hide', h); document.documentElement.style.setProperty('--stick', h ? '0px' : ''); }
  header.addEventListener('focusin', function () { setHdr(false); });
  function onScroll() {
    var y = window.scrollY, h = document.documentElement.scrollHeight - innerHeight;
    header.classList.toggle('scrolled', y > 60);
    var menuOpen = document.querySelector('.has-mega.open') || mm.classList.contains('open') || header.contains(document.activeElement) && document.activeElement !== document.body;
    if (y > 260 && y > lastY + 8 && !menuOpen) setHdr(true); else if (y < lastY - 8 || y <= 260 || menuOpen) setHdr(false);
    lastY = y;
    prog.style.transform = 'scaleX(' + (h > 0 ? y / h : 0) + ')';
    $('#filters') && $('#filters').classList.toggle('stuck', $('#filters').getBoundingClientRect().top <= parseInt(getComputedStyle(document.documentElement).getPropertyValue('--hdr')) + 1);
    parallax();
  }
  var ticking = false;
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(function () { onScroll(); ticking = false; }); } }, { passive: true });

  var megas = $$('.has-mega');
  function closeMegas() { megas.forEach(function (m) { m.classList.remove('open'); $('.nav-link', m).setAttribute('aria-expanded', 'false'); }); }
  megas.forEach(function (m) {
    var btn = $('.nav-link', m), t;
    function open() { clearTimeout(t); closeMegas(); m.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); header.classList.add('scrolled'); }
    btn.addEventListener('click', function () { m.classList.contains('open') ? closeMegas() : open(); });
    m.addEventListener('mouseenter', function () { if (matchMedia('(hover:hover)').matches) open(); });
    m.addEventListener('mouseleave', function () { t = setTimeout(function () { closeMegas(); onScroll(); }, 160); });
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeMegas(); closeMenu(); closeTrip(); } });
  document.addEventListener('click', function (e) { if (!e.target.closest('.has-mega')) { closeMegas(); onScroll(); } });
  $$('.mega a').forEach(function (a) { a.addEventListener('click', function () { closeMegas(); }); });

  var mm = $('#mobile-menu');
  function openMenu() { mm.classList.add('open'); mm.setAttribute('aria-hidden', 'false'); $('#open-menu').setAttribute('aria-expanded', 'true'); document.body.style.overflow = 'hidden'; }
  function closeMenu() { mm.classList.remove('open'); mm.setAttribute('aria-hidden', 'true'); $('#open-menu').setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; }
  $('#open-menu').addEventListener('click', openMenu);
  $('#close-menu').addEventListener('click', closeMenu);

  /* ---------- hero slider ---------- */
  (function hero() {
    var S = G.hero, DUR = 7000, cur = 0, timer, hero = $('.hero'), copy = $('#hero-copy');
    $('#hero-slides').innerHTML = S.map(function (s, i) {
      return '<div class="hero-slide' + (i === 0 ? ' active' : '') + '" role="group" aria-roledescription="slide" aria-label="' + (i + 1) + ' of ' + S.length + '">' +
        '<img src="' + pxUrl(s.key, 1800) + '" ' + (CFG.local ? '' : 'srcset="' + pxUrl(s.key, 900) + ' 900w, ' + pxUrl(s.key, 1400) + ' 1400w, ' + pxUrl(s.key, 2000) + ' 2000w" sizes="100vw" ') +
        'alt="' + esc(pxAlt(s.key)) + '" style="object-position:' + s.pos + '"' + (i === 0 ? ' fetchpriority="high"' : ' loading="lazy"') + ' decoding="async"></div>';
    }).join('');
    $('#hero-bars').innerHTML = S.map(function (s, i) { return '<button class="hero-bar" role="tab" aria-label="Slide ' + (i + 1) + ': ' + esc(s.eyebrow) + '"><i></i></button>'; }).join('');
    $('#hero-total').textContent = String(S.length).padStart(2, '0');
    var slides = $$('.hero-slide'), bars = $$('.hero-bar');
    document.documentElement.style.setProperty('--dur', DUR + 'ms');
    function show(i, first) {
      cur = (i + S.length) % S.length;
      slides.forEach(function (el, k) { el.classList.toggle('active', k === cur); });
      bars.forEach(function (b, k) { b.classList.remove('active'); b.setAttribute('aria-selected', k === cur); });
      void hero.offsetWidth; bars[cur].classList.add('active');
      $('#hero-cur').textContent = String(cur + 1).padStart(2, '0');
      var s = S[cur];
      copy.classList.remove('in');
      copy.innerHTML = '<p class="hero-eyebrow">' + esc(s.eyebrow) + '</p><h1 class="hero-title">' + s.title + '</h1><p class="hero-text">' + esc(s.text) + '</p><div class="hero-cta"><a class="btn btn-gold" href="' + s.cta[1] + '">' + esc(s.cta[0]) + ' ' + ic('arrow-right') + '</a></div>';
      if (cur !== 0 || !first) { /* only slide 0 is the page h1 semantically; keep others as strong text */ if (cur !== 0) { var h = $('.hero-title', copy); h.outerHTML = h.outerHTML.replace(/^<h1/, '<p').replace(/<\/h1>$/, '</p>'); } }
      requestAnimationFrame(function () { requestAnimationFrame(function () { copy.classList.add('in'); }); });
      clearTimeout(timer);
      if (!hero.classList.contains('paused') && !reduce) timer = setTimeout(function () { show(cur + 1); }, DUR);
    }
    $('#hero-next').addEventListener('click', function () { show(cur + 1); });
    $('#hero-prev').addEventListener('click', function () { show(cur - 1); });
    bars.forEach(function (b, i) { b.addEventListener('click', function () { show(i); }); });
    function pause() { hero.classList.add('paused'); clearTimeout(timer); }
    function resume() { if (document.hidden) return; hero.classList.remove('paused'); clearTimeout(timer); var b = bars[cur]; b.classList.remove('active'); void b.offsetWidth; b.classList.add('active'); if (!reduce) timer = setTimeout(function () { show(cur + 1); }, DUR); }
    hero.addEventListener('mouseenter', pause); hero.addEventListener('mouseleave', resume);
    hero.addEventListener('focusin', pause); hero.addEventListener('focusout', resume);
    document.addEventListener('visibilitychange', function () { document.hidden ? pause() : resume(); });
    var x0 = null;
    hero.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    hero.addEventListener('touchend', function (e) { if (x0 == null) return; var dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 50) show(cur + (dx < 0 ? 1 : -1)); x0 = null; }, { passive: true });
    hero.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') show(cur + 1); if (e.key === 'ArrowLeft') show(cur - 1); });
    if (reduce) hero.classList.add('paused');
    show(0, true);
    /* preload next slides after first paint */
    window.addEventListener('load', function () { S.slice(1).forEach(function (s) { var i = new Image(); i.src = pxUrl(s.key, 1800); }); });

    /* search form */
    var sel = $('#hs-sec');
    sel.innerHTML = '<option value="all">Everything</option>' + G.sections.filter(function (s) { return s[0] !== 'all'; }).map(function (s) { return '<option value="' + s[0] + '">' + esc(s[1]) + '</option>'; }).join('');
    $('#hero-search').addEventListener('submit', function (e) {
      e.preventDefault(); applyFilter({ sec: sel.value, q: $('#hs-q').value.trim() }); scrollToEl('#explore');
    });
    /* mega menu images */
    $$('img[data-px]').forEach(function (el) { el.src = pxUrl(el.dataset.px, +el.dataset.w || 600); });
  })();

  /* ---------- facts + interests ---------- */
  $('#facts').innerHTML = G.facts.map(function (f) { return '<div class="fact reveal"><small>' + esc(f[0]) + '</small><b>' + esc(f[1]) + '</b><span>' + esc(f[2]) + '</span></div>'; }).join('');

  function countFor(t) {
    return PLACES.filter(function (p) { return t.cat ? p.c === t.cat : p.g === t.section; }).length;
  }
  $('#interests').innerHTML = G.interests.map(function (t) {
    var href = t.cat ? '#explore?cat=' + encodeURIComponent(t.cat) : '#explore?sec=' + t.section;
    return '<a class="tile reveal" href="' + href + '">' + img(t.key, 900, { sizes: '(max-width:860px) 50vw, 40vw' }) + '<div class="tile-body"><div><span class="tile-count">' + countFor(t) + ' places</span><h3>' + esc(t.title) + '</h3><p>' + esc(t.blurb) + '</p></div><span class="go">' + ic('arrow-right') + '</span></div></a>';
  }).join('');

  /* ---------- carousels ---------- */
  function setupTrack(track) {
    var wrap = track.closest('section');
    var nav = wrap && $('.carousel-nav[data-for="#' + track.id + '"]');
    if (nav) $$('button', nav).forEach(function (b) { b.addEventListener('click', function () { track.scrollBy({ left: +b.dataset.dir * Math.max(300, track.clientWidth * .7), behavior: 'smooth' }); }); });
    var bar = $('#' + track.id.replace('-track', '-bar'));
    function upd() { var m = track.scrollWidth - track.clientWidth; var p = m > 0 ? track.scrollLeft / m : 1; if (bar) bar.style.transform = 'scaleX(' + (0.12 + p * .88) + ')'; if (nav) { var b = $$('button', nav); b[0].disabled = track.scrollLeft < 8; b[1].disabled = track.scrollLeft > m - 8; } }
    track.addEventListener('scroll', upd, { passive: true }); window.addEventListener('resize', upd); setTimeout(upd, 200);
    /* mouse drag */
    var down = false, sx = 0, sl = 0, moved = 0;
    track.addEventListener('pointerdown', function (e) { if (e.pointerType !== 'mouse' || e.target.closest('button,a')) return; down = true; sx = e.clientX; sl = track.scrollLeft; moved = 0; });
    window.addEventListener('pointermove', function (e) { if (!down) return; var dx = e.clientX - sx; moved = Math.abs(dx); if (moved > 5) track.classList.add('dragging'); track.scrollLeft = sl - dx; });
    window.addEventListener('pointerup', function () { if (!down) return; down = false; setTimeout(function () { track.classList.remove('dragging'); }, 0); });
    track.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') track.scrollBy({ left: 300, behavior: 'smooth' }); if (e.key === 'ArrowLeft') track.scrollBy({ left: -300, behavior: 'smooth' }); });
  }

  /* featured */
  $('#featured-track').innerHTML = G.featured.map(function (f, i) {
    var p = byName[f.name]; if (!p) return '';
    return '<article class="feat" data-open="' + p.s + '" tabindex="0" aria-label="' + esc(f.name) + '">' + img(f.key, 700, { sizes: '(max-width:700px) 80vw, 380px' }) +
      '<span class="feat-num">' + String(i + 1).padStart(2, '0') + '</span>' + heart(p.s) +
      '<div class="feat-body"><small>' + esc(f.kicker) + '</small><h3>' + esc(f.name) + '</h3><p>' + esc(f.line) + '</p></div></article>';
  }).join('');
  /* food */
  $('#food-track').innerHTML = G.food.map(function (d) {
    return '<a class="dish" href="#explore?cat=' + encodeURIComponent(d.q) + '">' + img(d.key, 700, { sizes: '(max-width:700px) 70vw, 320px' }) + '<div><h3>' + esc(d.dish) + '</h3><p>' + esc(d.text) + '</p><span>Find places ' + ic('arrow-right') + '</span></div></a>';
  }).join('');
  /* trips */
  $('#trips-track').innerHTML = PLACES.filter(function (p) { return p.g === 'trips'; }).map(function (p) {
    return '<article class="trip-card"><div class="ti">' + img(p.i, 700, { sizes: '(max-width:700px) 80vw, 420px' }) + heart(p.s) + '</div><div class="tb"><span class="when">' + ic('route') + esc(p.h) + '</span><h3>' + esc(p.n) + '</h3><p>' + esc(p.d) + '</p>' +
      '<div class="card-actions"><a href="' + mapQ(p) + '" target="_blank" rel="noopener">' + ic('pin') + 'Map</a><a href="' + dirQ(p) + '" target="_blank" rel="noopener">' + ic('arrow-ur') + 'Directions</a><span class="push" style="color:var(--mute);font-weight:500">Best: ' + esc(p.b) + '</span></div></div></article>';
  }).join('');
  ['#featured-track', '#food-track', '#trips-track'].forEach(function (s) { setupTrack($(s)); });

  /* continuous auto-scrolling carousel (seamless loop); pauses on hover, touch, drag, focus */
  function autoPlay(track, speed) {
    if (!track || reduce || !track.children.length) return;
    Array.prototype.slice.call(track.children).forEach(function (n) { var c = n.cloneNode(true); c.setAttribute('aria-hidden', 'true'); c.tabIndex = -1; $$('button,a', c).forEach(function (x) { x.tabIndex = -1; }); track.appendChild(c); });
    var n0 = track.children.length / 2, hold = false, vis = false, rt, pos = track.scrollLeft, last = 0, cycle = 0;
    track.classList.add('auto');
    function measure() { cycle = track.children[n0].offsetLeft - track.children[0].offsetLeft; }
    measure(); window.addEventListener('resize', measure); window.addEventListener('load', measure);
    function holdFor(t) { hold = true; clearTimeout(rt); rt = setTimeout(function () { hold = false; pos = track.scrollLeft; }, t); }
    track.addEventListener('mouseenter', function () { clearTimeout(rt); hold = true; });
    track.addEventListener('mouseleave', function () { holdFor(600); });
    track.addEventListener('focusin', function () { clearTimeout(rt); hold = true; });
    track.addEventListener('focusout', function () { holdFor(600); });
    track.addEventListener('touchstart', function () { holdFor(3000); }, { passive: true });
    track.addEventListener('touchmove', function () { holdFor(3000); }, { passive: true });
    track.addEventListener('wheel', function () { holdFor(2500); }, { passive: true });
    track.addEventListener('pointerdown', function () { holdFor(3000); });
    var sec = track.closest('section'), nav = sec && $('.carousel-nav', sec);
    if (nav) nav.addEventListener('click', function () { holdFor(2500); });
    new IntersectionObserver(function (es) { vis = es[0].isIntersecting; last = 0; }, { threshold: 0 }).observe(track);
    function tick(t) {
      if (last && !hold && vis && !document.hidden && cycle > 0 && !track.classList.contains('dragging')) {
        var dt = Math.min(t - last, 50);
        pos += speed * dt / 1000;
        if (pos >= cycle) pos -= cycle;
        track.scrollLeft = pos;
      } else if (hold) { pos = track.scrollLeft; }
      last = (vis && !document.hidden) ? t : 0;
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  autoPlay($('#featured-track'), 55);

  /* ---------- walk (scrollytelling) ---------- */
  (function walk() {
    var W = G.walk; $('#walk-title').innerHTML = esc(W.title).replace('White Town', '<em>White Town</em>'); $('#walk-intro').textContent = W.intro;
    $('#walk-frame').innerHTML = W.stops.map(function (s, i) { return img(s.key, 1100, { eager: i === 0, sizes: '(max-width:860px) 100vw, 50vw' }).replace('<img ', '<img class="' + (i === 0 ? 'on' : '') + '" '); }).join('');
    $('#walk-dots').innerHTML = W.stops.map(function (s, i) { return '<i class="' + (i === 0 ? 'on' : '') + '"></i>'; }).join('');
    $('#walk-steps').innerHTML = W.stops.map(function (s, i) {
      return '<li class="walk-step' + (i === 0 ? ' on' : '') + '" data-i="' + i + '"><small>' + esc(s.t) + '</small><h3>' + esc(s.name) + '</h3><p>' + esc(s.text) + '</p>' + img(s.key, 800, { sizes: '100vw' }) + '</li>';
    }).join('');
    var frames = $$('#walk-frame img'), dots = $$('#walk-dots i'), steps = $$('.walk-step');
    function set(i) {
      frames.forEach(function (f, k) { f.classList.toggle('on', k === i); }); dots.forEach(function (d, k) { d.classList.toggle('on', k === i); });
      steps.forEach(function (s, k) { s.classList.toggle('on', k === i); });
      $('#walk-time').textContent = W.stops[i].t; $('#walk-name').textContent = W.stops[i].name;
    }
    set(0);
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) set(+e.target.dataset.i); }); }, { rootMargin: '-42% 0px -42% 0px' });
    steps.forEach(function (s) { io.observe(s); });
  })();

  /* ---------- auroville ---------- */
  (function auro() {
    var A = G.auroville; $('#auro-title').innerHTML = 'A city of <em>dawn</em><br>in the forest'; $('#auro-text').textContent = A.text;
    $('#auro-bg').style.backgroundImage = 'url("' + pxUrl('mat4', 2000) + '")';
    $('#auro-tips').innerHTML = A.tips.map(function (t, i) { return '<div class="auro-tip reveal"><i>0' + (i + 1) + '</i><div><b>' + esc(t[0]) + '</b><span>' + esc(t[1]) + '</span></div></div>'; }).join('');
  })();
  var pbg = $('#auro-bg'), psec = $('#auroville');
  function parallax() {
    if (reduce || !psec) return; var r = psec.getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight) return;
    pbg.style.transform = 'translate3d(0,' + (-(r.top / innerHeight) * 60).toFixed(1) + 'px,0)';
  }

  /* ---------- explorer ---------- */
  var PAGE = 12;
  var st = { sec: 'all', cat: '', diet: '', q: '', sort: 'top', shown: PAGE };
  var secDef = {}; G.sections.forEach(function (s) { secDef[s[0]] = s; });

  function filtered() {
    var q = st.q.toLowerCase();
    var L = PLACES.filter(function (p) {
      if (st.sec !== 'all' && p.g !== st.sec) return false;
      if (st.cat && p.c !== st.cat) return false;
      if (st.diet && p.v !== '' && !(st.diet === 'Veg' ? (p.v === 'veg' || p.v === 'both') : (p.v === 'nonveg' || p.v === 'both'))) return false;
      if (st.diet && p.v === '' && p.g === 'eat') return false;
      if (q && (p.n + ' ' + p.c + ' ' + p.d + ' ' + p.b).toLowerCase().indexOf(q) < 0) return false;
      return true;
    });
    var ORD = { sights: 0, auroville: 1, eat: 2, stay: 3, fun: 4, trips: 5, ride: 6 };
    var score = function (p) { return p.r ? (p.r * p.k + 4.0 * 60) / (p.k + 60) : 0; };
    L.sort(function (a, b) {
      if (st.sort === 'az') return a.n.localeCompare(b.n);
      if (st.sort === 'rev') return b.k - a.k;
      if (st.sec === 'all' && !q && ORD[a.g] !== ORD[b.g]) return ORD[a.g] - ORD[b.g];
      return (score(b) - score(a)) || (b.k - a.k);
    });
    return L;
  }
  function cardHtml(p, i) {
    var diet = p.v === 'veg' ? '<span class="diet veg">VEG</span>' : p.v === 'nonveg' ? '<span class="diet nonveg">NON-VEG</span>' : p.v === 'both' && p.g === 'eat' ? '<span class="diet both">VEG + NON-VEG</span>' : '';
    var hasLive = CFG.api && p.id;
    var photo = hasLive ? '<img src="' + CFG.api + '/api/photo/' + p.id + '" alt="' + esc(p.n) + '" loading="lazy" onerror="this.onerror=null;this.src=\'' + pxUrl(p.i, 800) + '\'">' : img(p.i, 800, { sizes: '(max-width:700px) 92vw, 320px' });
    return '<article class="card" style="--i:' + (i % PAGE) + '" data-slug="' + p.s + '"><div class="card-img" data-open="' + p.s + '">' + photo + diet + heart(p.s) + '<span class="pill">' + ic(ICON[p.c]) + esc(p.c) + '</span></div>' +
      '<div class="card-body"><h3 data-open="' + p.s + '">' + esc(p.n) + '</h3>' +
      '<div class="rating">' + (p.r ? '<b>' + ic('star') + p.r.toFixed(1) + '</b><small>' + fmt(p.k) + ' Google reviews</small>' : '<small>Rating: see Google Maps</small>') + '</div>' +
      '<ul class="meta"><li>' + ic(p.g === 'trips' ? 'route' : 'clock') + '<span>' + esc(p.h) + '</span></li><li>' + ic('sun') + '<span>Best time: ' + esc(p.b) + '</span></li></ul>' +
      '<p class="desc">' + esc(p.d) + '</p>' +
      '<div class="card-actions"><a href="' + mapQ(p) + '" target="_blank" rel="noopener">' + ic('pin') + 'Map</a><a href="' + dirQ(p) + '" target="_blank" rel="noopener">' + ic('arrow-ur') + 'Directions</a><button class="push" data-open="' + p.s + '">Details ' + ic('arrow-right') + '</button></div></div></article>';
  }
  function renderTabs() {
    $('#sec-tabs').innerHTML = G.sections.map(function (s) {
      var n = s[0] === 'all' ? PLACES.length : PLACES.filter(function (p) { return p.g === s[0]; }).length;
      return '<button class="tab' + (st.sec === s[0] ? ' on' : '') + '" role="tab" aria-selected="' + (st.sec === s[0]) + '" data-sec="' + s[0] + '">' + esc(s[1]) + '<small>' + n + '</small></button>';
    }).join('');
    var cats = secDef[st.sec] && secDef[st.sec][2];
    var cc = $('#cat-chips');
    if (cats) { cc.hidden = false; cc.innerHTML = '<button class="chip' + (!st.cat ? ' on' : '') + '" data-cat="">All</button>' + cats.map(function (c) { return '<button class="chip' + (st.cat === c ? ' on' : '') + '" data-cat="' + esc(c) + '">' + ic(ICON[c]) + esc(c) + '</button>'; }).join(''); } else { cc.hidden = true; cc.innerHTML = ''; }
    var dc = $('#diet-chips');
    if (st.sec === 'eat') { dc.hidden = false; dc.innerHTML = ['', 'Veg', 'Non-veg'].map(function (d) { return '<button class="chip' + (st.diet === d ? ' on' : '') + '" data-diet="' + d + '">' + (d === 'Veg' ? ic('leaf') : d === 'Non-veg' ? ic('fish') : '') + (d || 'Any diet') + '</button>'; }).join(''); } else { dc.hidden = true; st.diet = ''; }
  }
  function centerActive() {
    var ts = $('.tabs-scroll'), on = $('.tab.on');
    if (ts && on) ts.scrollLeft = on.offsetLeft - (ts.clientWidth - on.offsetWidth) / 2;
    var cr = $('#chips-row'), con = $('#chips-row .chip.on');
    if (cr) cr.scrollLeft = con ? Math.max(0, con.offsetLeft - 40) : 0;
  }
  function keepView() {
    var f = $('#filters'); if (!f || !f.classList.contains('stuck')) return;
    var hdr = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--hdr')) || 76;
    var top = $('#result-count').getBoundingClientRect().top + window.scrollY - (hdrH ? 0 : hdr) - f.offsetHeight - 12;
    if (window.scrollY > top) window.scrollTo({ top: top, behavior: reduce ? 'auto' : 'smooth' });
  }
  function renderGrid(append) {
    var L = filtered(), grid = $('#grid');
    var slice = L.slice(0, st.shown);
    var start = append ? grid.children.length : 0;
    if (append) grid.insertAdjacentHTML('beforeend', slice.slice(start).map(function (p, i) { return cardHtml(p, i); }).join(''));
    else grid.innerHTML = slice.map(cardHtml).join('');
    $('#result-count').textContent = L.length ? 'Showing ' + slice.length + ' of ' + L.length + ' places' : '';
    $('#grid-empty').hidden = L.length > 0;
    $('#load-more').hidden = slice.length >= L.length;
    syncFavsLight();
  }
  function syncFavsLight() { $$('.heart').forEach(function (b) { var on = isFav(b.dataset.fav); b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); }); }
  function renderExplorer() { renderTabs(); renderGrid(false); centerActive(); keepView(); }
  function applyFilter(o) {
    st.sec = o.sec || 'all'; st.cat = o.cat || ''; st.diet = o.diet || ''; st.q = o.q || ''; st.shown = PAGE;
    if (o.cat && !o.sec) { var m = PLACES.filter(function (p) { return p.c === o.cat; })[0]; if (m) st.sec = m.g === 'auroville' ? 'auroville' : m.g; }
    $('#q').value = st.q; renderExplorer();
  }
  $('#sec-tabs').addEventListener('click', function (e) { var b = e.target.closest('[data-sec]'); if (!b) return; st.sec = b.dataset.sec; st.cat = ''; st.diet = ''; st.shown = PAGE; renderExplorer(); });
  $('#cat-chips').addEventListener('click', function (e) { var b = e.target.closest('[data-cat]'); if (!b) return; st.cat = b.dataset.cat; st.shown = PAGE; renderExplorer(); });
  $('#diet-chips').addEventListener('click', function (e) { var b = e.target.closest('[data-diet]'); if (!b) return; st.diet = b.dataset.diet; st.shown = PAGE; renderExplorer(); });
  var qt; $('#q').addEventListener('input', function (e) { clearTimeout(qt); qt = setTimeout(function () { st.q = e.target.value.trim(); st.shown = PAGE; renderGrid(false); }, 150); });
  $('#sort').addEventListener('change', function (e) { st.sort = e.target.value; st.shown = PAGE; renderGrid(false); });
  $('#load-more').addEventListener('click', function () { st.shown += PAGE; renderGrid(true); });
  $('#clear-filters').addEventListener('click', function () { applyFilter({}); });

  /* ---------- global clicks: details, hearts, hash filters ---------- */
  function scrollToEl(sel) { var el = $(sel); if (el) el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }); }
  document.addEventListener('click', function (e) {
    var h = e.target.closest('.heart');
    if (h) { e.preventDefault(); e.stopPropagation(); toggleFav(h.dataset.fav); return; }
    var a = e.target.closest('a[href^="#"]');
    if (a) {
      var href = a.getAttribute('href');
      closeMenu();
      if (href.indexOf('#explore?') === 0) {
        e.preventDefault(); var pr = new URLSearchParams(href.split('?')[1]);
        applyFilter({ sec: pr.get('sec'), cat: pr.get('cat'), diet: pr.get('diet'), q: pr.get('q') }); scrollToEl('#explore'); return;
      }
    }
    var o = e.target.closest('[data-open]');
    if (o && !e.target.closest('a')) { if (document.querySelector('.track.dragging')) return; openPlace(o.dataset.open); }
  });
  document.addEventListener('keydown', function (e) { if ((e.key === 'Enter') && e.target.classList && e.target.classList.contains('feat')) openPlace(e.target.dataset.open); });

  /* ---------- place dialog ---------- */
  var pd = $('#place-dlg');
  function openPlace(s) {
    var p = bySlug[s]; if (!p) return;
    var more = PLACES.filter(function (x) { return x.c === p.c && x.s !== p.s; }).sort(function (a, b) { return (b.r || 0) - (a.r || 0); }).slice(0, 4);
    $('#place-body').innerHTML = '<div class="pd"><div class="pd-img">' + img(p.i, 1000, { eager: true, sizes: '(max-width:1100px) 100vw, 480px' }) + heart(p.s) + '</div>' +
      '<div class="pd-body"><span class="kick">' + ic(ICON[p.c]) + esc(p.c) + '</span><h2 id="pd-title">' + esc(p.n) + '</h2>' +
      '<div class="rating">' + (p.r ? '<b>' + ic('star') + p.r.toFixed(1) + '</b><small>' + fmt(p.k) + ' Google reviews</small>' : '<small>Rating: see Google Maps</small>') + '</div>' +
      '<p>' + esc(p.d) + '</p><ul class="meta"><li>' + ic(p.g === 'trips' ? 'route' : 'clock') + '<span>' + esc(p.h) + '</span></li><li>' + ic('sun') + '<span>Best time: ' + esc(p.b) + '</span></li></ul>' +
      '<div class="pd-actions"><a class="btn btn-gold" href="' + dirQ(p) + '" target="_blank" rel="noopener">' + ic('route') + 'Directions</a><a class="btn btn-outline" href="' + mapQ(p) + '" target="_blank" rel="noopener">' + ic('pin') + 'Map &amp; reviews</a><button class="btn btn-outline" data-fav-btn="' + p.s + '">' + ic('heart') + '<span>' + (isFav(p.s) ? 'Saved' : 'Save to trip') + '</span></button></div></div>' +
      (CFG.api && p.id ? '' : '<p class="pd-note">Photo is illustrative of this type of place, not the exact venue.</p>') +
      '<div class="pd-social"><span>See it on</span><a href="https://www.instagram.com/explore/tags/' + encodeURIComponent(p.n.replace(/\(.*?\)/g, '').replace(/[^a-z0-9]/gi, '').toLowerCase()) + '/" target="_blank" rel="noopener noreferrer">Instagram</a><a href="https://www.quora.com/search?q=' + encodeURIComponent(p.n.replace(/\(.*?\)/g, '') + ' Pondicherry') + '" target="_blank" rel="noopener noreferrer">Quora</a></div>' +
      (more.length ? '<div class="pd-more"><h4>More in ' + esc(p.c) + '</h4><div class="pd-more-row">' + more.map(function (m) { return '<button data-swap="' + m.s + '">' + img(m.i, 400, { sizes: '200px' }) + '<span>' + esc(m.n) + '</span></button>'; }).join('') + '</div></div>' : '') + '</div>';
    if (!pd.open) pd.showModal(); pd.scrollTop = 0; syncFavsLight();
  }
  pd.addEventListener('click', function (e) {
    var sw = e.target.closest('[data-swap]'); if (sw) { openPlace(sw.dataset.swap); return; }
    var fb = e.target.closest('[data-fav-btn]'); if (fb) { toggleFav(fb.dataset.favBtn); $('span', fb).textContent = isFav(fb.dataset.favBtn) ? 'Saved' : 'Save to trip'; return; }
    if (e.target === pd) pd.close();
  });
  $$('dialog').forEach(function (d) { d.addEventListener('close', function () { document.body.style.overflow = ''; }); d.addEventListener('click', function (e) { if (e.target === d && d.id !== 'search-dlg') d.close(); }); });

  /* ---------- search dialog ---------- */
  var sd = $('#search-dlg'), sq = $('#sq');
  $('#open-search').addEventListener('click', function () { sd.showModal(); sq.value = ''; sqRender(''); setTimeout(function () { sq.focus(); }, 50); });
  function sqRender(v) {
    v = v.toLowerCase().trim();
    var L = v ? PLACES.filter(function (p) { return (p.n + ' ' + p.c).toLowerCase().indexOf(v) > -1; }) : PLACES.filter(function (p) { return p.r >= 4.6 && p.k >= 2000; });
    $('#search-results').innerHTML = L.slice(0, 8).map(function (p) { return '<li><a data-sr="' + p.s + '">' + img(p.i, 160, { sizes: '60px', alt: '' }) + '<span><b>' + esc(p.n) + '</b><small>' + esc(p.c) + (p.r ? ' · ' + p.r.toFixed(1) + ' ★' : '') + '</small></span></a></li>'; }).join('') || '<li style="padding:20px 4px;color:var(--mute)">No matches found.</li>';
  }
  sq.addEventListener('input', function () { sqRender(sq.value); });
  $('#search-results').addEventListener('click', function (e) { var a = e.target.closest('[data-sr]'); if (!a) return; sd.close(); openPlace(a.dataset.sr); });

  /* ---------- itineraries ---------- */
  var itinCur = 0;
  function renderItin() {
    $('#itin-tabs').innerHTML = G.itineraries.map(function (t, i) { return '<button class="tab' + (i === itinCur ? ' on' : '') + '" role="tab" aria-selected="' + (i === itinCur) + '" data-i="' + i + '">' + esc(t.name) + '</button>'; }).join('');
    var t = G.itineraries[itinCur], picks = t.picks.map(function (n) { return byName[n]; }).filter(Boolean);
    var route = 'https://www.google.com/maps/dir/' + picks.map(function (p) { return encodeURIComponent(p.n + ' Puducherry'); }).join('/');
    $('#itin-panel').innerHTML = '<div class="itin-cover">' + img(t.key, 900, { sizes: '(max-width:1100px) 100vw, 40vw' }) + '<small>' + esc(t.tag) + '</small><h3>' + esc(t.name) + '</h3><p>' + esc(t.note) + '</p><div class="cta-row" style="margin:0"><button class="btn btn-gold" id="itin-add">' + ic('plus') + 'Add to My Trip</button><a class="btn btn-ghost" href="' + route + '" target="_blank" rel="noopener">' + ic('route') + 'Route</a></div></div>' +
      '<div class="itin-days">' + t.days.map(function (d) { return '<div class="itin-day"><h4>' + esc(d[0]) + '</h4><ul>' + d[1].map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul></div>'; }).join('') + '</div>';
    $('#itin-add').addEventListener('click', function () { var n = 0; picks.forEach(function (p) { if (!isFav(p.s)) { favs.push(p.s); n++; } }); store('pdyfav', favs); syncFavs(); toast(n ? n + ' places added to My Trip' : 'Already in My Trip'); });
  }
  $('#itin-tabs').addEventListener('click', function (e) { var b = e.target.closest('[data-i]'); if (!b) return; itinCur = +b.dataset.i; renderItin(); });
  renderItin();

  /* ---------- months ---------- */
  (function months() {
    var M = G.months, cur = new Date().getMonth();
    var cols = ['l0', 'l1', 'l2', 'l3'];
    $('#months').innerHTML = M.map(function (m, i) { return '<button class="mo ' + cols[m[1]] + (i === cur ? ' on' : '') + '" role="listitem" data-m="' + i + '" style="height:' + (28 + m[1] * 24) + '%;--i:' + i + '" aria-label="' + m[0] + ': ' + G.monthLabels[m[1]] + '">' + m[0] + '</button>'; }).join('');
    var sw = ['#e8b8a9', '#f1d68f', '#8fc6cf', '#0f5c6e'];
    $('#month-legend').innerHTML = G.monthLabels.map(function (l, i) { return '<li><i style="background:' + sw[i] + '"></i>' + l + '</li>'; }).join('');
    function note(i) { $$('.mo').forEach(function (b, k) { b.classList.toggle('on', k === i); }); $('#month-note').innerHTML = '<b>' + M[i][0] + ' · ' + G.monthLabels[M[i][1]] + '</b><span>' + esc(M[i][2]) + '</span>'; }
    note(cur);
    $('#months').addEventListener('click', function (e) { var b = e.target.closest('.mo'); if (b) note(+b.dataset.m); });
    $('#months').addEventListener('mouseover', function (e) { var b = e.target.closest('.mo'); if (b) note(+b.dataset.m); });
  })();

  /* ---------- plan tabs ---------- */
  (function plan() {
    var P = G.planTabs, keys = ['getting', 'around', 'costs', 'times'], cur = 'getting';
    var TAB_IC = { getting: 'route', around: 'scooter', costs: 'wallet', times: 'clock' };
    var GET_IC = ['car', 'train', 'plane', 'route'];
    var AROUND_IC = ['bus', 'auto', 'bike', 'scooter', 'scooter', 'car'];
    var MINS = [15, 20, 30, 35, 45, 75, 120, 150, 210];
    function tbl(head, rows) { return '<div class="tbl-wrap"><table><thead><tr>' + head.map(function (h) { return '<th>' + esc(h) + '</th>'; }).join('') + '</tr></thead><tbody>' + rows.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + esc(c) + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>'; }
    function render() {
      $('#plan-tabs').innerHTML = keys.map(function (k) { return '<button class="tab' + (k === cur ? ' on' : '') + '" role="tab" aria-selected="' + (k === cur) + '" data-k="' + k + '">' + ic(TAB_IC[k]) + esc(P[k].title) + '</button>'; }).join('');
      var d = P[cur], h = '';
      if (cur === 'getting') {
        h = '<div class="facts-strip">' + d.facts.map(function (f) { return '<div><b>' + esc(f[0]) + '</b><span>' + esc(f[1]) + '</span></div>'; }).join('') + '</div>' +
          '<div class="mode-grid mode-grid-4">' + d.rows.map(function (r, i) { return '<article class="mode"><span class="mode-ic">' + ic(GET_IC[i] || 'route') + '</span><h3>' + esc(r[0]) + '</h3><p>' + esc(r[1]) + '</p></article>'; }).join('') + '</div>';
      } else if (cur === 'around') {
        h = '<div class="mode-grid mode-grid-3">' + d.rows.map(function (r, i) { return '<article class="mode"><span class="mode-ic">' + ic(AROUND_IC[i] || 'route') + '</span><h3>' + esc(r[0]) + '</h3><span class="price-chip">' + esc(r[1]) + '</span><p>' + esc(r[2]) + '</p></article>'; }).join('') + '</div>' +
          '<p class="plan-note">Rental options are listed under <a href="#explore?sec=ride">Rentals</a>. Carry your licence and ID, photograph the vehicle first, and confirm deposit, fuel, insurance and extra-kilometre terms.</p>';
      } else if (cur === 'costs') {
        h = '<div class="tbl-grid">' + d.tables.map(function (t) { return tbl(t.head, t.rows); }).join('') + '</div><p class="plan-note">' + esc(d.note) + '</p>';
      } else {
        h = '<ul class="time-list">' + d.rows.map(function (r, i) { return '<li><span class="tl-name">' + esc(r[0]) + '</span><span class="tl-bar"><i style="width:' + Math.max(6, Math.round((MINS[i] || 60) / 210 * 100)) + '%"></i></span><b>' + esc(r[1]) + '</b></li>'; }).join('') + '</ul>';
      }
      $('#plan-panel').innerHTML = h;
    }
    $('#plan-tabs').addEventListener('click', function (e) { var b = e.target.closest('[data-k]'); if (b) { cur = b.dataset.k; render(); } });
    render();
  })();

  /* ---------- budget ---------- */
  function calc() {
    var g = function (id) { return +$(id).value; }, t = Math.max(1, Math.min(20, g('#bt') || 1)), d = g('#bd');
    var stay = Math.ceil(t / 2) * g('#bs') * (d - 1), tr = g('#btr') * d, food = t * g('#bf') * d, tot = stay + tr + food;
    $('#bo').textContent = '₹' + fmt(tot); $('#bp2').textContent = 'About ₹' + fmt(Math.round(tot / t)) + ' per person, rooms shared by two.';
    $('#bb-stay').style.width = (stay / tot * 100) + '%'; $('#bb-trans').style.width = (tr / tot * 100) + '%'; $('#bb-food').style.width = (food / tot * 100) + '%';
    $('#bl-stay').textContent = '₹' + fmt(stay); $('#bl-trans').textContent = '₹' + fmt(tr); $('#bl-food').textContent = '₹' + fmt(food);
  }
  $('#bp').addEventListener('input', calc); $('#bp').addEventListener('change', calc); calc();

  /* ---------- tips, emergency, events, gallery, map, faq, resources ---------- */
  $('#buzz-grid').innerHTML = G.buzz.map(function (b) { return '<article class="buzz reveal"><small>' + esc(b.k) + '</small><h3>' + esc(b.t) + '</h3><p>' + esc(b.x) + '</p></article>'; }).join('');
  $('#buzz-links').innerHTML = G.buzzLinks.map(function (l) { return '<a href="' + l[1] + '" target="_blank" rel="noopener noreferrer">' + ic('arrow-ur') + esc(l[0]) + '</a>'; }).join('');
  $('#tips-grid').innerHTML = G.tips.map(function (t) { return '<div class="tip reveal">' + ic(t.icon) + '<h3>' + esc(t.t) + '</h3><p>' + esc(t.x) + '</p></div>'; }).join('');
  $('#emergency').innerHTML = G.emergency.map(function (e) { return '<li><b>' + e[1] + '</b><small>' + e[0] + '</small></li>'; }).join('');
  (function events() {
    var now = new Date().getMonth() + 1, E = G.events.slice().sort(function (a, b) { return a.mo - b.mo; });
    var nextI = E.findIndex(function (e) { return e.mo >= now; }); if (nextI < 0) nextI = 0;
    var MN = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    $('#events-list').innerHTML = E.map(function (e, i) {
      return '<li class="event reveal' + (i === nextI ? ' next' : '') + '" data-tag="' + esc(e.tag) + '"><div class="ev-date"><b>' + MN[e.mo] + '</b><span>' + esc(e.d) + '</span></div><div class="ev-body"><small>' + esc(e.tag) + (i === nextI ? ' · Next up' : '') + '</small><h3>' + esc(e.t) + '</h3><p>' + esc(e.x) + '</p></div></li>';
    }).join('');
  })();
  $('#gallery-grid').innerHTML = G.gallery.map(function (g, i) { return '<button class="g-item reveal" data-lb="' + i + '" aria-label="View photo: ' + esc(g[1]) + '">' + img(g[0], 700, { sizes: '(max-width:700px) 50vw, 25vw', alt: g[1] }) + '<span>' + esc(g[1]) + '</span></button>'; }).join('');
  var mapSearches = [['Beaches', 'beaches in Puducherry'], ['Cafes & bakeries', 'cafes in Puducherry'], ['Restaurants', 'restaurants in Puducherry'], ['Hotels', 'hotels in Puducherry'], ['Temples & churches', 'temples and churches in Puducherry'], ['ATMs', 'ATM in Puducherry'], ['Pharmacies', 'pharmacy in Puducherry'], ['Petrol pumps', 'petrol pump in Puducherry']];
  $('#map-links').innerHTML = mapSearches.map(function (m) { return '<a href="https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(m[1]) + '" target="_blank" rel="noopener">' + ic('pin') + m[0] + ic('arrow-ur') + '</a>'; }).join('');
  $('#faq-list').innerHTML = G.faq.map(function (f, i) { return '<details' + (i === 0 ? ' open' : '') + '><summary>' + esc(f[0]) + ic('plus') + '</summary><p>' + esc(f[1]) + '</p></details>'; }).join('');
  $('#resource-grid').innerHTML = G.official.map(function (r) { return '<a class="res reveal" href="' + r[2] + '" target="_blank" rel="noopener"><h3>' + esc(r[0]) + ic('arrow-ur') + '</h3><p>' + esc(r[1]) + '</p></a>'; }).join('');
  $('#yr').textContent = new Date().getFullYear();

  /* lightbox */
  var lb = $('#lightbox'), lbi = 0;
  function lbShow(i) { lbi = (i + G.gallery.length) % G.gallery.length; var g = G.gallery[lbi]; var el = $('#lb-img'); el.style.animation = 'none'; void el.offsetWidth; el.style.animation = ''; el.src = pxUrl(g[0], 1600); el.alt = pxAlt(g[0]); $('#lb-cap').textContent = g[1]; }
  $('#gallery-grid').addEventListener('click', function (e) { var b = e.target.closest('[data-lb]'); if (!b) return; lbShow(+b.dataset.lb); lb.showModal(); });
  $('#lb-prev').addEventListener('click', function () { lbShow(lbi - 1); }); $('#lb-next').addEventListener('click', function () { lbShow(lbi + 1); });
  lb.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') lbShow(lbi + 1); if (e.key === 'ArrowLeft') lbShow(lbi - 1); });
  var lx = null; lb.addEventListener('touchstart', function (e) { lx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', function (e) { if (lx == null) return; var dx = e.changedTouches[0].clientX - lx; if (Math.abs(dx) > 50) lbShow(lbi + (dx < 0 ? 1 : -1)); lx = null; }, { passive: true });

  /* ---------- My Trip drawer ---------- */
  var drawer = $('#trip-drawer'), scrim = $('#scrim');
  function openTrip() { renderTrip(); drawer.classList.add('open'); drawer.setAttribute('aria-hidden', 'false'); scrim.hidden = false; requestAnimationFrame(function () { scrim.classList.add('on'); }); document.body.style.overflow = 'hidden'; }
  function closeTrip() { if (!drawer.classList.contains('open')) return; drawer.classList.remove('open'); drawer.setAttribute('aria-hidden', 'true'); scrim.classList.remove('on'); setTimeout(function () { scrim.hidden = true; }, 400); document.body.style.overflow = ''; }
  $('#open-trip').addEventListener('click', openTrip); $('#close-trip').addEventListener('click', closeTrip); scrim.addEventListener('click', closeTrip);
  function tripText() { return favs.map(function (s, i) { var p = bySlug[s]; return (i + 1) + '. ' + p.n + ' - ' + mapQ(p); }).join('\n'); }
  function renderTrip() {
    var L = favs.map(function (s) { return bySlug[s]; }).filter(Boolean);
    $('#trip-sub').textContent = L.length ? L.length + (L.length === 1 ? ' place saved' : ' places saved') + ' in this browser' : 'Places you save appear here.';
    $('#trip-list').innerHTML = L.length ? L.map(function (p) { return '<div class="t-item">' + img(p.i, 160, { sizes: '68px', alt: '' }) + '<div><b>' + esc(p.n) + '</b><small>' + esc(p.c) + '</small></div><button data-rm="' + p.s + '" aria-label="Remove ' + esc(p.n) + '">' + ic('close') + '</button></div>'; }).join('')
      : '<div class="t-empty">' + ic('heart') + '<p>Tap the heart on any place to build your trip, then open it as a route in Google Maps.</p></div>';
    $('#trip-foot').hidden = !L.length;
    if (L.length) {
      $('#trip-route').href = 'https://www.google.com/maps/dir/' + L.map(function (p) { return encodeURIComponent(p.n + ' Puducherry'); }).join('/');
      $('#trip-wa').href = 'https://wa.me/?text=' + encodeURIComponent('My Puducherry trip:\n' + tripText());
    }
  }
  $('#trip-list').addEventListener('click', function (e) { var b = e.target.closest('[data-rm]'); if (b) toggleFav(b.dataset.rm); });
  $('#trip-copy').addEventListener('click', function () { var t = tripText(); if (navigator.clipboard) navigator.clipboard.writeText(t).then(function () { toast('List copied'); }, function () { toast('Copy not allowed here'); }); else toast('Copy not supported'); });
  $('#trip-print').addEventListener('click', function () { document.body.classList.add('printing'); window.print(); document.body.classList.remove('printing'); });
  $('#trip-clear').addEventListener('click', function () { favs.length = 0; store('pdyfav', favs); syncFavs(); });

  /* ---------- reveal on scroll ---------- */
  var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: .12, rootMargin: '0px 0px -6% 0px' });
  $$('.reveal').forEach(function (el, i) { el.style.transitionDelay = (i % 4) * 70 + 'ms'; io.observe(el); });

  /* ---------- init ---------- */
  renderExplorer(); syncFavs(); onScroll();
  if (location.hash.indexOf('#explore?') === 0) { var pr = new URLSearchParams(location.hash.split('?')[1]); applyFilter({ sec: pr.get('sec'), cat: pr.get('cat'), diet: pr.get('diet'), q: pr.get('q') }); setTimeout(function () { scrollToEl('#explore'); }, 300); }
})();
