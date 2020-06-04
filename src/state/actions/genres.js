import {
  SET_GENRES,
  SET_GENRE_OPTIONS,
  SET_GENRE_OPTIONS_LOADING,
  SET_GENRE_OPTIONS_ERROR,
  SET_GENRE_SEARCH,
  SET_GENRE_QUERY_UPDATED,
  SET_GENRES_CURSOR,
  SET_GENRES_HAS_MORE,
  SET_GENRES_TOTAL_COUNT,
  SET_GENRES_INFINITE_LOADING,
  SET_GENRE_SORT,
} from '../types/actions'
import { GraphQLClient } from 'graphql-request'
import get from 'lodash.get'
import { getGenres } from '../gql'

export const getAllGenres = () => async (dispatch, getState) => {
  dispatch({ type: SET_GENRE_OPTIONS_ERROR, payload: null })
  dispatch({ type: SET_GENRE_OPTIONS_LOADING, payload: true })
  const {
    session: { token },
  } = getState()

  const client = new GraphQLClient('http://localhost:2017/graphql', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const genreResponse = await client
    .request(getGenres, {
      sort: 'name',
      sortOrder: 'ASC',
    })
    .catch(error => {
      dispatch({ type: SET_GENRE_OPTIONS_LOADING, payload: false })
      dispatch({ type: SET_GENRE_OPTIONS_ERROR, payload: error })
      const errorType = get(error, 'response.errors[0].message')
      console.log('error ==='.toUpperCase(), error)
      console.log('errorType ==='.toUpperCase(), errorType)
    })

  if (genreResponse) {
    const {
      genre: { genres },
    } = genreResponse
    console.log('genres ==='.toUpperCase(), genres)
    const genreOptions = genres.map(genre => ({
      label: genre.name,
      value: genre.id,
    }))
    dispatch({ type: SET_GENRE_OPTIONS, payload: genreOptions })
    dispatch({ type: SET_GENRE_OPTIONS_LOADING, payload: false })
  }
}

export const queryGenres = () => async (dispatch, getState) => {
  dispatch({ type: SET_GENRES, payload: [] })

  const {
    genres: { sortValue, searchTerm },
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

  const genreResponse = await client
    .request(getGenres, {
      sort,
      sortOrder,
      searchTerm,
    })
    .catch(error => {
      const errorType = get(error, 'response.errors[0].message')
      console.log('error ==='.toUpperCase(), error)
      console.log('errorType ==='.toUpperCase(), errorType)
    })

  if (genreResponse) {
    const { genre } = genreResponse
    dispatch({ type: SET_GENRE_QUERY_UPDATED, payload: false })
    dispatch({ type: SET_GENRES, payload: genre.genres })
    dispatch({ type: SET_GENRES_CURSOR, payload: genre.cursor })
    dispatch({ type: SET_GENRES_HAS_MORE, payload: genre.hasMore })
    dispatch({ type: SET_GENRES_TOTAL_COUNT, payload: genre.totalCount })
  }
}

export const queryNextGenres = () => async (dispatch, getState) => {
  dispatch({ type: SET_GENRES_INFINITE_LOADING, payload: true })
  const {
    genres: { sortValue, searchTerm, cursor, hasMore, genres },
  } = getState()
  const [sort, sortOrder] = sortValue.split(':')

  if (!hasMore) {
    return dispatch({ type: SET_GENRES_INFINITE_LOADING, payload: false })
  }

  const {
    session: { token },
  } = getState()

  const client = new GraphQLClient('http://localhost:2017/graphql', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const genreResponse = await client
    .request(getGenres, {
      sort,
      sortOrder,
      searchTerm,
      after: cursor,
    })
    .catch(error => {
      const errorType = get(error, 'response.errors[0].message')
      console.log('error ==='.toUpperCase(), error)
      console.log('errorType ==='.toUpperCase(), errorType)
      dispatch({ type: SET_GENRES_INFINITE_LOADING, payload: false })
    })

  if (genreResponse) {
    const { genre } = genreResponse
    let newGenres = [...genres, ...genre.genres]
    newGenres = newGenres
      .map(genre => genre.id)
      .reduce(
        (unique, id) => (unique.includes(id) ? unique : [...unique, id]),
        []
      )
      .map(id => {
        return newGenres.find(genre => id === genre.id)
      })
    dispatch({ type: SET_GENRE_QUERY_UPDATED, payload: false })
    dispatch({ type: SET_GENRES, payload: newGenres })
    dispatch({ type: SET_GENRES_CURSOR, payload: genre.cursor })
    dispatch({ type: SET_GENRES_HAS_MORE, payload: genre.hasMore })
    dispatch({ type: SET_GENRES_INFINITE_LOADING, payload: false })
  }
}

export const onSearchUpdate = e => dispatch => {
  dispatch({ type: SET_GENRE_SEARCH, payload: e.target.value })
  dispatch({ type: SET_GENRE_QUERY_UPDATED, payload: true })
}

export const onSortUpdate = e => dispatch => {
  dispatch({ type: SET_GENRE_SORT, payload: e.target.value })
  dispatch({ type: SET_GENRE_QUERY_UPDATED, payload: true })
}
