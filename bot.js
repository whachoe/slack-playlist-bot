/**
 * This is the Slack bot part: Listens for youtube/spotify links and saves them to a file
 * 
 */

const fs = require('fs');
const { App } = require("@slack/bolt");
require("dotenv").config();
const { youtubeRegex, spotifyRegex, all_playlist, youtube_playlist, spotify_playlist } = require ('./variables.js');
const spotifyToYT = require('./spotifyToYoutube.js');
const youtubeToSpotify = require('./youtubeToSpotify.js');

// Initializes your app with credentials
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode:true // enable to use socket mode
});

// Listen for youtube links
app.message(youtubeRegex, async ({ context, say }) => {
  console.log(context);

  // RegExp matches are inside of context.matches
  context.matches.forEach(link => {
      fs.appendFileSync(all_playlist, link + '\n');
      fs.appendFileSync(youtube_playlist, link + '\n');

      youtubeToSpotify.youtubeToSpotify(link).then(sp => {
          console.log("spotify url: ", sp);
          fs.appendFileSync(spotify_playlist, sp + '\n');
      });

      console.log(`Saved YouTube link: ${link}`);
    });
  // await say("YouTube link saved!");  
});

// Listen for spotify links
app.message(spotifyRegex, async ({ context, say }) => {
  console.log(context);
  
  // RegExp matches are inside of context.matches
  context.matches.forEach(link => {
      fs.appendFileSync(all_playlist, link + '\n');
      fs.appendFileSync(spotify_playlist, link + '\n');

      spotifyToYT.spotifyToYoutube(link).then(yt => {
          console.log("youtube url: ", yt);
          fs.appendFileSync(youtube_playlist, yt + '\n');
      });
      
      console.log(`Saved Spotify link: ${link}`);
    });  
});

// Main loop
(async () => {
  const port = 3000
  await app.start(process.env.PORT || port);
  console.log('Bot started!');
})();
