(function () {
  const TABLET_BREAKPOINT = 900;
  const MOBILE_BREAKPOINT = 768;
  let glide;
  let timeoutId = null;

  function debounce(func, delay) {
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        func(...args);
        timeoutId = null;
      }, delay);
    };
  }

  function initSlider() {
    if (window.innerWidth <= TABLET_BREAKPOINT) {
      if (!glide) {
        glide = new Glide('.glide', {
          type: 'slider',
          perView: 2.8,
          gap: 32,
          rewind: false,
          breakpoints: {
              [MOBILE_BREAKPOINT]: {
              perView: 1.8,
              gap: 20,
            },
          }
        }).mount();
      }
    } else if (glide) {
      glide.destroy();
      glide = null;
    }
  }

  const debouncedInitSlider = debounce(initSlider, 500);

  window.addEventListener('resize', debouncedInitSlider);
  debouncedInitSlider();
})();
