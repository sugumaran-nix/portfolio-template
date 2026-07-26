/**
 * main.js — Portfolio interactions v2
 * Anime.js v4 UMD (global: anime)
 * Additions: dark mode, cursor glow, mixed easings, form validation, copy email
 */
(function () {
  'use strict';

  const { animate, stagger, createTimeline } = anime;

  /* ─── 1. Dark mode ─── */
  const root            = document.documentElement;
  const themeToggle     = document.getElementById('theme-toggle');
  const themeToggleDrawer = document.getElementById('theme-toggle-drawer');
  const iconMoon        = document.getElementById('icon-moon');
  const iconSun         = document.getElementById('icon-sun');

  const savedTheme = localStorage.getItem('pf-theme') || 'light';
  root.setAttribute('data-theme', savedTheme);
  applyThemeIcons(savedTheme);

  function applyThemeIcons(theme) {
    if (!iconMoon || !iconSun) return;
    if (theme === 'dark') {
      iconMoon.style.display = 'none';
      iconSun.style.display  = '';
    } else {
      iconMoon.style.display = '';
      iconSun.style.display  = 'none';
    }
  }

  function toggleTheme() {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('pf-theme', next);
    applyThemeIcons(next);

    // Animate toggle button
    animate(themeToggle, {
      rotate: [0, 360],
      duration: 500,
      ease: 'outBack(1.8)',
    });
  }

  if (themeToggle)       themeToggle.addEventListener('click', toggleTheme);
  if (themeToggleDrawer) themeToggleDrawer.addEventListener('click', toggleTheme);

  /* ─── 2. Cursor glow ─── */
  const cursorGlow = document.getElementById('cursor-glow');
  let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;

  if (cursorGlow && window.matchMedia('(pointer:fine)').matches) {
    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, { passive: true });

    (function glowLoop() {
      glowX += (mouseX - glowX) * 0.07;
      glowY += (mouseY - glowY) * 0.07;
      cursorGlow.style.left = glowX + 'px';
      cursorGlow.style.top  = glowY + 'px';
      requestAnimationFrame(glowLoop);
    })();
  } else if (cursorGlow) {
    cursorGlow.style.display = 'none';
  }

  /* ─── 3. Nav scroll state ─── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 40);
    updateBackTop();
    highlightNav();
  }, { passive: true });

  /* ─── 4. Mobile drawer ─── */
  const hamburger     = document.getElementById('hamburger');
  const drawer        = document.getElementById('drawer');
  const drawerClose   = document.getElementById('drawer-close');
  const drawerOverlay = document.getElementById('drawer-overlay');

  function openDrawer() {
    drawer.classList.add('open');
    drawerOverlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
    if (hamburger) hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    drawerOverlay.classList.remove('visible');
    document.body.style.overflow = '';
    if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
  }

  if (hamburger)     hamburger.addEventListener('click', openDrawer);
  if (drawerClose)   drawerClose.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);
  document.querySelectorAll('.drawer__links a').forEach(a => a.addEventListener('click', closeDrawer));

  /* ─── 5. Hero entrance timeline ─── */
  const tl = createTimeline({ defaults: { ease: 'outExpo', duration: 900 } });

  tl.add('.hero__badge',      { opacity: [0, 1], translateY: [24, 0] }, 200)
    .add('.hero__name',       { opacity: [0, 1], translateY: [40, 0], ease: 'outBack(1.4)', duration: 1000 }, 360)
    .add('.hero__role',       { opacity: [0, 1], translateY: [20, 0] }, 540)
    .add('.hero__tagline',    { opacity: [0, 1], translateY: [16, 0] }, 660)
    .add('.hero__actions',    { opacity: [0, 1], translateY: [16, 0], ease: 'outBack(1.2)' }, 780)
    .add('.hero__scroll-hint',{ opacity: [0, 1], translateY: [10, 0] }, 940);

  /* ─── 6. Scroll reveals (IntersectionObserver) ─── */
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el    = entry.target;
      const delay = parseInt(el.style.getPropertyValue('--delay') || '0', 10);

      let fromProps = {};
      if (el.classList.contains('reveal-left'))       fromProps = { translateX: [-55, 0] };
      else if (el.classList.contains('reveal-right')) fromProps = { translateX: [55, 0] };
      else                                            fromProps = { translateY: [42, 0] };

      animate(el, {
        opacity:  [0, 1],
        ...fromProps,
        scale:    [0.97, 1],
        duration: 780,
        delay,
        ease:     'outExpo',
      });

      observer.unobserve(el);
    });
  }, { threshold: 0.10 });

  revealEls.forEach(el => observer.observe(el));

  /* ─── 7. Skills — stagger with outBack ─── */
  let skillsAnimated = false;
  const skillSection = document.querySelector('.skills');

  const skillObs = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting || skillsAnimated) return;
    skillsAnimated = true;
    animate('.skill-card', {
      opacity:    [0, 1],
      translateY: [44, 0],
      scale:      [0.94, 1],
      duration:   700,
      delay:      stagger(80),
      ease:       'outBack(1.3)',
    });
  }, { threshold: 0.08 });

  if (skillSection) skillObs.observe(skillSection);

  /* ─── 8. Process steps — outElastic ─── */
  let processAnimated = false;
  const processSection = document.querySelector('.process');

  const processObs = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting || processAnimated) return;
    processAnimated = true;
    animate('.process__step', {
      opacity:    [0, 1],
      translateY: [36, 0],
      scale:      [0.92, 1],
      duration:   900,
      delay:      stagger(120),
      ease:       'outElastic(1, .7)',
    });
    animate('.process__icon', {
      scale:    [0, 1],
      duration: 600,
      delay:    stagger(120, { start: 200 }),
      ease:     'outBack(2)',
    });
  }, { threshold: 0.1 });

  if (processSection) processObs.observe(processSection);

  /* ─── 9. Project cards — scale on hover ─── */
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () =>
      animate(card, { scale: [1, 1.025], duration: 260, ease: 'outQuad' }));
    card.addEventListener('mouseleave', () =>
      animate(card, { scale: [1.025, 1], duration: 260, ease: 'outQuad' }));
  });

  /* ─── 10. Sticker float ─── */
  document.querySelectorAll('.sticker').forEach((s, i) => {
    animate(s, {
      translateY: [-7, 7],
      duration:   2600 + i * 400,
      direction:  'alternate',
      loop:       true,
      ease:       'inOutSine',
    });
  });

  /* ─── 11. Blob drift (Anime.js layer on top of CSS) ─── */
  document.querySelectorAll('.blob').forEach((blob, i) => {
    animate(blob, {
      translateX: [-28, 28],
      translateY: [-18, 18],
      duration:   9000 + i * 2200,
      direction:  'alternate',
      loop:       true,
      ease:       'inOutSine',
      delay:      i * 900,
    });
  });

  /* ─── 12. Testimonial cards — bounce in ─── */
  let testiAnimated = false;
  const testiSection = document.querySelector('.testimonials');

  const testiObs = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting || testiAnimated) return;
    testiAnimated = true;
    animate('.testi-card', {
      opacity:    [0, 1],
      translateY: [40, 0],
      scale:      [0.95, 1],
      duration:   750,
      delay:      stagger(110),
      ease:       'outBack(1.2)',
    });
  }, { threshold: 0.1 });

  if (testiSection) testiObs.observe(testiSection);

  /* ─── 13. Back to top ─── */
  const backTop = document.getElementById('back-top');

  function updateBackTop() {
    if (!backTop) return;
    backTop.classList.toggle('visible', window.scrollY > 500);
  }

  if (backTop) {
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ─── 14. Active nav highlight ─── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav__links a[href^="#"]');

  function highlightNav() {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 130) current = s.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
  }

  /* ─── 15. Marquee pause on hover ─── */
  const track = document.querySelector('.marquee-track');
  if (track) {
    track.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
    track.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
  }

  /* ─── 16. Contact form — validation + animated feedback ─── */
  const form = document.getElementById('contact-form');

  if (form) {
    const fields = {
      name:    { el: form.querySelector('#name'),    err: form.querySelector('#err-name'),  msg: 'Please enter your name.' },
      email:   { el: form.querySelector('#email'),   err: form.querySelector('#err-email'), msg: 'Please enter a valid email.' },
      message: { el: form.querySelector('#message'), err: form.querySelector('#err-msg'),   msg: 'Please write a message.' },
    };

    function validate() {
      let ok = true;

      // Name
      if (!fields.name.el.value.trim()) {
        fields.name.el.classList.add('invalid');
        fields.name.err.textContent = fields.name.msg;
        ok = false;
      } else {
        fields.name.el.classList.remove('invalid');
        fields.name.err.textContent = '';
      }

      // Email
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(fields.email.el.value.trim())) {
        fields.email.el.classList.add('invalid');
        fields.email.err.textContent = fields.email.msg;
        ok = false;
      } else {
        fields.email.el.classList.remove('invalid');
        fields.email.err.textContent = '';
      }

      // Message
      if (!fields.message.el.value.trim()) {
        fields.message.el.classList.add('invalid');
        fields.message.err.textContent = fields.message.msg;
        ok = false;
      } else {
        fields.message.el.classList.remove('invalid');
        fields.message.err.textContent = '';
      }

      return ok;
    }

    // Live clear on input
    Object.values(fields).forEach(({ el, err }) => {
      el.addEventListener('input', () => {
        el.classList.remove('invalid');
        if (err) err.textContent = '';
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validate()) {
        // Shake invalid fields
        document.querySelectorAll('.form__group input.invalid, .form__group textarea.invalid').forEach(el => {
          animate(el, {
            translateX: [-8, 8, -6, 6, -3, 3, 0],
            duration: 500,
            ease: 'outElastic(1, .5)',
          });
        });
        return;
      }

      const btn = form.querySelector('button[type="submit"]');
      const orig = btn.innerHTML;
      btn.innerHTML = '<i class="ti ti-check"></i> Sent! Talk soon 🌸';
      btn.style.background = 'linear-gradient(135deg,#4ade80,#22c55e)';
      btn.disabled = true;

      animate(btn, { scale: [1, 1.07, 1], duration: 500, ease: 'outBack(2)' });

      setTimeout(() => {
        btn.innerHTML = orig;
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
      }, 4000);
    });
  }

  /* ─── 17. Copy email ─── */
  const copyBtn     = document.getElementById('copy-email');
  const copyTooltip = document.getElementById('copy-tooltip');

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const email = 'hello@yourname.com';
      try {
        await navigator.clipboard.writeText(email);
        if (copyTooltip) {
          copyTooltip.textContent = 'Copied!';
          copyTooltip.classList.add('show');
          animate(copyBtn, { scale: [1, 1.2, 1], duration: 350, ease: 'outBack(2)' });
          setTimeout(() => {
            copyTooltip.classList.remove('show');
            copyTooltip.textContent = 'Copy';
          }, 2200);
        }
      } catch {
        if (copyTooltip) {
          copyTooltip.textContent = 'Failed';
          copyTooltip.classList.add('show');
          setTimeout(() => copyTooltip.classList.remove('show'), 2000);
        }
      }
    });
  }

  /* ─── 18. Polaroid hover tilt (mouse tracking) ─── */
  const polaroid = document.querySelector('.polaroid');
  if (polaroid) {
    polaroid.addEventListener('mousemove', (e) => {
      const rect = polaroid.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const rx   = ((e.clientY - cy) / rect.height) * 10;
      const ry   = ((e.clientX - cx) / rect.width)  * -10;
      polaroid.style.transform = `rotate(${ry * 0.3}deg) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
    });
    polaroid.addEventListener('mouseleave', () => {
      polaroid.style.transform = '';
    });
  }

})();
