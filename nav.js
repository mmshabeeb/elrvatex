/**
 * ElevateX Now - Unified Navigation Interaction Handler
 */
document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('siteHeader') || document.querySelector('header.site-header');
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const dropdownTriggers = document.querySelectorAll('.nav-dropdown-trigger');

  // 1. Scroll shadow & blur intensity
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // 2. Mobile Drawer Toggle
  if (mobileBtn && mobileDrawer) {
    mobileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close mobile drawer when clicking any link inside it
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        if (mobileBtn) mobileBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileDrawer.contains(e.target) && !mobileBtn.contains(e.target)) {
        mobileDrawer.classList.remove('open');
        if (mobileBtn) mobileBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        mobileDrawer.classList.remove('open');
        if (mobileBtn) mobileBtn.setAttribute('aria-expanded', 'false');
        document.querySelectorAll('.nav-has-dropdown').forEach(item => item.classList.remove('open'));
      }
    });
  }

  // 3. Dropdown click toggle for touch devices
  dropdownTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const parent = trigger.closest('.nav-has-dropdown');
      if (parent) {
        const isOpen = parent.classList.toggle('open');
        trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      }
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', () => {
    document.querySelectorAll('.nav-has-dropdown').forEach(item => {
      item.classList.remove('open');
      const trig = item.querySelector('.nav-dropdown-trigger');
      if (trig) trig.setAttribute('aria-expanded', 'false');
    });
  });
});
