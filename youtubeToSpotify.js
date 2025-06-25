const fs = require('fs');
require("dotenv").config();
const yts = require('yt-search');
var spotifyWebApi = require('spotify-web-api-node');
var readline = require('linebyline');
const { youtubeRegex, spotifyRegex } = require ('./variables.js');

// Set up Spotify API credentials
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

// Function to get the title of a YouTube video
async function getYouTubeVideoTitle(videoUrl) {
  const videoId = videoUrl.split('v=')[1];
  const video = await yts({ videoId: videoId });
//   console.log(video);
  return video.title;
}

// Function to search for a song on Spotify
async function searchSongOnSpotify(songTitle) {
  const response = await spotifyApi.searchTracks(songTitle);
  return response.body.tracks.items[0];
}

// Function to get a Spotify song given a YouTube video URL
async function youtubeToSpotify(videoUrl) {
  await getAccessToken();

  const songTitle = await getYouTubeVideoTitle(videoUrl);
  const song = await searchSongOnSpotify(songTitle);
  return song.external_urls.spotify;
}

module.exports = {
  youtubeToSpotify
};