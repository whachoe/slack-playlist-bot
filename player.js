/**
 * Express app which displays a youtube video player with a list of all the videos in the playlist(filename: youtube_links.txt) to the right of the player.
 * When you click a video in the playlist, it will play that video in the player. Once that video is finished, the next video will play.
 */
const express = require('express');
const fs = require('fs');
const app = express();
const { youtubeRegex, spotifyRegex, all_playlist } = require ('./variables.js');
const yts = require('yt-search');
const ejs = require('ejs');

// Function to get the title of a YouTube video
async function getYouTubeVideoTitle(videoId) {
  const video = await yts({ videoId: videoId });
//   console.log(video);
  return video.title;
}

(async() => {   
    const playlist = await Promise.all(
    fs.readFileSync('all_youtube_links.txt', 'utf8')
    .split('\n')
    .map(async (link) => {
        if (!link) {
        return null;
        }

        const videoId = link.split('v=')[1];
        const title = await getYouTubeVideoTitle(videoId);

        return {
        videoId: videoId,
        title: title
        }
    }));

    // console.log(playlist);

    const playlistHtml = playlist.map((link) => {
        if (link) {          
            return `<li><a href="#" onclick="player.loadVideoById('${link.videoId}')">${link.title}</a></li>`
        }
    }).join('');
    
    const template = fs.readFileSync('player.html', 'utf8');
    const html = ejs.render(template, { playlistHtml: playlistHtml, playlist: playlist });

    app.get('/', (req, res) => {
    res.send(html);
    });

    app.listen(8000, () => {
    console.log('Server listening on port 8000');
    });
})();

