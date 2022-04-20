/* global TrelloPowerUp */

var t = TrelloPowerUp.iframe();

const message = t.arg('message');

if (message) {
  document.getElementById("message").innerText = message;
};

t.sizeTo(document.body);