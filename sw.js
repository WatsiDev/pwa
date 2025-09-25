// sw.js

// Nombre del caché
var nombreCache = 'cache-v1';

// Archivos a cachear
var archivosACachear = [
  'index.html',
  'bootstrap-5.0.2-dist/css/bootstrap.min.css',
  'bootstrap-5.0.2-dist/js/bootstrap.bundle.min.js',
  'lib1.js',
  'lib2.js',
  'hola.jpg',
  'unicorn.jpg',
  'utp.png'
];

// Instalar SW y guardar en caché los archivos iniciales
self.addEventListener('install', function(evento) {
  evento.waitUntil(
    caches.open(nombreCache).then(function(cache) {
      console.log('Archivos cacheados correctamente');
      return cache.addAll(archivosACachear);
    })
  );
});

// Interceptar peticiones
self.addEventListener('fetch', function(evento) {
  console.log('Petición interceptada:', evento.request.url);

  if (/\.jpg$/.test(evento.request.url)) {
    evento.respondWith(fetch('unicorn.jpg'));
  } 
  else if (/\.png$/.test(evento.request.url)) {
    evento.respondWith(fetch('utp.png'));
  } 
  else {
    evento.respondWith(
      caches.match(evento.request).then(function(respuesta) {
        // Si está en caché, lo devuelve
        if (respuesta) {
          return respuesta;
        }
        // Si no, lo pide a la red
        return fetch(evento.request);
      })
    );
  }
});
