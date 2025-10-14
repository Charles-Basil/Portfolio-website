const lazyLoading = () => {
  const run = () => {
    const lazyImgs = document.querySelectorAll('.lazy');

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const dataSrc = img.dataset.src;
            const srcToLoad = dataSrc || img.src;

            // If there's a data-src, set it. Otherwise, keep existing src.
            // Attach load/error handlers BEFORE setting src so they fire correctly
            img.onload = () => {
              img.classList.remove('loading');
              img.classList.add('loaded');
            };
            img.onerror = () => {
              console.warn(`Failed to load image: ${srcToLoad}`);
              img.classList.remove('loading');
              // Optional fallback to a local placeholder if available
              if (!img.dataset._fallbackApplied) {
                img.dataset._fallbackApplied = '1';
                img.src = '/img/pg8.png'; // small local fallback present in public/img
              }
            };

            if (dataSrc) {
              img.src = dataSrc;
            }

            // If the image is already cached/loaded, clear loading state immediately
            if (img.complete && img.naturalWidth) {
              img.classList.remove('loading');
              img.classList.add('loaded');
              observer.unobserve(img);
              return;
            }

            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '200px 0px',
        threshold: 0.01
      });

      lazyImgs.forEach(img => {
        // Attach handlers early for images that might load immediately
        img.onload = () => {
          img.classList.remove('loading');
          img.classList.add('loaded');
        };
        img.onerror = () => {
          const srcToLoad = img.dataset.src || img.src;
          console.warn(`Failed to load image: ${srcToLoad}`);
          img.classList.remove('loading');
          if (!img.dataset._fallbackApplied) {
            img.dataset._fallbackApplied = '1';
            img.src = '/img/pg8.png';
          }
        };

        // If image already loaded (cached), clear loading immediately
        if (img.complete && img.naturalWidth) {
          img.classList.remove('loading');
          img.classList.add('loaded');
          return;
        }

        // Only observe images that still have the loading class
        if (!img.classList.contains('loading')) return;
        io.observe(img);
      });
    } else {
      // Fallback: load all images immediately
      lazyImgs.forEach(img => {
        const src = img.dataset.src || img.src;
        if (src) {
          // Attach handlers before setting src
          img.onload = () => {
            img.classList.remove('loading');
            img.classList.add('loaded');
          };
          img.onerror = () => {
            console.warn(`Failed to load image: ${src}`);
            img.classList.remove('loading');
            if (!img.dataset._fallbackApplied) {
              img.dataset._fallbackApplied = '1';
              img.src = '/img/pg8.png';
            }
          };

          img.src = src;
        }
      });
    }
  };

  // Ensure DOM is ready before querying
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, { once: true });
  } else {
    run();
  }
};

export default lazyLoading;