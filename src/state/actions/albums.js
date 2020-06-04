import {
  SET_ALBUMS,
  SET_ALBUM_SEARCH,
  SET_ALBUM_QUERY_UPDATED,
  SET_ALBUMS_CURSOR,
  SET_ALBUMS_HAS_MORE,
  SET_ALBUMS_TOTAL_COUNT,
  SET_ALBUMS_INFINITE_LOADING,
  SET_ALBUM_SORT,
  SET_UPDATING_ALBUM_ERROR,
  SET_UPDATING_ALBUM_LOADING,
} from '../types/actions'
import { GraphQLClient } from 'graphql-request'
import get from 'lodash.get'
import { getAlbums, updateAlbum as updateAlbumMutation } from '../gql'
import { toast } from 'react-toastify'

export const queryAlbums = () => async (dispatch, getState) => {
  dispatch({ type: SET_ALBUMS, payload: [] })

  const {
    albums: { sortValue, searchTerm },
  } = getState()
  const [sort, sortOrder] = sortValue.split(':')
  const {
    session: { token },
  } = getState()
  const client = new GraphQLClient('http://localhost:2017/graphql', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const albumResponse = await client
    .request(getAlbums, {
      sort,
      sortOrder,
      searchTerm,
    })
    .catch(error => {
      const errorType = get(error, 'response.errors[0].message')
      console.error('error ==='.toUpperCase(), error)
      console.error('errorType ==='.toUpperCase(), errorType)
    })

  if (albumResponse) {
    const { album } = albumResponse
    dispatch({ type: SET_ALBUM_QUERY_UPDATED, payload: false })
    dispatch({ type: SET_ALBUMS, payload: album.albums })
    dispatch({ type: SET_ALBUMS_CURSOR, payload: album.cursor })
    dispatch({ type: SET_ALBUMS_HAS_MORE, payload: album.hasMore })
    dispatch({ type: SET_ALBUMS_TOTAL_COUNT, payload: album.totalCount })
  }
}

export const queryNextAlbums = () => async (dispatch, getState) => {
  dispatch({ type: SET_ALBUMS_INFINITE_LOADING, payload: true })
  const {
    albums: { sortValue, searchTerm, cursor, hasMore, albums },
  } = getState()
  const [sort, sortOrder] = sortValue.split(':')

  if (!hasMore) {
    return dispatch({ type: SET_ALBUMS_INFINITE_LOADING, payload: false })
  }

  const {
    session: { token },
  } = getState()

  const client = new GraphQLClient('http://localhost:2017/graphql', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const albumResponse = await client
    .request(getAlbums, {
      sort,
      sortOrder,
      searchTerm,
      after: cursor,
    })
    .catch(error => {
      const errorType = get(error, 'response.errors[0].message')
      console.error('error ==='.toUpperCase(), error)
      console.error('errorType ==='.toUpperCase(), errorType)
      dispatch({ type: SET_ALBUMS_INFINITE_LOADING, payload: false })
    })

  if (albumResponse) {
    const { album } = albumResponse
    let newAlbums = [...albums, ...album.albums]
    newAlbums = newAlbums
      .map(album => album.id)
      .reduce(
        (unique, id) => (unique.includes(id) ? unique : [...unique, id]),
        []
      )
      .map(id => {
        return newAlbums.find(album => id === album.id)
      })
    dispatch({ type: SET_ALBUM_QUERY_UPDATED, payload: false })
    dispatch({ type: SET_ALBUMS, payload: newAlbums })
    dispatch({ type: SET_ALBUMS_CURSOR, payload: album.cursor })
    dispatch({ type: SET_ALBUMS_HAS_MORE, payload: album.hasMore })
    dispatch({ type: SET_ALBUMS_INFINITE_LOADING, payload: false })
  }
}

export const onSearchUpdate = e => dispatch => {
  dispatch({ type: SET_ALBUM_SEARCH, payload: e.target.value })
  dispatch({ type: SET_ALBUM_QUERY_UPDATED, payload: true })
}

export const onSortUpdate = e => dispatch => {
  dispatch({ type: SET_ALBUM_SORT, payload: e.target.value })
  dispatch({ type: SET_ALBUM_QUERY_UPDATED, payload: true })
}

export const updateAlbum = (id, updatedProperties = {}, onSuccess) => async (
  dispatch,
  getState
) => {
  dispatch({ type: SET_UPDATING_ALBUM_ERROR, payload: null })
  dispatch({ type: SET_UPDATING_ALBUM_LOADING, payload: true })
  const {
    session: { token },
  } = getState()
  const client = new GraphQLClient('http://localhost:2017/graphql', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const albumUpdateResponse = await client
    .request(updateAlbumMutation, {
      album: {
        id,
        ...updatedProperties,
      },
    })
    .catch(error => {
      const errorType = get(error, 'response.errors[0].message')
      console.error('error ==='.toUpperCase(), error)
      console.error('errorType ==='.toUpperCase(), errorType)
      dispatch({ type: SET_UPDATING_ALBUM_ERROR, payload: null })
      dispatch({ type: SET_UPDATING_ALBUM_LOADING, payload: false })
    })

  if (albumUpdateResponse) {
    const { updateAlbum } = albumUpdateResponse
    let albums = [...getState().albums.albums]
    albums = albums.map(album =>
      album.id === updateAlbum.id ? updateAlbum : album
    )
    dispatch({ type: SET_ALBUMS, payload: albums })
    dispatch({ type: SET_UPDATING_ALBUM_ERROR, payload: null })
    dispatch({ type: SET_UPDATING_ALBUM_LOADING, payload: false })
    onSuccess()
    console.log('updateAlbum ==='.toUpperCase(), updateAlbum)
    toast.success(
      `Album Updated: ${updateAlbum.name} by ${updateAlbum.artists
        .map(artist => artist.name)
        .join(', ')}`
    )
  }
}
