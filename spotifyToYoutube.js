/**
 * Nodejs package to translate a spotify url to a youtube url.
 * Uses the Spotify Web API and the Youtube API
*/
const fs = require('fs');
require("dotenv").config();
const yts = require('yt-search');
var spotifyWebApi = require('spotify-web-api-node');
var readline = require('linebyline');
const { youtubeRegex, spotifyRegex } = require ('./variables.js');

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

const spotifyApi = new spotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET
});

// Retrieve an access token.
async function getAccessToken() {
  if (spotifyApi.getAccessToken()) {
    return true;
  }

  return spotifyApi.clientCredentialsGrant().then(
    function (data) {
      console.log('The access token expires in ' + data.body['expires_in']);
      console.log('The access token is ' + data.body['access_token']);

      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);
    },
    function (err) {
      console.log('Something went wrong when retrieving an access token', err);
    }
  );
}

/**
 * Translate a Spotify URL to a YouTube URL.
 * @param {string} spotifyUrl - URL of the song on Spotify
 * @returns {string} URL of the song on YouTube
 */
async function spotifyToYoutube(spotifyUrl) {
  // Now get the artist and title of the song on spotify
  await getAccessToken();

  const response = await getTrackInfo(spotifyUrl);
  // console.log("RESPONSE", response);

  const artist = response.body.artists[0].name;
  const title = response.body.name;

  // Now look for the song on youtube
  const q = artist + ' ' + title;
  console.log("Searching youtube for: ", q)
  const r = await yts(q);

  // Take the first one we found
  const videos = r.videos.slice(0, 1);
  youtubeUrl = videos[0].url;
  // console.log(youtubeUrl);

  return youtubeUrl;
}

async function getTrackInfo(spotifyUrl) {
  const spotifyId = spotifyUrl.split('track/')[1].trim();
  console.log("SPOTIFY ID:", spotifyId);

  return spotifyApi.getTrack(spotifyId);
}


module.exports = {
  spotifyToYoutube
}