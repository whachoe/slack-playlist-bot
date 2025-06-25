const spotifyToYT = require('./spotifyToYoutube.js');
const youtubeToSpotify = require('./youtubeToSpotify.js');
const utils = require('./utils.js');
const fs = require('fs');
const readline = require('linebyline');
const { youtubeRegex, spotifyRegex, all_playlist } = require ('./variables.js');

/**
 * Run through the all_playlist-file, get the spotify tracks and translate them. save them in another file
 * Do the reverse for youtube videos: Look for them on spotify and save them in another file
 *
 * @param {*} inputfile
 * @param {*} YT_outputfile 
 * @param {*} SP_outputfile 
 */
async function translateFile(inputfile, YT_outputfile, SP_outputfile) {
  rl = readline(inputfile);
  rl.on('line', function(url, lineCount, byteCount) {
      console.log("INPUT URL:", url);
      url = url.trim();

      if (utils.isSpotifyUrl(url)) {
        fs.appendFileSync(SP_outputfile, url + '\n');

        spotifyToYT.spotifyToYoutube(url).then(youtubeUrl => {
          fs.appendFileSync(YT_outputfile, youtubeUrl + '\n');
          
        });
      } else if (utils.isYoutubeUrl(url)) {
        youtubeUrl = url;
        fs.appendFileSync(YT_outputfile, youtubeUrl + '\n');

        youtubeToSpotify.youtubeToSpotify(url).then(spotifyUrl => {
          fs.appendFileSync(SP_outputfile, spotifyUrl + '\n');
        });
      } else {
        console.log('Not a valid URL: ' + url);
      }
  })
  .on('error', function(error) {
    // something went wrong
    console.log(error);
    return error;
  });
}

console.log('Translating...');
translateFile(all_playlist, 'youtube_links.txt', 'spotify_links.txt');