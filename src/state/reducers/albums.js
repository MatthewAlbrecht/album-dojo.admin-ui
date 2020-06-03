import {
  SET_GENRES,
  SET_GENRE_SEARCH,
  SET_GENRE_SORT,
  SET_GENRE_QUERY_UPDATED,
  SET_GENRES_CURSOR,
  SET_GENRES_HAS_MORE,
  SET_GENRES_TOTAL_COUNT,
  SET_GENRES_INFINITE_LOADING,
} from '../types/actions'

const initialState = {
  genres: [],
  sortValue: 'createdAt:DESC',
  sortUpdated: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
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
