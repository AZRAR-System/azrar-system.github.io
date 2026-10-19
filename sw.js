const CACHE_NAME = 'azrar-cache-v1.16';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './shared-dark.css',
  './hig-base.css',
  './home-light.css',
  './hig-a11y.js',
  './home-bg.js',
  './chatbot.js',
  './bg-animation.js',
  './logo.png',
  './bg-city.webp',
  './favicon.ico',
  './android-chrome-192x192.png',
  './favicon-32x32.png',
  './favicon-16x16.png',
  './apple-touch-icon.png',
  './site.webmanifest'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Use cache.addAll, but catch individual failures so it doesn't fail completely
      return Promise.allSettled(
        ASSETS.map(url => {
          return cache.add(url).catch(err => {
            console.warn(`[SW Cache] Failed to cache: ${url}`, err);
          });
        })
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const req = event.request;
  // Bypass non-GET requests (e.g. Analytics tracking)
  if (req.method !== 'GET') return;

  // Bypass third-party domains (Analytics, Facebook API, Fonts)
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  const isHtml = req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html');

  // Pages: network first, so a deploy shows up on the next load. 'no-cache' makes the browser
  // revalidate with the server instead of reusing GitHub Pages' max-age=600 copy.
  // Cache is only the offline fallback.
  if (isHtml) {
    event.respondWith(
      fetch(req, { cache: 'no-cache' }).then(res => {
        if (res.status === 200) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
        }
        return res;
      }).catch(() =>
        caches.match(req, { ignoreSearch: true })
          .then(hit => hit || caches.match('./index.html'))
          .then(hit => hit || caches.match('./'))
      )
    );
    return;
  }

  // Assets: cache first, refreshed in the background (also revalidating past the HTTP cache).
  event.respondWith(
    caches.match(req).then(cached => {
      const refresh = fetch(req, { cache: 'no-cache' }).then(res => {
        if (res.status === 200) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
        }
        return res;
      });
      if (cached) {
        refresh.catch(() => {});
        return cached;
      }
      return refresh;
    })
  );
});
