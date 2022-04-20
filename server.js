// server.js
// where your node app starts

const compression = require('compression');
const cors = require('cors');
const express = require('express');

const app = express();


var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi({
  clientId : process.env.CLIENT_ID,
  clientSecret : process.env.CLIENT_SECRET,
});

spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);
  }, function(err) {
    console.log('Something went wrong when retrieving an access token', err.message);
  });


// compress our client side content before sending it over the wire
app.use(compression());

// your manifest must have appropriate CORS headers, you could also use '*'
app.use(cors({ origin: 'https://trello.com' }));

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));


// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/spotify.html');
});

app.get("/search", function (request, response) {
  let query = request.query.query;
  
  if(request.query.context) {
    if(request.query.context == 'artist') {
      query = 'artist:' + request.query.query;
    }
    if(request.query.context == 'track') {
      query = 'track:' + request.query.query;
    }
  }
  spotifyApi.searchTracks(query)
  .then(function(data) {
    response.send(data.body);
  }, function(err) {
    console.log(err)
  });
});


// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.info(`Node Version: ${process.version}`);
  console.log('Trello Power-Up Server listening on port ' + listener.address().port);
});





