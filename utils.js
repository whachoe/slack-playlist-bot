function isSpotifyUrl(url) {
  const spotifyTrackRegex = /.*spotify.com\/track.*/;
  return spotifyTrackRegex.test(url);
}

function isYoutubeUrl(url) {

  return youtubeRegex.test(url);
}

exports = {
  isSpotifyUrl, isYoutubeUrl
}