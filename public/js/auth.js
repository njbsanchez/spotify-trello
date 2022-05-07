var t = window.TrelloPowerUp.iframe();

t.render(function() {
  return t.sizeTo('#content');
})

var oauthUrl = window.origin + '/3rd-party/authorize.html';

const authEndpoint = 'https://accounts.spotify.com/authorize';

// Replace with your app's client ID, redirect URI and desired scopes
const clientId = '0e42a84a93d9445281811fe11a093eb5';
const redirectUri = 'https://trello-try-full.glitch.me/auth-access.html';
const scopes = [
  'streaming'
];

var authBtn = document.getElementById('authorize');
authBtn.addEventListener('click', function() {
  t.authorize(`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`)
  .then(function(token) {
    return t.set('member', 'private', 'authToken', token)
  })
  .then(function() {
    return t.closePopup();
  });
});

