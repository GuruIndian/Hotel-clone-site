document.addEventListener('DOMContentLoaded', () => {
  // Function to add scroll animations using IntersectionObserver
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 }); // 20% visibility before triggering

  // Select elements to observe
  const elementsToAnimate = document.querySelectorAll('.feature, .gallery img');
  elementsToAnimate.forEach((el) => {
    el.classList.add('hidden');
    observer.observe(el);
  });

  // Fallback for browsers that do not support IntersectionObserver
  if (!('IntersectionObserver' in window)) {
    elementsToAnimate.forEach((el) => el.classList.add('visible'));
  }

  // Back-to-top Button
  const backToTopBtn = document.createElement('div');
  backToTopBtn.textContent = '⬆';
  backToTopBtn.className = 'back-to-top';
  document.body.appendChild(backToTopBtn);

  let ticking = false;

  const handleScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        backToTopBtn.style.display = window.scrollY > 200 ? 'block' : 'none';
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', handleScroll);

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
