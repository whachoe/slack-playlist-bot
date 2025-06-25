// Test spotifyToYoutube module

const spotifyToYT = require('./spotifyToYoutube.js');
const youtubeToSpotify = require('./youtubeToSpotify.js');

// spotifyToYT.spotifyToYoutube('https://open.spotify.com/track/2Ht1gsebaD2W5LWAZvYoPG?si=beff9bc0122343b8').then(yt => {
//     console.log("youtube url: ", yt);    
// });

youtubeToSpotify.youtubeToSpotify('https://www.youtube.com/watch?v=XA0JKOhqOTc').then(sp => {
    console.log("spotify url: ", sp);
});