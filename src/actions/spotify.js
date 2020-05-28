import {
  ADD_ALBUM_BY_ID,
  ADD_ALBUM_BY_ID_ERROR,
  ADD_ALBUM_BY_ID_LOADING,
  ADD_ALBUMS_BY_PLAYLIST,
  ADD_ALBUMS_BY_PLAYLIST_ERROR,
  ADD_ALBUMS_BY_PLAYLIST_LOADING,
} from 'types/actions'
import { getNewTokens } from 'actions/helpers'
import { GraphQLClient } from 'graphql-request'
import get from 'lodash.get'
import { addAlbumByIdMutation, addAlbumsByPlaylistMutation } from 'gql'

export const addAlbumBySpotifyId = id => async (dispatch, getState) => {
  const { session } = getState()

  let newTokens
  try {
    newTokens = await getNewTokens(session, dispatch)
  } catch (error) {
    console.log('error ==='.toUpperCase(), error)
  }

  const { newApplicationAccessToken, newSpotifyAccessToken } = newTokens

  const client = new GraphQLClient('http://localhost:2017/graphql', {
    headers: {
      Authorization: `Bearer ${newApplicationAccessToken}`,
    },
  })

  dispatch({ type: ADD_ALBUM_BY_ID_ERROR, payload: null })
  dispatch({ type: ADD_ALBUM_BY_ID_LOADING, payload: true })

  client
    .request(addAlbumByIdMutation, {
      album: {
        spotifyId: id,
        spotifyAccessToken: newSpotifyAccessToken,
      },
    })
    .then(({ createAlbumById: album }) => {
      console.log('album ==='.toUpperCase(), album)
      dispatch({ type: ADD_ALBUM_BY_ID, payload: album })
      dispatch({ type: ADD_ALBUM_BY_ID_LOADING, payload: false })
    })
    .catch(error => {
      let errorType = get(error, 'response.errors[0].message')
      console.log('errorType ==='.toUpperCase(), errorType)
      if (errorType && !errorType.indexOf('SequelizeUniqueConstraintError')) {
        dispatch({
          type: ADD_ALBUM_BY_ID_ERROR,
          payload: 'Album Already Exists',
        })
      } else {
        dispatch({
          type: ADD_ALBUM_BY_ID_ERROR,
          payload: 'An error occurred when adding the album',
        })
      }
      dispatch({ type: ADD_ALBUM_BY_ID_LOADING, payload: false })
    })
}

export const addAlbumsByPlaylistId = id => async (dispatch, getState) => {
  console.log('HERE', id)
  const { session } = getState()

  let newTokens
  try {
    newTokens = await getNewTokens(session, dispatch)
  } catch (error) {
    console.log('error ==='.toUpperCase(), error)
  }

  const { newApplicationAccessToken, newSpotifyAccessToken } = newTokens

  const client = new GraphQLClient('http://localhost:2017/graphql', {
    headers: {
      Authorization: `Bearer ${newApplicationAccessToken}`,
    },
  })

  dispatch({ type: ADD_ALBUMS_BY_PLAYLIST_ERROR, payload: null })
  dispatch({ type: ADD_ALBUMS_BY_PLAYLIST_LOADING, payload: true })
  dispatch({ type: ADD_ALBUMS_BY_PLAYLIST, payload: null })

  client
    .request(addAlbumsByPlaylistMutation, {
      album: {
        spotifyPlaylistId: id,
        spotifyAccessToken: newSpotifyAccessToken,
      },
    })
    .then(({ createAlbumsByPlaylist: albums }) => {
      console.log('albums ==='.toUpperCase(), albums)
      dispatch({ type: ADD_ALBUMS_BY_PLAYLIST, payload: albums })
      dispatch({ type: ADD_ALBUMS_BY_PLAYLIST_LOADING, payload: false })
    })
    .catch(error => {
      let errorType = get(error, 'response.errors[0].message')
      console.log('error ==='.toUpperCase(), error)
      console.log('errorType ==='.toUpperCase(), errorType)
      dispatch({
        type: ADD_ALBUMS_BY_PLAYLIST_ERROR,
        payload: 'An error occurred when adding the album',
      })
      dispatch({ type: ADD_ALBUMS_BY_PLAYLIST_LOADING, payload: false })
    })
}
