const spotifyToYT = require('./spotifyToYoutube.js');

console.log('Translating...');
spotifyToYT.translateFile('youtube_links.txt', 'all_youtube_links.txt');