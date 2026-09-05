const VERSION = 'lyos-v6';
const CORE = [
  'manifest.json',
  'index.html',
  'tienda.html',
  'academia.html',
  'support.js',
  'assets/react.production.min.js',
  'assets/react-dom.production.min.js',
  'assets/seamless-nav.js',
  'assets/lazy-video-engine.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(VERSION)
      .then(c => c.addAll(CORE))
      .catch(() => {})
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  const isDoc = req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html');

  // Navegación instantánea (HTML): Cache-first con actualización en segundo plano (Stale-While-Revalidate)
  // Esto hace que cambiar de página tome 0ms, sea completamente imperceptible y no tenga pantalla blanca.
  if (isDoc) {
    e.respondWith(
      caches.match(req).then(cached => {
        const netFetch = fetch(req).then(res => {
          if (res && res.ok) {
            const clone = res.clone();
            caches.open(VERSION).then(c => c.put(req, clone)).catch(() => {});
          }
          return res;
        }).catch(() => cached);

        return cached || netFetch;
      })
    );
    return;
  }

  // Scripts de la app y assets: Stale-While-Revalidate para máxima velocidad
  e.respondWith(
    caches.match(req).then(hit => {
      const net = fetch(req).then(res => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(VERSION).then(c => c.put(req, copy)).catch(() => {});
        }
        return res;
      }).catch(() => hit);
      return hit || net;
    })
  );
});
