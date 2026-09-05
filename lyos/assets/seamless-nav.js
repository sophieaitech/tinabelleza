/**
 * LYOS Seamless Ultra-Fast Navigation & Transition Engine
 * - Zero-delay background prefetching & caching for landing, tienda, and academia.
 * - Invisible, seamless cross-fade transitions eliminating loading screens, pauses, and white flashes.
 * - Smooth in-page and cross-page anchor scrolling with fixed header compensation.
 * - Native View Transitions API integration with ultra-fluid fallback.
 */
(function() {
  'use strict';

  var PREFETCH_PAGES = ['index.html', 'tienda.html', 'academia.html'];
  var prefetched = new Set();
  var isNavigating = false;

  // 1. Instant Prefetch Helper
  function prefetchUrl(url) {
    if (!url || prefetched.has(url)) return;
    prefetched.add(url);

    // Modern browser prefetch
    try {
      var link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;
      link.as = 'document';
      document.head.appendChild(link);
    } catch (e) {}

    // Prerender hint where supported
    try {
      var prerender = document.createElement('link');
      prerender.rel = 'prerender';
      prerender.href = url;
      document.head.appendChild(prerender);
    } catch (e) {}

    // Service Worker / Browser memory cache warm-up
    if (window.fetch) {
      try {
        fetch(url, { priority: 'high', cache: 'default' }).catch(function() {});
      } catch (e) {}
    }
  }

  // 2. Background Prefetch All Main Pages on Idle
  function initBackgroundPrefetch() {
    var currentPath = window.location.pathname.split('/').pop() || 'index.html';
    PREFETCH_PAGES.forEach(function(p) {
      if (p !== currentPath && !currentPath.endsWith(p)) {
        prefetchUrl(p);
      }
    });
  }

  if (window.requestIdleCallback) {
    requestIdleCallback(initBackgroundPrefetch, { timeout: 800 });
  } else {
    setTimeout(initBackgroundPrefetch, 300);
  }

  // 3. Hover / Touch Instant Warmup
  document.addEventListener('mouseover', handleHoverPrefetch, { passive: true });
  document.addEventListener('touchstart', handleHoverPrefetch, { passive: true });

  function handleHoverPrefetch(e) {
    var a = e.target.closest('a');
    if (!a || !a.href) return;
    var href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel') || href.startsWith('javascript')) return;
    var cleanUrl = href.split('#')[0].split('?')[0];
    if (cleanUrl) prefetchUrl(cleanUrl);
  }

  // 4. Smooth Anchor Scrolling with Header Compensation (70px)
  function smoothScrollTo(targetEl) {
    if (!targetEl) return;
    var headerOffset = 70;
    var elRect = targetEl.getBoundingClientRect();
    var targetY = elRect.top + window.pageYOffset - headerOffset;
    
    window.scrollTo({
      top: Math.max(0, targetY),
      behavior: 'smooth'
    });
  }

  // 5. Intercept Click Events for Seamless, Flash-Free Navigation
  document.addEventListener('click', function(e) {
    var a = e.target.closest('a');
    if (!a || !a.href || a.target === '_blank' || a.hasAttribute('download')) return;
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.button !== 0) return;

    var href = a.getAttribute('href');
    if (!href || href.startsWith('javascript:') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
    if (href.includes('wa.me') || href.includes('whatsapp.com')) return;

    // A. Local In-Page Anchor Links (#section)
    if (href.startsWith('#')) {
      if (href === '#' || href === '#!') return;
      var targetId = href.substring(1);
      var targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        smoothScrollTo(targetEl);
        if (history.pushState) {
          history.pushState(null, null, href);
        }
      }
      return;
    }

    // B. Internal Page Links (index.html, tienda.html, academia.html, etc.)
    var currentBase = window.location.pathname.split('/').pop() || 'index.html';
    var targetUrlParts = href.split('#');
    var targetPage = targetUrlParts[0];
    var targetHash = targetUrlParts[1] ? '#' + targetUrlParts[1] : '';

    // If link points to current page with hash
    if ((targetPage === '' || targetPage === currentBase) && targetHash) {
      var targetElem = document.getElementById(targetHash.substring(1));
      if (targetElem) {
        e.preventDefault();
        smoothScrollTo(targetElem);
        if (history.pushState) history.pushState(null, null, targetHash);
        return;
      }
    }

    // Internal HTML navigation?
    var isInternalHtml = targetPage.endsWith('.html') || targetPage === '/' || targetPage === '' ||
                         PREFETCH_PAGES.some(function(p) { return targetPage.includes(p.replace('.html', '')); });

    if (isInternalHtml && !isNavigating) {
      isNavigating = true;

      // Native Cross-Document View Transitions (Chromium 126+, Safari 18+)
      if (document.startViewTransition && !targetHash) {
        return; // Allow the browser's native hardware-accelerated cross-document view transition
      }

      // Fast, Imperceptible Cross-Page Handshake
      e.preventDefault();
      var root = document.getElementById('dc-root') || document.body;
      root.style.transition = 'opacity 75ms cubic-bezier(0.4, 0, 0.2, 1)';
      root.style.opacity = '0.95';

      setTimeout(function() {
        window.location.href = href;
      }, 75);
    }
  });

  // 6. Smooth Landing on Page with Hash (e.g. index.html#comparador from tienda.html)
  function checkInitialHash() {
    var hash = window.location.hash;
    if (!hash || hash.length < 2) return;
    var targetId = hash.substring(1);
    var targetEl = document.getElementById(targetId);
    if (targetEl) {
      setTimeout(function() {
        smoothScrollTo(targetEl);
      }, 180);
    } else {
      var retries = 0;
      var interval = setInterval(function() {
        retries++;
        var el = document.getElementById(targetId);
        if (el) {
          clearInterval(interval);
          smoothScrollTo(el);
        } else if (retries > 10) {
          clearInterval(interval);
        }
      }, 100);
    }
  }

  // 7. Ultra-Smooth Page Enter (Immediate display without white flashes)
  function initPageEnter() {
    var root = document.getElementById('dc-root') || document.body;
    if (root) {
      root.style.transition = 'opacity 90ms cubic-bezier(0.2, 0.8, 0.2, 1)';
      root.style.opacity = '1';
    }
    checkInitialHash();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPageEnter);
  } else {
    initPageEnter();
  }

  window.addEventListener('pageshow', function(e) {
    isNavigating = false;
    var root = document.getElementById('dc-root') || document.body;
    if (root) {
      root.style.opacity = '1';
    }
  });

})();
