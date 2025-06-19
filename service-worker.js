const CACHE_NAME = 'jobfair-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];


self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return Promise.all(
        urlsToCache.map(url => {
          return fetch(url).then(response => {
            if (!response.ok) throw new Error(`Request for ${url} failed with status ${response.status}`);
            return cache.put(url, response.clone());
          }).catch(err => {
            console.error(`Failed to cache ${url}:`, err);
          });
        })
      );
    })
  );
});

// Activate and clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) return caches.delete(cache);
        })
      )
    )
  );
});

// Serve from cache or fallback to index.html (for SPA)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) return response;

      if (event.request.mode === 'navigate') {
        return caches.match('/index.html');
      }

      return fetch(event.request);
    })
  );
});