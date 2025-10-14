export function initAnimations() {
  // Advanced Framer Motion-style animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  // Optimized staggered animation system
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('animate-in')) {
        // Immediate animation trigger for better performance
        entry.target.classList.add('animate-in');
        // Add bounce effect for certain elements
        if (entry.target.classList.contains('hero__title') ||
            entry.target.classList.contains('about__title') ||
            entry.target.classList.contains('work__title')) {
          entry.target.style.animation = 'bounceIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        }
      }
    });
  }, observerOptions);

  // Observe all sections with staggered timing
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });

  // Observe hero elements for special animations (removed transition delays for performance)
  document.querySelectorAll('.hero__img, .hero__subtitle, .hero__title, .hero__description, .hero__btn').forEach(el => {
    observer.observe(el);
  });

  // Observe work items (removed parallax from work images for performance)
  document.querySelectorAll('.work__project').forEach(el => {
    observer.observe(el);
  });

  // Observe featured items
  document.querySelectorAll('.featured__img-wrapper, .featured__description, .featured__info-container').forEach(el => {
    observer.observe(el);
  });

  // Enhanced smooth scroll behavior for anchor links with advanced animations
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        // Add a subtle click animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
          this.style.transform = 'scale(1)';
        }, 150);

        // Smooth scroll with enhanced easing
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });

        // Add a highlight effect to the target section
        setTimeout(() => {
          target.style.boxShadow = 'inset 0 0 0 2px var(--clr-rose)';
          setTimeout(() => {
            target.style.boxShadow = '';
          }, 1000);
        }, 800);
      }
    });
  });

  // Advanced hover animations
  document.querySelectorAll('.btn, a').forEach(el => {
    el.addEventListener('mouseenter', () => {
      el.style.transform = 'scale(1.05) translateY(-2px)';
      el.style.boxShadow = '0 10px 25px rgba(225, 29, 72, 0.3)';
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'scale(1)';
      el.style.boxShadow = '';
    });
  });

  // Optimized parallax effect for images (reduced for performance)
  let ticking = false;
  const parallaxElements = document.querySelectorAll('.about__img');

  function updateParallax() {
    parallaxElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.3;

      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.style.transform = `translateY(${rate * 0.05}px)`;
      }
    });
    ticking = false;
  }

  // Throttle parallax updates
  let parallaxTimeout;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      clearTimeout(parallaxTimeout);
      parallaxTimeout = setTimeout(() => {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }, 16); // ~60fps
    }
  });

  // Page load animation
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });
}

// Add CSS for advanced animations
const style = document.createElement('style');
style.textContent = `
  /* Page load animation */
  body {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }

  body.loaded {
    opacity: 1;
    transform: translateY(0);
  }

  /* Section animations */
  section {
    opacity: 0;
    transform: translateY(50px) scale(0.95);
    transition: opacity 1s cubic-bezier(0.4, 0, 0.2, 1), transform 1s cubic-bezier(0.4, 0, 0.2, 1);
  }

  section.animate-in {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  /* Hero specific animations - optimized for performance */
  .hero__img {
    opacity: 0;
    transform: scale(0.8) rotate(-5deg);
    transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .hero__img.animate-in {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }

  .hero__subtitle {
    opacity: 0;
    transform: translateX(-30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  .hero__subtitle.animate-in {
    opacity: 1;
    transform: translateX(0);
  }

  .hero__title {
    opacity: 0;
    transform: translateY(30px) scale(0.9);
    transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .hero__title.animate-in {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  .hero__description {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  .hero__description.animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  .hero__btn {
    opacity: 0;
    transform: translateY(30px) scale(0.9);
    transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .hero__btn.animate-in {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  /* Work section animations */
  .work__project {
    opacity: 0;
    transform: translateX(-50px) scale(0.95);
    transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .work__project.animate-in {
    opacity: 1;
    transform: translateX(0) scale(1);
  }

  .work__img-wrapper {
    opacity: 0;
    transform: translateX(50px) scale(0.95);
    transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .work__img-wrapper.animate-in {
    opacity: 1;
    transform: translateX(0) scale(1);
  }

  /* Featured section animations */
  .featured__img-wrapper {
    opacity: 0;
    transform: scale(0.8) rotate(5deg);
    transition: opacity 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55), transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .featured__img-wrapper.animate-in {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }

  .featured__description, .featured__info-container {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }

  .featured__description.animate-in, .featured__info-container.animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  /* Button animations */
  .btn, a {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    transform: scale(1);
    position: relative;
    overflow: hidden;
  }

  .btn:hover, a:hover {
    transform: scale(1.05) translateY(-3px);
    box-shadow: 0 12px 30px rgba(225, 29, 72, 0.4);
  }

  .btn:active {
    transform: scale(0.98) translateY(-1px);
    transition: all 0.1s ease;
  }

  /* Form animations */
  .contact__form {
    transition: all 0.3s ease;
  }

  .form-group input, .form-group textarea {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .form-group input:focus, .form-group textarea:focus {
    transform: translateY(-3px) scale(1.01);
    box-shadow: 0 8px 25px rgba(225, 29, 72, 0.2);
  }

  .form-status {
    opacity: 0;
    transform: translateY(20px) scale(0.9);
    transition: opacity 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55), transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .form-status.show {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  .contact__btn {
    position: relative;
    overflow: hidden;
  }

  .contact__btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .contact__btn:hover::before {
    left: 100%;
  }

  .contact__btn.loading {
    pointer-events: none;
    position: relative;
  }

  .contact__btn.loading::after {
    content: '';
    position: absolute;
    width: 24px;
    height: 24px;
    top: 50%;
    left: 50%;
    margin: -12px 0 0 -12px;
    border: 2px solid transparent;
    border-top-color: #ffffff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  /* Bounce animation for titles */
  @keyframes bounceIn {
    0% {
      opacity: 0;
      transform: scale(0.3);
    }
    50% {
      opacity: 1;
      transform: scale(1.05);
    }
    70% {
      transform: scale(0.9);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.08);
    }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* Parallax effect */
  .about__img, .work__img-wrapper img {
    transition: transform 0.1s ease-out;
  }

  /* Micro-interactions */
  .header__link:hover {
    transform: translateY(-2px);
    transition: all 0.3s ease;
  }

  .work__project-btn:hover {
    animation: pulse 1s infinite;
  }
`;
document.head.appendChild(style);