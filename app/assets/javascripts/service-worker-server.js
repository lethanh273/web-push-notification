// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker
//       .register('/sw.js')
//       .then(function() { console.log('Service Worker Registered'); });
// }
document.addEventListener("DOMContentLoaded", function() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw.js')
        .then(function() {
          navigator.serviceWorker.ready
              .then(function (registration) {
                registration.pushManager.getSubscription()
                    .then(function (subscription) {
                      if (subscription) {
                        changePushStatus(true);
                      } else {
                        changePushStatus(false);
                      }
                    })
                    .catch(function (error) {
                      console.error('Error occurred while enabling push ', error);
                    });
              });
        });
  }

  var togglePushElement = document.querySelector('.toggle-push-element');
  //Click event for subscribe push
  togglePushElement.addEventListener('click', function () {
    var isSubscribed = (togglePushElement.dataset.checked === 'true');
    if (isSubscribed) {
      unsubscribePush();
    }
    else {
      subscribePush();
    }
  });

  function changePushStatus(status) {
    var togglePushElement = document.querySelector('.toggle-push-element');
    togglePushElement.dataset.checked = status;
    if (status) {
      togglePushElement.textContent = 'Click here to Un Subscription';
    }
    else {
      togglePushElement.textContent = 'Click here to Subscription';
    }
  }


  function subscribePush() {
    navigator.serviceWorker.ready.then(function(registration) {
      if (!registration.pushManager) {
        alert('Your browser doesn\'t support push notification.');
        return false;
      }
      //To subscribe `push notification` from push manager
      registration.pushManager.subscribe({
        userVisibleOnly: true //Always show notification when received
      })
        .then(function (subscription) {
          // console.info('Push notification subscribed.');
          // console.log(subscription);
          saveSubscriptionID(subscription);
          changePushStatus(true);
        })
        .catch(function (error) {
          changePushStatus(false);
          console.error('Push notification subscription error: ', error);
        });
    })
  };

  function unsubscribePush() {
    navigator.serviceWorker.ready
        .then(function(registration) {
          //Get `push subscription`
          registration.pushManager.getSubscription()
              .then(function (subscription) {
                //If no `push subscription`, then return
                if(!subscription) {
                  alert('Unable to unregister push notification.');
                  return;
                }

                //Unsubscribe `push notification`
                subscription.unsubscribe()
                    .then(function () {
                      // console.info('Push notification unsubscribed.');
                      // console.log(subscription);
                      deleteSubscriptionID(subscription);
                      changePushStatus(false);
                    })
                    .catch(function (error) {
                      console.error(error);
                    });
              })
              .catch(function (error) {
                console.error('Failed to unsubscribe push notification.');
              });
        })
  }

  function saveSubscriptionID(subscription) {
    var subscription_json = subscription.toJSON();
    var subscription_id = subscription_json.endpoint.split('gcm/send/')[1];
    var subscription_key_auth = subscription_json.keys.auth;
    var subscription_key_p256dh = subscription_json.keys.p256dh;
    var subscription_path = window.location.pathname;

    fetch('/api/subscriptions', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
          {
            subscription_id : subscription_id,
            subscription_path: subscription_path,
            key_auth: subscription_key_auth,
            key_p256dh: subscription_key_p256dh,
            endpoint: subscription.endpoint
          })
    });
  }

  function deleteSubscriptionID(subscription) {
    var subscription_id = subscription.endpoint.split('gcm/send/')[1];

    console.log("Subscription ID", subscription_id);
    fetch('/api/subscriptions/' + subscription_id, {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
  }
})
