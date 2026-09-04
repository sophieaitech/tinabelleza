/**
 * LYOS Profesional · Ultra-Performance Lazy Video Engine
 * Optimizes network bandwidth, mobile battery, and GPU decoding.
 * Defers video streaming until user scrolls near each section.
 */
(function () {
  'use strict';
  if (typeof window === 'undefined') return;

  function setupLazyVideos() {
    if (!('IntersectionObserver' in window)) {
      // Fallback for ancient browsers: just ensure playsinline
      document.querySelectorAll('video').forEach(function (v) {
        v.setAttribute('playsinline', '');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var v = entry.target;
        // Never pause or throttle hero videos or showcase brand videos
        if (v.id === 'heroBgVideo' || v.id === 'acadHeroVideo' || v.id === 'showcaseVideo' || v.hasAttribute('data-hero')) return;

        if (entry.isIntersecting) {
          if (v.preload === 'none') {
            v.preload = 'auto';
          }
          var playPromise = v.play();
          if (playPromise !== undefined) {
            playPromise.catch(function () {});
          }
        } else {
          if (!v.paused) {
            v.pause();
          }
        }
      });
    }, {
      rootMargin: '350px 0px 350px 0px',
      threshold: 0.05
    });

    document.querySelectorAll('video').forEach(function (v) {
      if (v.id !== 'heroBgVideo' && v.id !== 'acadHeroVideo' && v.id !== 'showcaseVideo' && !v.hasAttribute('data-hero')) {
        v.preload = 'none';
        v.setAttribute('playsinline', '');
        v.setAttribute('webkit-playsinline', '');
        v.setAttribute('x5-playsinline', '');
        observer.observe(v);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupLazyVideos);
  } else {
    setupLazyVideos();
  }
})();
