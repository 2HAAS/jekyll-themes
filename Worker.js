const static2HAAS = '2HAAS-cache-v1';
const assets = [
  '/',
  '/index.html',
  '/page-2/',
  '/page-3/',
  '/search/',
  '/assets/css/2HAAS.css',
  '/assets/css/syntax.css',
  '/assets/img/404.gif',
 '/assets/js/app.js',
  '/assets/js/search.js'
];
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(static2HAAS).then((cache) => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
});
// activate event
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== staticCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});
// fetch event
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});
