/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();

// When constructing the URL, remember that you'll need to encode your
// APPNAME and RETURNURL
// You can do that with the encodeURIComponent(string) function
// encodeURIComponent('Hello World') -> "Hello%20World"

var oauthUrl = 'https://accounts.spotify.com/authorize?client_id=0e42a84a93d9445281811fe11a093eb5&redirect_uri=/authorize.html&response_type=code';

var tokenLooksValid = function(token) {
  return /^[0-9a-f]{64}$/.test(token);
}

var storageHandler = function(evt) {
  if (evt.key === 'token' && evt.newValue) {
    // Do something with the token here, then...
    authorizeWindow.close();
    window.removeEventListener('storage', storageHandler);
  }
}

var authorizeOpts = {
  height: 680,
  width: 580,
  validToken: tokenLooksValid,
  windowCallback: function(authorizeWindow) {
    // This callback gets called with the handle to the
    // authorization window. This can be useful if you
    // can't call window.close() in your new window
    // (such as the case when your authorization page
    // is rendered inside an iframe).
    window.addEventListener('storage', storageHandler);
  }
};

var authBtn = document.getElementById('authorize');
authBtn.addEventListener('click', function() {
  t.authorize(oauthUrl, authorizeOpts)
  .then(function(token) {
    return t.set('organization', 'private', 'token', token)
    .catch(t.NotHandled, function() {
      // fall back to storing at board level
      return t.set('board', 'private', 'token', token);
    });
  })
  .then(function() {
    // now that the token is stored, we can close this popup
    // you might alternatively choose to open a new popup
    return t.closePopup();
  });
});