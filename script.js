// =========================================================
// CERTO — script.js
// =========================================================

// -----------------------------------------------------------
// 1. MARQUEE — duplicate the track content once so the
//    CSS animation (translateX -50%) loops seamlessly.
// -----------------------------------------------------------
function setupMarquee() {
  const track = document.querySelector('.marquee-track');
  if (!track) return;

  // Clone every existing card and append it once.
  const originalCards = Array.from(track.children);
  originalCards.forEach((card) => {
    const clone = card.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true'); // duplicates are decorative
    track.appendChild(clone);
  });
}

// -----------------------------------------------------------
// 2. SCROLL-REVEAL — fade/slide in elements with class="reveal"
//    as they enter the viewport.
// -----------------------------------------------------------
function setupScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px',
    },
  );

  revealEls.forEach((el) => observer.observe(el));
}

// -----------------------------------------------------------
// 3. MOBILE NAV TOGGLE
// -----------------------------------------------------------
function setupNavToggle() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close the menu when a nav link is tapped (mobile UX nicety)
  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// -----------------------------------------------------------
// Init
// -----------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  setupMarquee();
  setupScrollReveal();
  setupNavToggle();
});
