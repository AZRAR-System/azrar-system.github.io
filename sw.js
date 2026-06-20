const CACHE_NAME = 'azrar-cache-v1.2';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './shared-dark.css',
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
  // Bypass non-GET requests (e.g. Analytics tracking)
  if (event.request.method !== 'GET') return;
  
  // Bypass third-party domains (Analytics, Facebook API, Fonts)
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        // Return cached asset, fetch fresh in background (stale-while-revalidate)
        fetch(event.request).then(networkResponse => {
          if (networkResponse.status === 200) {
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, networkResponse));
          }
        }).catch(() => {});
        return cachedResponse;
      }
      return fetch(event.request).then(networkResponse => {
        if (networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseClone));
        }
        return networkResponse;
      }).catch(() => {
        // Fallback to offline index.html if html is requested
        const acceptHeader = event.request.headers.get('accept') || '';
        if (acceptHeader.includes('text/html')) {
          return caches.match('./index.html') || caches.match('./');
        }
      });
    })
  );
});
