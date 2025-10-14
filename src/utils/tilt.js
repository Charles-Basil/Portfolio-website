// Subtle 3D tilt on hover for elements with .work__img-wrapper
const initTilt = () => {
  const wrappers = document.querySelectorAll('.work__img-wrapper');
  const strength = 12; // degrees of tilt

  function onMove(e) {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0..1
    const y = (e.clientY - rect.top) / rect.height; // 0..1

    const rotateY = (x - 0.5) * strength;
    const rotateX = (0.5 - y) * strength;

    el.style.transform = `translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    el.style.transition = 'transform 0.12s ease';
  }

  function onEnter(e) {
    const el = e.currentTarget;
    el.style.willChange = 'transform';
    el.style.transition = 'transform 0.12s ease';
  }

  function onLeave(e) {
    const el = e.currentTarget;
    el.style.transform = '';
    el.style.transition = 'transform 0.45s cubic-bezier(0.2,0.8,0.2,1)';
    el.style.willChange = '';
  }

  wrappers.forEach(w => {
    w.addEventListener('mousemove', onMove);
    w.addEventListener('mouseenter', onEnter);
    w.addEventListener('mouseleave', onLeave);
  });
};

export default initTilt;
