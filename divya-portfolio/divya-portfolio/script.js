// ============================================================
// Dr. Divya Mishra — Portfolio JS
// Dark mode toggle · Nav scroll · Reveal animations
// ============================================================

// ── Dark Mode ────────────────────────────────────────────────
const toggle = document.getElementById('darkToggle');
const root   = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
  root.setAttribute('data-theme', 'dark');
  toggle.querySelector('.toggle-icon').textContent = '○';
}

toggle.addEventListener('click', () => {
  const isDark = root.getAttribute('data-theme') === 'dark';
  root.setAttribute('data-theme', isDark ? 'light' : 'dark');
  toggle.querySelector('.toggle-icon').textContent = isDark ? '◐' : '○';
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
});

// ── Nav Scroll Effect ─────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// ── Mobile Menu ───────────────────────────────────────────────
const burger     = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

function closeMobile() {
  mobileMenu.classList.remove('open');
}

// close mobile menu on outside click
document.addEventListener('click', (e) => {
  if (!nav.contains(e.target) && !mobileMenu.contains(e.target)) {
    mobileMenu.classList.remove('open');
  }
});

// ── Scroll Reveal ─────────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => observer.observe(el));

// ── Active Nav Link Highlight ─────────────────────────────────
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -40% 0px' });

sections.forEach(s => sectionObserver.observe(s));

// ── Skill Cards Stagger ───────────────────────────────────────
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.06}s`;
  card.classList.add('reveal');
  observer.observe(card);
});

// ── Project Cards Stagger ─────────────────────────────────────
const projCards = document.querySelectorAll('.proj-card');
projCards.forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.08}s`;
  card.classList.add('reveal');
  observer.observe(card);
});
