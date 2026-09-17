// Foodelic — interactions: scroll reveal, nav state, mobile menu, hero parallax

document.addEventListener('DOMContentLoaded', () => {

  /* ---- reveal on scroll ---- */
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = (Array.from(el.parentElement?.querySelectorAll('.reveal') || [])
          .indexOf(el)) * 60;
        setTimeout(() => el.classList.add('is-visible'), Math.min(delay, 240));
        io.unobserve(el);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => io.observe(el));

  /* ---- nav scroll state ---- */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- mobile menu ---- */
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  burger.addEventListener('click', () => {
    burger.classList.toggle('is-open');
    mobileMenu.classList.toggle('is-open');
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      burger.classList.remove('is-open');
      mobileMenu.classList.remove('is-open');
    });
  });

  /* ---- scroll cue click ---- */
  const scrollCue = document.getElementById('scrollCue');
  scrollCue?.addEventListener('click', () => {
    document.getElementById('food')?.scrollIntoView({ behavior: 'smooth' });
  });

  /* ---- subtle hero image parallax on mouse move ---- */
  const heroFrame = document.getElementById('heroFrame');
  const heroImg = document.getElementById('heroImg');
  if (heroFrame && heroImg && window.matchMedia('(hover: hover)').matches) {
    heroFrame.addEventListener('mousemove', (e) => {
      const rect = heroFrame.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      heroImg.style.transform = `scale(1.1) translate(${x * -18}px, ${y * -14}px)`;
    });
    heroFrame.addEventListener('mouseleave', () => {
      heroImg.style.transform = 'scale(1.06) translate(0,0)';
    });
  }

  /* ---- "buy this website" sale modal ---- */
  const saleModal = document.getElementById('saleModal');
  const saleModalBackdrop = document.getElementById('saleModalBackdrop');
  const saleModalClose = document.getElementById('saleModalClose');

  const openSaleModal = () => {
    saleModal.classList.add('is-open');
    saleModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };
  const closeSaleModal = () => {
    saleModal.classList.remove('is-open');
    saleModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.btn:not(.sale-modal__cta), .text-link').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      openSaleModal();
    });
  });

  saleModalBackdrop.addEventListener('click', closeSaleModal);
  saleModalClose.addEventListener('click', closeSaleModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && saleModal.classList.contains('is-open')) closeSaleModal();
  });

  /* ---- gentle parallax on hero image via scroll ---- */
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        if (heroImg && scrolled < window.innerHeight) {
          heroImg.style.filter = `brightness(${1 - scrolled * 0.0003})`;
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

});
