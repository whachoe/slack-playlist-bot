/**
 * This is the Slack bot part: Listens for youtube/spotify links and saves them to a file
 * 
 */

const fs = require('fs');
const { App } = require("@slack/bolt");
require("dotenv").config();
const { youtubeRegex, spotifyRegex } = require ('./variables.js');

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
      fs.appendFileSync('youtube_links.txt', link + '\n');
      console.log(`Saved YouTube link: ${link}`);
    });
  // await say("YouTube link saved!");  
});

// Listen for spotify links
app.message(spotifyRegex, async ({ context, say }) => {
  console.log(context);
  
  // RegExp matches are inside of context.matches
  context.matches.forEach(link => {
      fs.appendFileSync('youtube_links.txt', link + '\n');
      console.log(`Saved Spotify link: ${link}`);
    });  
});



(async () => {
  const port = 3000
  await app.start(process.env.PORT || port);
  console.log('Bot started!');
})();
