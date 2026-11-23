(() => {
  const themeButton = document.querySelector('.theme-button');
  const themeIcon = document.querySelector('.theme-icon');
  const menuButton = document.querySelector('.menu-button');
  const navLinks = document.querySelector('.nav-links');
  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();

  function setTheme(dark) {
    document.body.classList.toggle('dark', dark);
    themeIcon.textContent = dark ? '☀' : '☾';
    themeButton.setAttribute('aria-label', dark ? 'Açık temaya geç' : 'Koyu temaya geç');
    try { localStorage.setItem('golge-kimin-theme', dark ? 'dark' : 'light'); } catch (_) {}
  }
  let storedTheme = null;
  try { storedTheme = localStorage.getItem('golge-kimin-theme'); } catch (_) {}
  setTheme(storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches));
  themeButton.addEventListener('click', () => setTheme(!document.body.classList.contains('dark')));

  function closeMenu() {
    navLinks.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Menüyü aç');
  }
  menuButton.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
  });
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px 30px 0px' });
    items.forEach(item => observer.observe(item));
  } else {
    items.forEach(item => item.classList.add('visible'));
  }

  // Yayına almadan önce index.html içindeki örnek e-posta bağlantısını güncelleyin.
})();
