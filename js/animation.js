/* =========================================================
   animation.js — AOS / GSAP / counters / tilt / parallax
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- AOS ---------- */
  if (window.AOS) {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60
    });
  }

  /* ---------- GSAP + ScrollTrigger ---------- */
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    // Hero entrance sequence
    gsap.from('.hero-kicker', { opacity: 0, y: 16, duration: 0.6, delay: 0.3 });
    gsap.from('.hero h1', { opacity: 0, y: 24, duration: 0.7, delay: 0.4 });
    gsap.from('.hero-desc', { opacity: 0, y: 20, duration: 0.7, delay: 0.55 });
    gsap.from('.hero-actions', { opacity: 0, y: 20, duration: 0.7, delay: 0.7 });

    // Section eyebrows: subtle slide-glow on scroll
    gsap.utils.toArray('.eyebrow').forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        x: -14,
        duration: 0.5,
        scrollTrigger: { trigger: el, start: 'top 88%' }
      });
    });

    // Parallax glows in hero
    gsap.to('.hero-glow', {
      y: 80,
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
    });
    gsap.to('.hero-glow-2', {
      y: -60,
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
    });

    // Commit nodes pop in one by one (git log timeline)
    gsap.utils.toArray('.commit').forEach((el, i) => {
      gsap.from(el, {
        opacity: 0,
        x: -20,
        duration: 0.5,
        delay: i * 0.05,
        scrollTrigger: { trigger: el, start: 'top 90%' }
      });
    });
  }

  /* ---------- Editor window tilt-on-mouse-move ---------- */
  const tiltCard = document.getElementById('tiltCard');
  if (tiltCard && window.matchMedia('(min-width: 992px)').matches) {
    tiltCard.addEventListener('mousemove', (e) => {
      const rect = tiltCard.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      tiltCard.style.transform = `perspective(1000px) rotateY(${x * 10 - 6}deg) rotateX(${-y * 8 + 2}deg)`;
    });
    tiltCard.addEventListener('mouseleave', () => {
      tiltCard.style.transform = 'perspective(1000px) rotateY(-6deg) rotateX(2deg)';
    });
  }

  /* ---------- Project card subtle tilt ---------- */
  document.querySelectorAll('.project-card, .skill-card, .service-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      if (!window.matchMedia('(min-width: 992px)').matches) return;
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-6px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

});
