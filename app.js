/* Rocketree Onepager — interactions */
(function () {
  'use strict';
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Scroll progress + sticky nav state ---- */
  var progress = document.getElementById('progress');
  var nav = document.getElementById('nav');
  var sticky = document.getElementById('stickyCta');

  function onScroll() {
    var st = window.scrollY || document.documentElement.scrollTop;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    var pct = h > 0 ? (st / h) * 100 : 0;
    if (progress) progress.style.width = pct + '%';
    if (nav) nav.classList.toggle('scrolled', st > 24);
    if (sticky) sticky.classList.toggle('show', st > window.innerHeight * 0.7);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu ---- */
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('mobileMenu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      menu.hidden = !menu.hidden;
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) menu.hidden = true;
    });
  }

  /* ---- Reveal on scroll (rect-based sweep — robust in preview iframes) ----
     Adding .in plays the CSS transition in a live tab. We ALSO schedule a
     finalize that snaps the end-state with transition:none after the animation
     window — a visual no-op in a foreground tab, but it rescues any context
     where the transition clock is frozen (offscreen/backgrounded/capture) so
     content is never trapped mid-fade. */
  var reveals = [].slice.call(document.querySelectorAll('.reveal'));
  function forceShow(el) { el.style.transition = 'none'; el.style.opacity = '1'; el.style.transform = 'none'; }
  function sweepReveals() {
    if (prefersReduced) { reveals.forEach(forceShow); reveals = []; return; }
    var vh = window.innerHeight || document.documentElement.clientHeight || 800;
    reveals = reveals.filter(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < vh + 60 && r.bottom > -40) {
        el.classList.add('in');
        setTimeout(function () { forceShow(el); }, 1150);
        return false;
      }
      return true;
    });
  }


  /* ---- Scrollspy ---- */
  var sections = ['was', 'einstieg', 'ablauf', 'fuerwen', 'team', 'faq', 'anfragen'];
  var linkFor = {};
  document.querySelectorAll('.nav-links .nav-link').forEach(function (a) {
    var id = (a.getAttribute('href') || '').replace('#', '');
    if (id) linkFor[id] = a;
  });
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var id = e.target.id;
        if (e.isIntersecting && linkFor[id]) {
          Object.keys(linkFor).forEach(function (k) { linkFor[k].classList.remove('active'); });
          linkFor[id].classList.add('active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (id) { var s = document.getElementById(id); if (s) spy.observe(s); });
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    q.addEventListener('click', function () {
      var open = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (other) {
        other.classList.remove('open');
        other.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!open) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  /* ---- 90-day journey animation ---- */
  var journey = document.getElementById('ablauf');
  var jFinalize = null;
  function animateJourney() {
    if (!journey) return;
    journey.setAttribute('data-animate', 'in');
    var mode = journey.getAttribute('data-mode');
    var fill = document.getElementById('tlFill');
    var phases = journey.querySelectorAll('.tl-phase');
    // clear any prior frozen-finalize inline styles so the animation can play
    phases.forEach(function (p) { p.style.transition = ''; });
    if (fill) fill.style.transition = '';
    journey.querySelectorAll('.j-prog .jp-bar i').forEach(function (b) { b.style.transition = ''; });
    if (mode === 'timeline') {
      if (fill) fill.style.width = '100%';
      phases.forEach(function (p, i) {
        setTimeout(function () { p.classList.add('on'); }, prefersReduced ? 0 : 250 + i * 320);
      });
    }
    if (mode === 'progress') {
      journey.querySelectorAll('.j-prog .jp-bar i').forEach(function (bar, i) {
        var w = bar.getAttribute('data-w');
        setTimeout(function () { bar.style.width = w + '%'; }, prefersReduced ? 0 : 150 + i * 220);
      });
    }
    // finalize (frozen-context safety): no-op in a live tab, rescues frozen ones
    clearTimeout(jFinalize);
    jFinalize = setTimeout(forceJourneyDone, 1700);
  }
  function forceJourneyDone() {
    if (!journey) return;
    journey.setAttribute('data-animate', 'in');
    var fill = document.getElementById('tlFill');
    journey.querySelectorAll('.tl-phase').forEach(function (p) { p.style.transition = 'none'; p.style.opacity = '1'; p.style.transform = 'none'; p.classList.add('on'); });
    if (fill) { fill.style.transition = 'none'; fill.style.width = '100%'; }
    journey.querySelectorAll('.j-prog .jp-bar i').forEach(function (b) { b.style.transition = 'none'; b.style.width = b.getAttribute('data-w') + '%'; });
  }
  function resetJourney() {
    if (!journey) return;
    var fill = document.getElementById('tlFill');
    if (fill) { fill.style.transition = ''; fill.style.width = '0'; }
    journey.querySelectorAll('.tl-phase').forEach(function (p) { p.style.transition = ''; p.style.opacity = ''; p.style.transform = ''; p.classList.remove('on'); });
    journey.querySelectorAll('.j-prog .jp-bar i').forEach(function (b) { b.style.transition = ''; b.style.width = '0'; });
  }
  var journeyPlayed = false;
  function checkJourney() {
    if (!journey || journeyPlayed) return;
    var vh = window.innerHeight || document.documentElement.clientHeight;
    var r = journey.getBoundingClientRect();
    if (r.top < vh * 0.65 && r.bottom > 0) { journeyPlayed = true; animateJourney(); }
  }

  /* ---- Unified scroll/resize handler for reveals + journey ---- */
  function onScrollExtras() { sweepReveals(); checkJourney(); }
  window.addEventListener('scroll', onScrollExtras, { passive: true });
  window.addEventListener('resize', onScrollExtras);
  window.addEventListener('load', onScrollExtras);
  onScrollExtras();
  requestAnimationFrame(onScrollExtras);
  setTimeout(onScrollExtras, 300);

  /* Re-run journey animation when the mode tweak changes */
  window.RocketreeReplayJourney = function () {
    resetJourney();
    // force reflow then animate
    void journey.offsetWidth;
    animateJourney();
  };
})();
