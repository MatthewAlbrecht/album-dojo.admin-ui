import { SET_TOKEN, SET_SPOTIFY_TOKEN } from 'types/actions'

export const getNewTokens = async (session, dispatch) => {
  console.log('session ==='.toUpperCase(), session)
  let refreshResponse
  try {
    refreshResponse = await refreshRequest(session)
    refreshResponse = await refreshResponse.json()
  } catch (error) {
    return error
  }

  const {
    applicationAccessToken: newApplicationAccessToken,
    spotifyAccessToken: newSpotifyAccessToken,
  } = refreshResponse

  dispatch({
    type: SET_TOKEN,
    payload: newApplicationAccessToken,
  })
  dispatch({
    type: SET_SPOTIFY_TOKEN,
    payload: newSpotifyAccessToken,
  })

  return {
    newApplicationAccessToken,
    newSpotifyAccessToken,
  }
}

const refreshRequest = session =>
  fetch(`http://localhost:2017/api/spotifyRefresh`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${session.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      spotifyAccessToken: session.spotifyAccessToken,
      userId: session.currentUser.id,
    }),
  })
