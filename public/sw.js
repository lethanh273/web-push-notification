self.addEventListener('install', function(event) {
  event.waitUntil(self.skipWaiting()); //will install the serviceworker
});

self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim()); //will activate the serviceworker
});

// Register event listener for the 'push' event.
self.addEventListener('push', function(event) {
  // Retrieve the textual payload from event.data (a PushMessageData object).
  var payload = JSON.parse(event.data.text());

  // Keep the service worker alive until the web push notification is created.
  event.waitUntil(
      // Show a notification
      self.registration.showNotification(payload.title, {
        body: payload.body,
        icon: payload.icon,
        data: { open_url: payload.open_url }
      })
  );
});

// Register event listener for the 'notificationclick' event.
self.addEventListener('notificationclick', function(event) {
  var link = event.notification.data.open_url;
  event.notification.close(); //Close the notification

  event.waitUntil(
    clients.openWindow(link)
  );
});
