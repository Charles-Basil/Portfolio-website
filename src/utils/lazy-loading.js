const lazyLoading = () => {
  const lazyImgs = document.querySelectorAll('.lazy');

  lazyImgs.forEach(img => {
    const src = img.dataset.src || img.src;
    if (src) {
      img.src = src;
      img.onload = () => {
        img.classList.remove('loading');
        img.classList.add('loaded');
      };
      img.onerror = () => {
        console.warn(`Failed to load image: ${src}`);
        img.classList.remove('loading');
      };
    }
  });
};
export default lazyLoading;