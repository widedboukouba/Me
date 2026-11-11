/* ==========================================================================
   WIDED BOUKOUBA - INTERACTIVE PORTFOLIO ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  /* --- 1. Dynamic Hero Typing Effect --- */
  const typingElement = document.querySelector('.typing-text');
  if (typingElement) {
    const words = [
      'Full Stack Developer',
      'React & Next.js Engineer',
      'TypeScript & Node.js Specialist',
      'AI & Mobile App Engineer'
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
      const currentWord = words[wordIndex];
      
      if (isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typingSpeed = 1800; // Pause at end of word
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 400; // Pause before typing next word
      }

      setTimeout(type, typingSpeed);
    }

    setTimeout(type, 800);
  }

  /* --- 2. Mobile Drawer Navigation Toggle --- */
  const mobileToggleBtn = document.getElementById('mobileToggle');
  const mobileNavDrawer = document.getElementById('mobileNav');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggleBtn && mobileNavDrawer) {
    mobileToggleBtn.addEventListener('click', () => {
      mobileNavDrawer.classList.toggle('open');
      const icon = mobileToggleBtn.querySelector('i');
      if (mobileNavDrawer.classList.contains('open')) {
        icon.className = 'fas fa-times';
      } else {
        icon.className = 'fas fa-bars';
      }
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNavDrawer.classList.remove('open');
        const icon = mobileToggleBtn.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      });
    });
  }

  /* --- 3. Scroll Active Section Spy --- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function scrollSpy() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', scrollSpy);

  /* --- 4. Experience vs Education Timeline Tabs --- */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const timelineViews = document.querySelectorAll('.timeline-view');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      timelineViews.forEach(v => v.classList.remove('active'));

      btn.classList.add('active');
      const targetTab = btn.getAttribute('data-tab');
      const activeView = document.getElementById(`${targetTab}-timeline`);
      if (activeView) {
        activeView.classList.add('active');
      }
    });
  });

  /* --- 5. Skills Grid Filter System --- */
  const skillFilterBtns = document.querySelectorAll('.skills-filter-container .filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  skillFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      skillFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* --- 6. Portfolio Filter System --- */
  const portfolioFilterBtns = document.querySelectorAll('.portfolio-filter-container .filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  portfolioFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      portfolioFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      portfolioCards.forEach(card => {
        const categories = card.getAttribute('data-category') ? card.getAttribute('data-category').split(' ') : [];
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* --- 7. Project Quick View Modal --- */
  const modalOverlay = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalClose');
  const modalTitle = document.getElementById('modalTitle');
  const modalImg = document.getElementById('modalImg');
  const modalDesc = document.getElementById('modalDesc');
  const modalTags = document.getElementById('modalTags');
  const modalLink = document.getElementById('modalLink');

  document.querySelectorAll('.view-project-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.portfolio-card');
      if (!card) return;

      const title = card.querySelector('.portfolio-card-title')?.textContent || '';
      const imgSrc = card.querySelector('.portfolio-img-wrapper img')?.getAttribute('src') || '';
      const desc = card.querySelector('.portfolio-card-desc')?.textContent || '';
      const tags = card.querySelectorAll('.tag-pill');
      const href = card.querySelector('.portfolio-link')?.getAttribute('href') || '#';

      if (modalTitle) modalTitle.textContent = title;
      if (modalImg) modalImg.src = imgSrc;
      if (modalDesc) modalDesc.textContent = desc;
      
      if (modalTags) {
        modalTags.innerHTML = '';
        tags.forEach(tag => {
          const span = document.createElement('span');
          span.className = 'tag-pill';
          span.textContent = tag.textContent;
          modalTags.appendChild(span);
        });
      }

      if (modalLink) {
        modalLink.href = href;
        if (href === '#') {
          modalLink.style.display = 'none';
        } else {
          modalLink.style.display = 'inline-flex';
        }
      }

      if (modalOverlay) modalOverlay.classList.add('open');
    });
  });

  if (modalCloseBtn && modalOverlay) {
    modalCloseBtn.addEventListener('click', () => modalOverlay.classList.remove('open'));
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) modalOverlay.classList.remove('open');
    });
  }

  /* --- 8. Copy to Clipboard Functionality with Toast --- */
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');

  function showToast(message) {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied "${textToCopy}" to clipboard!`);
        }).catch(err => {
          console.error('Failed to copy text: ', err);
        });
      }
    });
  });

  /* --- 9. Contact Form Feedback --- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast("Thank you! Your message has been sent successfully.");
      contactForm.reset();
    });
  }

  /* --- 10. Back to Top Floating Button --- */
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 500) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* --- 11. Dynamic Year Updater --- */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});
