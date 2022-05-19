/* global TrelloPowerUp */
var Promise = TrelloPowerUp.Promise;
var t = window.TrelloPowerUp.iframe();

t.render(function() {
  return t.sizeTo('#content');
})

// creates oauth url ----------------------------------------
const authEndpoint = 'https://accounts.spotify.com/authorize';
const clientId = process.env.CLIENT_ID;
const redirectUri = 'https://trello-try-full.glitch.me/auth-success.html';
const scopes = [
  'streaming',
  'user-read-private',
  'user-modify-playback-state'
];

const oauthUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;

// authenticate button > to redirect to spotify oauth ----------
const authBtn = document.getElementById('authorize');
authBtn.addEventListener('click', function() {
  t.authorize(oauthUrl)
    .then(function(token) {
      console.log(token);
      return t.setSecret('spotifyApiToken', token)
    })
    .then(function() {
      return t.closePopup();
    });
});
