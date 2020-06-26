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
  SET_PRIMARY_DUPLICATE,
  SET_DUPLICATES,
  SET_ALBUM_SHOW_DUPLICATES,
  SET_ALBUM_SHOW_INACTIVE,
  SET_ALBUM,
  SET_ALBUM_LOADING,
  SET_ALBUM_ERROR,
} from '../types/actions'
import { GraphQLClient } from 'graphql-request'
import get from 'lodash.get'
import { getAlbum, getAlbums, updateAlbum as updateAlbumMutation } from '../gql'
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

export const onShowDuplicatesUpdate = e => dispatch => {
  dispatch({ type: SET_ALBUM_SHOW_DUPLICATES, payload: e.target.checked })
  dispatch({ type: SET_ALBUM_QUERY_UPDATED, payload: true })
}

export const onShowInactiveUpdate = e => dispatch => {
  dispatch({ type: SET_ALBUM_SHOW_INACTIVE, payload: e.target.checked })
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

  const updateAlbumResponse = await client
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

  if (updateAlbumResponse) {
    const { updateAlbum } = updateAlbumResponse
    let albums = [...getState().albums.albums]

    albums = albums.map(album =>
      album.id === updateAlbum.id ? updateAlbum : album
    )

    dispatch({ type: SET_ALBUMS, payload: albums })
    dispatch({ type: SET_UPDATING_ALBUM_ERROR, payload: null })
    dispatch({ type: SET_UPDATING_ALBUM_LOADING, payload: false })

    if (onSuccess) {
      onSuccess()
    }

    toast.success(
      `Album Updated: ${updateAlbum.name} by ${updateAlbum.artists
        .map(artist => artist.name)
        .join(', ')}`
    )
  }
}

export const setPrimaryDuplicate = id => dispatch => {
  dispatch({ type: SET_PRIMARY_DUPLICATE, payload: id })
}

export const resetDuplicateProperties = removeDuplicates => (
  dispatch,
  getState
) => {
  const { albums, duplicates, showDuplicates } = getState().albums
  if (removeDuplicates && !showDuplicates) {
    const newAlbums = [
      ...albums.filter(album => !duplicates.includes(album.id)),
    ]
    dispatch({ type: SET_ALBUMS, payload: newAlbums })
  }
  dispatch({ type: SET_PRIMARY_DUPLICATE, payload: null })
  dispatch({ type: SET_DUPLICATES, payload: [] })
}

export const setDuplicate = id => (dispatch, getState) => {
  let { duplicates, primaryDuplicate } = getState().albums
  if (primaryDuplicate === id) {
    return
  }

  duplicates = [...duplicates]
  if (duplicates.includes(id)) {
    duplicates.splice(duplicates.indexOf(id), 1)
  } else {
    duplicates.push(id)
  }
  dispatch({ type: SET_DUPLICATES, payload: duplicates })
}

export const findAlbum = id => async (dispatch, getState) => {
  dispatch({ type: SET_ALBUM, payload: [] })
  dispatch({ type: SET_ALBUM_LOADING, payload: true })
  dispatch({ type: SET_ALBUM_ERROR, payload: null })

  const {
    session: { token },
  } = getState()
  const client = new GraphQLClient('http://localhost:2017/graphql', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const albumResponse = await client
    .request(getAlbum, {
      id,
    })
    .catch(error => {
      const errorType = get(error, 'response.errors[0].message')
      console.error('error ==='.toUpperCase(), error)
      console.error('errorType ==='.toUpperCase(), errorType)
      dispatch({ type: SET_ALBUM_LOADING, payload: false })
      dispatch({ type: SET_ALBUM_ERROR, payload: error })
    })

  if (albumResponse) {
    const { album } = albumResponse
    dispatch({
      type: SET_ALBUM,
      payload: album.albums[0] || {},
    })
    dispatch({ type: SET_ALBUM_LOADING, payload: false })
  }
}

export const resetAlbum = () => async dispatch => {
  dispatch({ type: SET_ALBUM, payload: {} })
}
