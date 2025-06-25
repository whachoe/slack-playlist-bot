# Playlist Bot

### Features
- Slack Bot listens for links to Spotify and Youtube in a channel
- Saves links in a spofify playlist
- Saves links in a youtube playlist
- Web-based player for the youtube playlist
- Import all old messages in a channel

### Installation

#### 1. Install dependencies
```
npm install
```

#### 2. Setup environment variables
Copy `.env-example` to `.env` and fill in the variables. You'll have to make a [Spotify App](https://developer.spotify.com/dashboard/create) and [Slack App](https://api.slack.com/apps).

#### 3. Run Bot and Express Web app
```
./run.sh
```

#### 4. Invite Slack Bot to your channel