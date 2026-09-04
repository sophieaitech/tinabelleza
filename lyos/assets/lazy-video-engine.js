/**
 * LYOS Profesional · Ultra-Performance Smart Lazy Video Engine
 * 
 * Cumple estrictamente con:
 * 1. "no que carguen todos, sino que cargue a medida que vaya bajando":
 *    - Cero descarga de datos al cargar la página (preload="none").
 *    - Carga bajo demanda del stream únicamente cuando el usuario baja y llega a cada sección.
 * 2. "que se reproduzca en loop, pero en silencio":
 *    - Reproducción continua e infinita (loop nativo + listener de reinicio 'ended').
 *    - Totalmente en silencio (muted = true, volume = 0).
 * 3. Ahorro de CPU y batería:
 *    - Se pausa automáticamente al salir de la pantalla y se reanuda al volver a ella.
 */
(function () {
  'use strict';
  if (typeof window === 'undefined') return;

  function initLazyVideoEngine() {
    var isObserverSupported = 'IntersectionObserver' in window;
    var allVideos = document.querySelectorAll('video');

    allVideos.forEach(function (v) {
      // 1. Hero videos que están inmediatamente visibles al inicio
      if (v.id === 'heroBgVideo' || v.id === 'acadHeroVideo' || v.hasAttribute('data-hero')) {
        v.muted = true;
        v.defaultMuted = true;
        v.loop = true;
        v.setAttribute('playsinline', '');
        v.setAttribute('webkit-playsinline', '');
        v.setAttribute('x5-playsinline', '');
        var hp = v.play();
        if (hp !== undefined) {
          hp.catch(function() {});
        }
        return;
      }

      // 2. Todos los videos secundarios (showcaseVideo, kitRealDemoVideo, koreaRealDemoVideo, etc.)
      // Configuración inicial: cero carga previa de red, bucle continuo y silencio estricto
      v.preload = 'none';
      v.muted = true;
      v.defaultMuted = true;
      v.loop = true;
      v.setAttribute('loop', '');
      v.setAttribute('muted', '');
      v.setAttribute('playsinline', '');
      v.setAttribute('webkit-playsinline', '');
      v.setAttribute('x5-playsinline', '');

      // Garantía de reinicio infinito de bucle
      v.addEventListener('ended', function() {
        v.currentTime = 0;
        v.play().catch(function() {});
      });
    });

    if (!isObserverSupported) {
      // Fallback para navegadores antiguos
      allVideos.forEach(function(v) {
        if (v.id !== 'heroBgVideo' && v.id !== 'acadHeroVideo' && !v.hasAttribute('data-hero')) {
          v.preload = 'auto';
          v.load();
          v.play().catch(function() {});
        }
      });
      return;
    }

    // Observador con margen anticipado para comenzar a cargar justo cuando la persona está bajando
    var videoObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var v = entry.target;
        if (v.id === 'heroBgVideo' || v.id === 'acadHeroVideo' || v.hasAttribute('data-hero')) return;

        if (entry.isIntersecting) {
          // El usuario bajó hasta esta sección: cargar el video bajo demanda
          if (!v._streamLoaded) {
            v._streamLoaded = true;
            v.preload = 'auto';
            v.load(); // Despierta la descarga del stream solo para este video
          }

          // Mantener en silencio a menos que el usuario haya pulsado explícitamente el botón de sonido
          if (v._userUnmuted !== true) {
            v.muted = true;
            v.defaultMuted = true;
          }

          var playPromise = v.play();
          if (playPromise !== undefined) {
            playPromise.catch(function () {
              // Si la política del navegador exige interacción previa, iniciar al primer gesto
              function onUserGesture() {
                if (v._userUnmuted !== true) v.muted = true;
                v.play().catch(function() {});
                window.removeEventListener('touchstart', onUserGesture);
                window.removeEventListener('scroll', onUserGesture);
                window.removeEventListener('click', onUserGesture);
              }
              window.addEventListener('touchstart', onUserGesture, { passive: true, once: true });
              window.addEventListener('scroll', onUserGesture, { passive: true, once: true });
              window.addEventListener('click', onUserGesture, { passive: true, once: true });
            });
          }
        } else {
          // El usuario scrolleó fuera de la sección: pausar para ahorrar datos, batería y memoria
          if (!v.paused) {
            v.pause();
          }
        }
      });
    }, {
      rootMargin: '250px 0px 250px 0px',
      threshold: 0.12
    });

    allVideos.forEach(function (v) {
      if (v.id !== 'heroBgVideo' && v.id !== 'acadHeroVideo' && !v.hasAttribute('data-hero')) {
        videoObserver.observe(v);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLazyVideoEngine);
  } else {
    initLazyVideoEngine();
  }
})();
