var self = this;
var cacheName = "myPWA-cache-files-v4.4.9";
var filesToBeCached = [
  "src/main.css",
  "index.html"
  //'src/js/user.js',
];
self.addEventListener("install", function(event) {
  self.skipWaiting();
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToBeCached);
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
