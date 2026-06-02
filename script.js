// ── Navbar scroll state ──────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ── Hamburger / mobile menu ──────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// ── Typed text effect ────────────────────────────────────────
const phrases = [
  'Senior Backend Engineer',
  'Distributed Systems Architect',
  'Golang & gRPC Specialist',
  'Cloud-Native Developer',
  'API Platform Builder',
];

let phraseIdx = 0;
let charIdx = 0;
let deleting = false;
const typedEl = document.getElementById('typedText');

function type() {
  const current = phrases[phraseIdx];

  if (deleting) {
    charIdx--;
    typedEl.textContent = current.slice(0, charIdx);
  } else {
    charIdx++;
    typedEl.textContent = current.slice(0, charIdx);
  }

  let delay = deleting ? 40 : 70;

  if (!deleting && charIdx === current.length) {
    delay = 2200;
    deleting = true;
  } else if (deleting && charIdx === 0) {
    deleting = false;
    phraseIdx = (phraseIdx + 1) % phrases.length;
    delay = 300;
  }

  setTimeout(type, delay);
}

// start after initial fade-in
setTimeout(type, 1200);

// ── Scroll reveal ────────────────────────────────────────────
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Active nav link on scroll ────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(section => sectionObserver.observe(section));

// Active nav link style (add to CSS via JS)
const style = document.createElement('style');
style.textContent = `.nav-links a.active { color: var(--accent) !important; }`;
document.head.appendChild(style);

// ── Contact form ─────────────────────────────────────────────
const form = document.getElementById('contactForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  const name = form.querySelector('#name').value;
  btn.innerHTML = '<span>Message sent!</span>';
  btn.style.background = '#00bfa0';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = '<span>Send Message</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
    btn.style.background = '';
    btn.disabled = false;
    form.reset();
  }, 3000);
});

// ── Theme toggle ─────────────────────────────────────────────
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') document.documentElement.setAttribute('data-theme', 'light');

themeToggle.addEventListener('click', () => {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  const next = isLight ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// ── Stagger delay for grid children ─────────────────────────
document.querySelectorAll('.skills-grid .skill-category').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.07}s`;
});

document.querySelectorAll('.projects-grid .project-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.07}s`;
});
