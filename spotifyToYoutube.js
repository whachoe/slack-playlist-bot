/**
 * Nodejs package to translate a spotify url to a youtube url.
 * Uses the Spotify Web API and the Youtube API
*/
const fs = require('fs');
require("dotenv").config();
const yts = require( 'yt-search' );
var spotifyWebApi = require('spotify-web-api-node');
require ('./variables.js');

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

var spotifyApi = new spotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET
});

// Retrieve an access token.
spotifyApi.clientCredentialsGrant().then(
  function(data) {
    console.log('The access token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);
  },
  function(err) {
    console.log('Something went wrong when retrieving an access token', err);
  }
);

/**
 * Translate a Spotify URL to a YouTube URL.
 * @param {string} spotifyUrl - URL of the song on Spotify
 * @returns {string} URL of the song on YouTube
 */
function translateSpotifyToYoutube(spotifyUrl) {
    // Now get the artist and title of the song on spotify
    getTrackInfo(spotifyUrl).then(response => {
        const artist = response.artists[0].name;
        const title = response.name;
        console.log(response);

        // Now look for the song on youtube
        const r = yts("${artist}+${title}").then(r => {
          console.log(r);
          const videos = r.videos.slice( 0, 1 );
          youtubeUrl = videos[0].url;
          console.log(youtubeUrl);          
          return youtubeUrl;   
        });     
    });
}

async function getTrackInfo(spotifyUrl) {
  const spotifyId = spotifyUrl.split('track/')[1];
  return await spotifyApi.getTrack(spotifyId);
}

function isSpotifyUrl(url) {
  const spotifyTrackRegex = /.*spotify.com\/track.*/;
  return spotifyTrackRegex.test(url);
}

function isYoutubeUrl(url) {
  return youtubeRegex.test(url);
}

function translateFile(inputfile, outputfile)
{
  // run through the file, get the spotify tracks and translate them. save them in another file
  fs.readFile(inputfile, 'utf8', (err, url) => {
    var youtubeUrl = '';

    if (err) {
      console.log(err);
    } else {
      console.log(url);

      if (isSpotifyUrl(url)) {
        youtubeUrl = translateSpotifyToYoutube(url);
      } else if (isYoutubeUrl(url)) {
        youtubeUrl = url;
      } else {
        console.log('Not a valid URL: ' + url);
      }

      if (youtubeUrl != '') {
        fs.appendFileSync(outputfile, youtubeUrl + '\n');
      }
    }           
  });
}

module.exports = { 
    translateSpotifyToYoutube, translateFile
}