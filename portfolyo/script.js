'use strict';

// Accessible navigation and theme controls. No libraries or external requests.
const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const themeButton = document.querySelector('.theme-toggle');

menuButton.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Menüyü kapat' : 'Menüyü aç');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Menüyü aç');
  });
});

function applyTheme(dark) {
  document.body.classList.toggle('dark', dark);
  themeButton.setAttribute('aria-label', dark ? 'Açık temaya geç' : 'Koyu temaya geç');
  document.querySelector('meta[name="theme-color"]').setAttribute('content', dark ? '#111116' : '#f5f5f7');
}

let storedTheme = null;
try { storedTheme = localStorage.getItem('portfolio-theme'); } catch (_) {}
applyTheme(storedTheme === 'dark' || (storedTheme === null && window.matchMedia('(prefers-color-scheme: dark)').matches));

themeButton.addEventListener('click', () => {
  const nextDark = !document.body.classList.contains('dark');
  applyTheme(nextDark);
  try { localStorage.setItem('portfolio-theme', nextDark ? 'dark' : 'light'); } catch (_) {}
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('visible'));
}

document.getElementById('year').textContent = String(new Date().getFullYear());
