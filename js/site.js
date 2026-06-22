/* Sara Murdock — shared site chrome + behaviour
   Injects the header and footer on every page (single source of truth),
   highlights the active nav item from <body data-page="...">, then wires
   the sticky header, mobile menu, scroll-reveal and footer year. */
(function () {
  var page = document.body.getAttribute('data-page') || '';

  var nav = [
    ['about', 'about.html', 'About'],
    ['portfolio', 'portfolio.html', 'Portfolio'],
    ['services', 'services.html', 'Services'],
    ['blog', 'blog.html', 'Blog'],
    ['contact', 'contact.html', 'Contact']
  ].map(function (n) {
    return '<li><a href="' + n[1] + '"' + (page === n[0] ? ' class="active"' : '') + '>' + n[2] + '</a></li>';
  }).join('');

  var header =
    '<header id="site-header"><nav>' +
      '<a href="saramurdock.html" class="brand"><span class="dot"></span>Sara Murdock</a>' +
      '<ul class="navlinks">' + nav + '</ul>' +
      '<a href="book-online.html" class="nav-cta">Book online</a>' +
      '<button class="menu-btn" id="menuBtn" aria-label="Open menu" aria-expanded="false">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></svg>' +
      '</button>' +
    '</nav></header>';

  var social =
    '<a href="https://www.linkedin.com/in/saramurdock/" target="_blank" rel="noopener" aria-label="LinkedIn"><svg viewBox="0 0 24 24"><path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0ZM.5 8h4V24h-4V8Zm7.5 0h3.8v2.2h.05c.53-1 1.83-2.2 3.77-2.2 4.03 0 4.78 2.65 4.78 6.1V24h-4v-7.1c0-1.7-.03-3.9-2.38-3.9-2.38 0-2.75 1.86-2.75 3.78V24h-4V8Z"/></svg></a>' +
    '<a href="https://www.instagram.com/insta.by.sara" target="_blank" rel="noopener" aria-label="Instagram"><svg viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.25.07 1.65.07 4.85s0 3.6-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.25.06-1.65.07-4.85.07s-3.6 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.6 2.2 15.2 2.2 12s0-3.6.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.4 2.21 8.8 2.2 12 2.2Zm0 1.8c-3.15 0-3.5 0-4.74.07-.9.04-1.4.2-1.72.32-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.13.32-.28.82-.32 1.72C3.4 8.5 3.4 8.85 3.4 12s0 3.5.07 4.74c.04.9.2 1.4.32 1.72.17.43.37.74.69 1.06.32.32.63.52 1.06.69.32.13.82.28 1.72.32 1.25.07 1.6.07 4.74.07s3.5 0 4.74-.07c.9-.04 1.4-.2 1.72-.32.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.13-.32.28-.82.32-1.72.07-1.25.07-1.6.07-4.74s0-3.5-.07-4.74c-.04-.9-.2-1.4-.32-1.72a2.85 2.85 0 0 0-.69-1.06 2.85 2.85 0 0 0-1.06-.69c-.32-.13-.82-.28-1.72-.32C15.5 4 15.15 4 12 4Zm0 3.06A4.94 4.94 0 1 1 12 17a4.94 4.94 0 0 1 0-9.88Zm0 1.8a3.14 3.14 0 1 0 0 6.28 3.14 3.14 0 0 0 0-6.28Zm5.14-.95a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0Z"/></svg></a>' +
    '<a href="https://www.facebook.com/Sara.Murdock00/" target="_blank" rel="noopener" aria-label="Facebook"><svg viewBox="0 0 24 24"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46H15.2c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z"/></svg></a>' +
    '<a href="https://www.tiktok.com/@saraa.murdock" target="_blank" rel="noopener" aria-label="TikTok"><svg viewBox="0 0 24 24"><path d="M16.6 5.82a4.28 4.28 0 0 1-1.06-2.82h-3.1v12.2a2.6 2.6 0 1 1-2.6-2.6c.27 0 .53.04.78.12v-3.16a5.74 5.74 0 0 0-.78-.05 5.76 5.76 0 1 0 5.76 5.76V9.01a7.34 7.34 0 0 0 4.3 1.38V7.28a4.3 4.3 0 0 1-3.3-1.46Z"/></svg></a>' +
    '<a href="https://x.com/SaraM35813" target="_blank" rel="noopener" aria-label="X"><svg viewBox="0 0 24 24"><path d="M18.24 2.25h3.31l-7.23 8.26L22.5 21.75h-6.56l-5.14-6.72-5.88 6.72H1.6l7.73-8.84L1.5 2.25h6.73l4.65 6.15 5.36-6.15Zm-1.16 17.52h1.83L7.01 4.13H5.04l12.04 15.64Z"/></svg></a>' +
    '<a href="https://www.youtube.com/@Sara.Murdock" target="_blank" rel="noopener" aria-label="YouTube"><svg viewBox="0 0 24 24"><path d="M23.5 6.5a3 3 0 0 0-2.1-2.1C19.5 3.9 12 3.9 12 3.9s-7.5 0-9.4.5A3 3 0 0 0 .5 6.5 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.5 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.5ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z"/></svg></a>';

  var footer =
    '<footer><div class="wrap foot-grid">' +
      '<a href="saramurdock.html" class="brand"><span class="dot"></span>Sara Murdock</a>' +
      '<div class="socials">' + social + '</div>' +
      '<div class="copy">&copy; <span id="yr"></span> Sara Murdock. All rights reserved.</div>' +
    '</div></footer>';

  document.body.insertAdjacentHTML('afterbegin', header);
  document.body.insertAdjacentHTML('beforeend', footer);

  // Cinematic chrome — atmosphere, grain, vignette, scroll-progress.
  // Skipped when the page already embeds it inline (e.g. the home page).
  if (!document.querySelector('.cine-progress')) {
    document.body.insertAdjacentHTML('afterbegin',
      '<div class="cine-progress" aria-hidden="true"></div>' +
      '<div class="atmo" aria-hidden="true"><span class="blob b1"></span><span class="blob b2"></span></div>' +
      '<div class="grain" aria-hidden="true"></div>' +
      '<div class="vignette" aria-hidden="true"></div>');
  }

  // Footer year
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  // Sticky header background on scroll
  var headerEl = document.getElementById('site-header');
  if (headerEl) {
    var onScroll = function () { headerEl.classList.toggle('scrolled', window.scrollY > 24); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Mobile menu toggle
  var menuBtn = document.getElementById('menuBtn');
  if (menuBtn && headerEl) {
    menuBtn.addEventListener('click', function () {
      var open = headerEl.classList.toggle('mobile-open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.querySelectorAll('.navlinks a').forEach(function (a) {
      a.addEventListener('click', function () { headerEl.classList.remove('mobile-open'); });
    });
  }

  // Scroll reveal
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        // reveal when entering, OR if already scrolled past (hash-jump / scroll restoration)
        if (e.isIntersecting || e.boundingClientRect.top < 0) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Count-up numbers ([data-count]) when they enter view
  var nums = document.querySelectorAll('[data-count]');
  if (nums.length && 'IntersectionObserver' in window) {
    var fmt = function (n) { return n.toLocaleString('en-US'); };
    var run = function (el) {
      var target = +el.getAttribute('data-count');
      if (reduce) { el.textContent = fmt(target); return; }
      var start = null, dur = 1500;
      var tick = function (now) {
        if (start === null) start = now;
        var t = Math.min(1, (now - start) / dur), e = 1 - Math.pow(1 - t, 3);
        el.textContent = fmt(Math.round(target * e));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    var cio = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { run(en.target); cio.unobserve(en.target); } });
    }, { threshold: 0.5 });
    nums.forEach(function (n) { cio.observe(n); });
  }

  // Magnetic CTAs (fine pointer + motion allowed)
  if (!reduce && matchMedia('(hover:hover) and (pointer:fine)').matches) {
    document.querySelectorAll('.btn, .mag').forEach(function (el) {
      el.style.transition = 'transform .25s cubic-bezier(.16,1,.3,1)';
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        el.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) * 0.2) + 'px,' + ((e.clientY - r.top - r.height / 2) * 0.28) + 'px)';
      });
      el.addEventListener('pointerleave', function () { el.style.transform = ''; });
    });
  }
})();
