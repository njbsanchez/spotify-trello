/* global TrelloPowerUp */

const Promise = TrelloPowerUp.Promise;

const GLITCH_ICON = 'https://www.svgrepo.com/show/185951/minim-musical-notation.svg';
const GRAY_ICON = 'https://www.svgrepo.com/show/185951/minim-musical-notation.svg';
const WHITE_ICON = 'https://www.svgrepo.com/show/185951/minim-musical-notation.svg';

const boardButtonCallback = function (t) {
  return t.popup({
    title: 'Popup List Example',
    items: [
      {
        text: 'Spotify Bar',
        callback: function (t) {
          return t.boardBar({
            url: './board-bar.html',
            height: 200
          })
            .then(function () {
              return t.closePopup();
            });
        }
      }
    ]
  });
};

const spotifyButtonCallback = function (t) {
  return t.popup({
    title: 'spotify',
    url: './spotify.html',
    height: 600,
  })
};

TrelloPowerUp.initialize({
  'authorization-status': function (t, options) {
    return t.loadSecret('spotifyApiToken')
      .then((token) => ({ authenticated: Boolean(token) }))
  },
  'board-buttons': function (t, options) {
    return [{
      icon: WHITE_ICON,
      text: 'Spotify',
      condition: 'always',
      callback: boardButtonCallback
    }];
  },
  'card-back-section': function (t, options) {
    return {
      title: 'Spotify',
      icon: GRAY_ICON, // Must be a gray icon, colored icons not allowed.
      content: {
        type: 'iframe',
        url: t.signUrl('./card-back-section.html'),
        height: 80 // Max height is 500
      }
    };
  },
  'card-buttons': function (t, options) {
    return [{
      icon: GRAY_ICON,
      text: 'Spotify',
      callback: spotifyButtonCallback,
    }];
  },
  'show-authorization': function (t, options) {
    return t.popup({
      title: 'Authorize Spotify',
      url: './auth.html',
      height: 140,
    });
  },
}, {
  appKey: 'indevelopment',
  appName: 'Trelody'
});

console.log('Loaded by: ' + document.referrer);
