# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

Backend Database tables ideas:

Users table: 
ID: unique, auto increment
Name: name
Username: username
Password: authentication stuff
Token: spotify authentication, null if not authenticated
Spotify_id: can be used for api requests, null if not authenticated/logged in with spotify
Session: can be the id of an active session or null if not in session
Created at: timestamp


Sessions table: 
ID: unique, auto increment
state: active session, inactive
num_users: necessary? maybe limit number of ppl per session
Created at: timestamp 
playback_song: if there is song currently playing
playlist: if there is playlist linked
karaoke_state: tells if in karoake or no
(-should delete sessions after finished or have a history of sessions?)

Follows:
following_user_id: linked to id of the user that follows 
followed_user_id: the person followed, linked to their user id
created_at: timestamp

Music_rec_posts table:
id: unique auto increment
name: name of post
body: songs to recomment, artists, api fetch stuff?
user_id: linked to person who posted the recommendation
img: cover of song/album
created_at: timestamp
state: active post or archived?

Saved_posts table:
post_id: id of saved post
user_id: id of user who saved the post
created_at: timestamp

can basically have this to create a user feed of music recommendations



