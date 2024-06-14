const CACHE_NAME = 'app-shell-cache';
const APP_SHELL = 'app-shell.html';

// Install event - cache the app shell and add static routing
self.addEventListener('install', event => {
    event.addRoutes([
        {
            condition: {
                urlPattern: `/${APP_SHELL}`,
                runningStatus: 'running'
            },
            source: 'fetch-event'
        }
    ]);

    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll([APP_SHELL]);
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(keyList.map(key => {
                if (key !== CACHE_NAME) {
                    return caches.delete(key);
                }
            }));
        })
    );
});

// Fetch event - respond with the app shell for navigation requests
self.addEventListener('fetch', event => {
    if (event.request.mode === 'navigate') {
        event.respondWith(
            caches.match(APP_SHELL).then(response => {
                return response || fetch(event.request);
            })
        );
    } else {
        event.respondWith(fetch(event.request));
    }
});
