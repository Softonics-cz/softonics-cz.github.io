'use strict';

document.documentElement.classList.add('js');

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-nav');

function closeMenu({ returnFocus = false } = {}) {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
  navigation.classList.remove('is-open');
  document.body.classList.remove('menu-open');
  if (returnFocus) menuButton.focus();
}

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const opening = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(opening));
    menuButton.setAttribute('aria-label', opening ? 'Close navigation' : 'Open navigation');
    navigation.classList.toggle('is-open', opening);
    document.body.classList.toggle('menu-open', opening);
  });

  navigation.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!link) return;
    closeMenu();
    const href = link.getAttribute('href');
    if (href?.startsWith('#')) {
      const target = document.querySelector(href);
      if (target) {
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
        target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
      }
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      closeMenu({ returnFocus: true });
    }
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.site-header')) closeMenu();
  });

  const desktop = window.matchMedia('(min-width: 601px)');
  desktop.addEventListener('change', (event) => {
    if (event.matches) closeMenu();
  });
}

const copyrightYear = document.querySelector('#copyright-year');
if (copyrightYear) copyrightYear.textContent = String(new Date().getFullYear());
