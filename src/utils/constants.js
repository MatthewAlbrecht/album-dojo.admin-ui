export const SPOTIFY_QS = {
  client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
  response_type: 'code',
  redirect_uri: 'http://localhost:1333/',
  scope:
    'user-read-email user-read-private playlist-modify-public user-top-read playlist-read-private user-read-recently-played user-library-read',
}
