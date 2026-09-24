/* =========================================================
   app.js — core interactivity
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Preloader ---------- */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => preloader.classList.add('hidden'), 400);
  });

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Navbar scroll state ---------- */
  const nav = document.getElementById('mainNav');
  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');

    const backToTop = document.getElementById('backToTop');
    if (window.scrollY > 500) backToTop.classList.add('show');
    else backToTop.classList.remove('show');
  };
  window.addEventListener('scroll', onScroll);
  onScroll();

  /* ---------- Mobile menu ---------- */
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburgerBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.style.display === 'block';
    mobileMenu.style.display = isOpen ? 'none' : 'block';
    hamburgerBtn.setAttribute('aria-expanded', String(!isOpen));
  });
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => { mobileMenu.style.display = 'none'; });
  });

  /* ---------- Back to top ---------- */
  document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Typed.js rotating roles ---------- */
  if (window.Typed) {
    new Typed('#typed', {
      strings: [
        'WordPress Developer',
        'WooCommerce Expert',
        'Technical SEO Specialist',
        'PHP Developer',
        'Elementor Expert',
        'Theme Developer',
        'Plugin Developer'
      ],
      typeSpeed: 55,
      backSpeed: 30,
      backDelay: 1400,
      loop: true,
      showCursor: false
    });
  }

  /* ---------- Contact form (client-side only, no backend) ---------- */
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('cf-name').value.trim();
    const email = document.getElementById('cf-email').value.trim();
    const subject = document.getElementById('cf-subject').value.trim();
    const message = document.getElementById('cf-message').value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !subject || !message) {
      status.textContent = 'Please fill in every field before sending.';
      status.className = 'form-status err';
      return;
    }
    if (!emailPattern.test(email)) {
      status.textContent = 'That email address doesn\'t look right.';
      status.className = 'form-status err';
      return;
    }

    // No backend is wired up — this opens the user's email client with the
    // message pre-filled. Swap this for a real form service (Formspree,
    // EmailJS, etc.) when you're ready to receive submissions directly.
    const mailto = `mailto:shami.lkct@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
    window.location.href = mailto;

    status.textContent = 'Opening your email client to send this message...';
    status.className = 'form-status ok';
    form.reset();
  });

});
