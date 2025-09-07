// ===== Helper: persist & apply theme =====
(function() {
  const root = document.documentElement;
  const key = 'theme';
  const stored = localStorage.getItem(key);

  function systemPref() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function apply(theme) {
    if (theme === 'system') {
      root.setAttribute('data-theme', systemPref());
    } else {
      root.setAttribute('data-theme', theme);
    }
  }

  // initialize
  const initial = stored || 'system';
  root.dataset.theme = initial === 'system' ? systemPref() : initial;

  // React to system changes if user chose system
  if (!stored || stored === 'system') {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', () => apply('system'));
  }

  // Toggle button
  const toggle = document.getElementById('themeToggle');
  function current() { return localStorage.getItem(key) || 'system'; }
  function cycle() {
    const next = current() === 'light' ? 'dark' : current() === 'dark' ? 'system' : 'light';
    localStorage.setItem(key, next);
    apply(next);
    toggle.textContent = next === 'dark' ? '🌙' : next === 'light' ? '☀️' : '🌗';
    toggle.setAttribute('aria-pressed', String(next !== 'system'));
    toggle.title = `Theme: ${next}`;
  }
  toggle.addEventListener('click', cycle);
  // set initial icon
  const init = current();
  toggle.textContent = init === 'dark' ? '🌙' : init === 'light' ? '☀️' : '🌗';
  toggle.title = `Theme: ${init}`;
})();

// ===== Mobile menu =====
(function(){
  const btn = document.getElementById('menuToggle');
  const menu = document.getElementById('mobileMenu');
  btn.addEventListener('click', () => {
    const open = menu.getAttribute('data-open') === 'true';
    menu.setAttribute('data-open', String(!open));
    btn.setAttribute('aria-expanded', String(!open));
  });
  // Close on navigation
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    menu.setAttribute('data-open', 'false');
    btn.setAttribute('aria-expanded', 'false');
  }));
})();

// ===== Data-driven Projects & Skills =====
const projects = [
  {
    title: 'VR Fly-Tying Simulator',
    blurb: 'VR experience with real-time interaction, haptics, and a guided tutorial system. This is still in progress!',
    tags: ['Unity', 'XR', 'C#'],
    demo: '#',
    titleName: 'Dev Page'
  },
  {
    title: 'Accounting App',
    blurb: 'An app that teaches the user accounting. Still in development!',
    tags: ['Swift', 'UIKit'],
    demo: 'SoloGolfGame.html',
    titleName: 'Dev Page'
  },
  {
    title: 'Accessible Checkout App',
    blurb: "An app made in a group of 3. Used Swift and VisionKit to create a checkout-process for BSU GIMM checkout, specifically accessible for someone with Autism.",
    tags: ['Swift', 'UIKit'],
    demo: 'CheckoutAppProject.html',
    titleName: 'Project Page'
  },
  {
    title: 'Landing Page Website',
    blurb: 'This site! Accessible, responsive, and framework-free with a bit of JS.',
    tags: ['HTML', 'CSS', 'JS'],
    demo: 'landingpage.html',
    titleName: 'Page'
  }
];

const skills = ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Node.js', 'Swift/SwiftUI', 'Unity/C#', 'VR/XR', 'Blender', 'Substance', 'Git', 'Figma', 'Microsoft Products', 'Communication', 'AI'];

(function renderProjects(){
  const grid = document.getElementById('projectsGrid');
  grid.innerHTML = '';
  projects.forEach(p => {
    const card = document.createElement('article');
    card.className = 'card project';
    card.innerHTML = `
      <div class="thumb">Preview image</div>
      <div class="body">
        <h3>${p.title}</h3>
        <p>${p.blurb}</p>
        <div class="tags">${p.tags.map(t => `<span class="badge">${t}</span>`).join('')}</div>
        <div class="actions">
          <a class="btn" href="${p.demo}" target="_blank" rel="noreferrer noopener">${titleName}</a>
        </div>
      </div>`;
    grid.appendChild(card);
  });
})();

(function renderSkills(){
  const list = document.getElementById('skillsList');
  list.innerHTML = skills.map(s => `<span class="skill">${s}</span>`).join('');
})();

// ===== Copy email =====
(function(){
  const btn = document.getElementById('copyEmail');
  const link = document.getElementById('emailLink');
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(link.textContent.trim());
      btn.textContent = 'Copied!';
      setTimeout(() => btn.textContent = 'Copy', 1500);
    } catch(e) {
      btn.textContent = 'Error';
    }
  })
})();

// ===== Reveal on scroll =====
(function(){
  const els = document.querySelectorAll('[data-reveal]');
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        io.unobserve(entry.target);
      }
    }
  }, { threshold: .15 });
  els.forEach(el => io.observe(el));
})();

// Footer year (works on all pages)
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Simple lightbox for any grid with data-lightbox
(function () {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;
  const img = lightbox.querySelector('.lightbox-img');
  const closeBtn = lightbox.querySelector('.lightbox-close');

  function open(src, alt='') {
    img.src = src;
    img.alt = alt;
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function close() {
    lightbox.hidden = true;
    img.src = '';
    document.body.style.overflow = '';
  }
  closeBtn?.addEventListener('click', close);
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.hidden && e.key === 'Escape') close();
  });

  document.querySelectorAll('[data-lightbox] .lightbox-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const src = btn.getAttribute('data-src');
      const imgEl = btn.querySelector('img');
      open(src, imgEl?.alt || '');
    });
  });
})();