/* global TrelloPowerUp */


var Promise = TrelloPowerUp.Promise;
var t = window.TrelloPowerUp.iframe();

t.render(function() {
  return t.sizeTo('#content');
})

// tool to decipher hash and extract token ------------------

const hash = window.location.hash
      .substring(1)
      .split('&')
      .reduce(function (initial, item) {
        if (item) {
          var parts = item.split('=');
          initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
      }, {});
      window.location.hash = '';


// Set token -------------------------------------------



function getToken(Url) {
   window.location = Url
   var token = hash.access_token;
   return new Promise((resolve, reject)=>{
      if (window.opener) {
         window.opener.authorize(token);
      } else {
         localStorage.setItem('Authtoken', token);
      }
      setTimeout(function(){ window.close(); }, 1000);
   });
}

  
// creates oauth url ----------------------------------------

const authEndpoint = 'https://accounts.spotify.com/authorize';
const clientId = '0e42a84a93d9445281811fe11a093eb5';
const redirectUri = 'https://trello-try-full.glitch.me/auth-access.html';
const scopes = [
  'streaming',
  'user-read-private',
  'user-modify-playback-state'];

var oauthUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;



// authenticate button > to redirect to spotify oauth ----------


var tokenLooksValid = function(token) {
  return /^[0-9a-f]{64}$/.test(token);
}

var storageHandler = function(evt) {
  if (evt.key === 'token' && evt.newValue) {
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
//   window.location = oauthUrl;
//   var token = hash.access_token;
  
//   getToken()
//    .then(doSomethingElse) // and if you wouldn't mind
//    .catch(anyErrorsPlease);
  
//   if (window.opener) {
//         window.opener.authorize(token);
//       } else {
//         localStorage.setItem('Authtoken', token);
//       }
//       setTimeout(function(){ window.close(); }, 1000);
  
  
  t.authorize(oauthUrl)
  .then(function(token) {
    console.log(token);
    return t.set('member', 'private', 'authToken', token)
    .catch(t.NotHandled, function() {
       // fall back to storing at board level
      return t.set('board', 'private', 'token', token);
    });
  })  
  .then(function() {
    return t.closePopup();
  });
});


