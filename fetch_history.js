const fs = require('fs');
const { WebClient, LogLevel } = require("@slack/web-api");
require("dotenv").config();
const { youtubeRegex, spotifyRegex, all_playlist } = require ('./variables.js');

// Fetch all messages ever sent to a certain slack channel
const client = new WebClient(process.env.SLACK_BOT_TOKEN, {
  // logLevel: LogLevel.DEBUG
});

async function getChannelHistory(channelId, next_cursor = null) {
  var options = {
    channel: channelId,
    limit: 2
  }

  if (next_cursor) {
    options.cursor = next_cursor;
  }

  const response = await client.conversations.history(options);
  
  return response;
}

function saveMessages(response)
{
  response.messages.forEach(message => {
    // console.log(message.text);

    // Filter out urls to spotify and youtube
    const yt = message.text.match(youtubeRegex);
    if ( yt ) {
      // console.log(yt[0]);
      url = yt[0];
    }

    const spot = message.text.match(spotifyRegex);
    if (spot) {
      // console.log(spot[0]);
      url = spot[0];
    }

    // Save them to a file
    fs.appendFileSync(all_playlist, url + '\n');
  });

  // Get next page
  if (response.has_more) {
    getChannelHistory(process.env.SLACK_CHANNEL_ID, response.response_metadata.next_cursor).then(response2 => saveMessages(response2));
  }
}

// Get all messages in channel
getChannelHistory(process.env.SLACK_CHANNEL_ID).then(response => saveMessages(response));