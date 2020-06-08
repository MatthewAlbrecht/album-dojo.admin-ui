import {
  SET_GENRE_OPTIONS,
  SET_GENRE_OPTIONS_ERROR,
  SET_GENRE_OPTIONS_LOADING,
  SET_GENRES,
  SET_GENRE_SEARCH,
  SET_GENRE_SORT,
  SET_GENRE_QUERY_UPDATED,
  SET_GENRES_CURSOR,
  SET_GENRES_HAS_MORE,
  SET_GENRES_TOTAL_COUNT,
  SET_GENRES_INFINITE_LOADING,
  SET_UPDATING_GENRE_ERROR,
  SET_UPDATING_GENRE_LOADING,
} from '../types/actions'

const initialState = {
  genreOptions: [],
  genres: [],
  sortValue: 'name:ASC',
  sortUpdated: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GENRE_OPTIONS:
      console.log('made it to SET_GENRE_OPTIONS')
      return { ...state, genreOptions: action.payload }
    case SET_GENRE_OPTIONS_ERROR:
      console.log('made it to SET_GENRE_OPTIONS_ERROR')
      return { ...state, genreOptionsError: action.payload }
    case SET_GENRE_OPTIONS_LOADING:
      console.log('made it to SET_GENRE_OPTIONS_LOADING')
      return { ...state, genreOptionsLoading: action.payload }
    case SET_GENRES:
      console.log('made it to SET_GENRES')
      return { ...state, genres: action.payload }
    case SET_GENRE_SEARCH:
      console.log('made it to SET_GENRE_SEARCH')
      return { ...state, searchTerm: action.payload }
    case SET_GENRE_QUERY_UPDATED:
      console.log('made it to SET_GENRE_QUERY_UPDATED')
      return { ...state, queryUpdated: action.payload }
    case SET_GENRES_CURSOR:
      console.log('made it to SET_GENRES_CURSOR')
      return { ...state, cursor: action.payload }
    case SET_GENRES_HAS_MORE:
      console.log('made it to SET_GENRES_HAS_MORE')
      return { ...state, hasMore: action.payload }
    case SET_GENRES_TOTAL_COUNT:
      console.log('made it to SET_GENRES_TOTAL_COUNT')
      return { ...state, totalCount: action.payload }
    case SET_GENRES_INFINITE_LOADING:
      console.log('made it to SET_GENRES_INFINITE_LOADING')
      return { ...state, isInfiniteLoading: action.payload }
    case SET_UPDATING_GENRE_ERROR:
      console.log('made it to SET_UPDATING_GENRE_ERROR')
      return { ...state, updateGenreError: action.payload }
    case SET_UPDATING_GENRE_LOADING:
      console.log('made it to SET_UPDATING_GENRE_LOADING')
      return { ...state, updateGenreLoading: action.payload }
    case SET_GENRE_SORT:
      console.log('made it to SET_GENRE_SORT')
      return {
        ...state,
        sortValue: action.payload,
      }
    default:
      return state
  }
}
