const youtubeRegex = /(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/gi;
const spotifyRegex = /(https?:\/\/open.spotify.com\/(track|user|artist|album)\/[a-zA-Z0-9]+(\/playlist\/[a-zA-Z0-9]+|)|spotify:(track|user|artist|album):[a-zA-Z0-9]+(:playlist:[a-zA-Z0-9]+|))/gi;
const all_playlist = 'all_playlist.txt';
const youtube_playlist = 'youtube_links.txt';
const spotify_playlist = 'spotify_links.txt';

module.exports = {
    youtubeRegex, spotifyRegex, all_playlist, youtube_playlist, spotify_playlist
}