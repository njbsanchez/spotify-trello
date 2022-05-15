/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;

var GLITCH_ICON = 'https://www.svgrepo.com/show/185951/minim-musical-notation.svg';
var GRAY_ICON = 'https://www.svgrepo.com/show/185951/minim-musical-notation.svg';
var WHITE_ICON = 'https://www.svgrepo.com/show/185951/minim-musical-notation.svg';

var spotifyButtonCallback = function(t) {
 return t.popup({
        title: 'spotify',   
        url: './spotify.html',
        height: 600,
      })
  
      };

TrelloPowerUp.initialize({
  'authorization-status': function(t, options){
    return t.get('member', 'private', 'authToken')
      .then(function(authToken) {
        return { authorized: authToken != null }
      });
  },
  'show-authorization': function(t, options){
    return t.popup({
      title: 'Authorize Spotify',
      url: './auth.html',
      height: 140,
    });
  },
  'card-back-section': function (t, options){
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
  'card-buttons': function(t, options) {
    return [{
      icon: GRAY_ICON,
      text: 'Spotify',
      callback: spotifyButtonCallback,
    }];
  },
  'authorization-status': function(t, options){
    return t.get('member', 'private', 'authToken')
      .then(function(authToken) {
        return { authorized: authToken != null }
      });
  },
  'show-authorization': function(t, options){
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
