const CACHE_NAME = 'azrar-cache-v1.21-ux-repair';
const ASSETS = [
  './site-shell.css', './site-pages.css', './site.js', './lessons-data.js', './site-data.json', './index-en.html', './download.html', './download-en.html', './learn.html', './learn-en.html',
  './site-shell.css', './site-pages.css', './site.js', './lessons-data.js', './site-data.json', './index-en.html', './download.html', './download-en.html', './learn.html', './learn-en.html',
  './',
  './index.html',
  './videos.html',
  './learn.css',
  './learn.js',
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
      // An older cache means this is an UPDATE (not a first visit).
      const isUpdate = keys.some(key => key !== CACHE_NAME);
      return Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
        .then(() => self.clients.claim())
        .then(() => (isUpdate ? self.clients.matchAll({ type: 'window' }) : []))
        // The page that triggered the update was served by the old worker; reload it once
        // so a returning visitor sees the new deploy now instead of on the visit after.
        .then(clients => clients.forEach(client => client.navigate(client.url)));
    })
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  // Bypass non-GET requests (e.g. Analytics tracking)
  if (req.method !== 'GET') return;

  // Bypass third-party domains (Analytics, Facebook API, Fonts)
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Let the browser and server handle video range requests; avoid caching large media.
  if (req.headers.has('range') || /\.(?:mp4|webm|srt|vtt)$/i.test(url.pathname)) return;

  const isHtml = req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html');
  // Code that must match the page it ships with (CSS/JS) is treated like the page itself.
  const isCode = /\.(?:css|js)$/.test(url.pathname);

  // Pages and code: network first, so a deploy shows up on the next load. 'no-cache' makes the browser
  // revalidate with the server instead of reusing GitHub Pages' max-age=600 copy.
  // Cache is only the offline fallback.
  if (isHtml || isCode) {
    event.respondWith(
      fetch(req, { cache: 'no-cache' }).then(res => {
        if (res.status === 200) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
        }
        return res;
      }).catch(() =>
        caches.match(req, { ignoreSearch: true })
          .then(hit => hit || (isHtml ? caches.match('./index.html') : undefined))
          .then(hit => hit || (isHtml ? caches.match('./') : undefined))
      )
    );
    return;
  }

  // Other assets (images, fonts, media): cache first, refreshed in the background.
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
        // keep the worker alive until the background refresh is stored, or the browser may drop it
        event.waitUntil(refresh.catch(() => {}));
        return cached;
      }
      return refresh;
    })
  );
});
