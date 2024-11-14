
var stripeElements = function(publicKey, setupIntent) {
  var stripe = Stripe(publicKey);

  const options = {
    clientSecret: setupIntent.client_secret
  };
  const elements = stripe.elements(options);

  // Create and mount the Payment Element
  const paymentElement = elements.create('payment');
  paymentElement.mount('#payment-element');

};

var getSetupIntent = function(publicKey) {
  return fetch("/create-setup-intent", {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(setupIntent) {
      stripeElements(publicKey, setupIntent);
    });
};

var getPublicKey = function() {
  return fetch("/public-key", {
    method: "get",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      getSetupIntent(response.publicKey);
    });
};



getPublicKey();
