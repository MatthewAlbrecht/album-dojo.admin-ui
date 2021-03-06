import {
  SET_ALBUMS,
  SET_ALBUM_SEARCH,
  SET_ALBUM_SORT,
  SET_ALBUM_QUERY_UPDATED,
  SET_ALBUMS_CURSOR,
  SET_ALBUMS_HAS_MORE,
  SET_ALBUMS_TOTAL_COUNT,
  SET_ALBUMS_INFINITE_LOADING,
  SET_UPDATING_ALBUM_ERROR,
  SET_UPDATING_ALBUM_LOADING,
  SET_PRIMARY_DUPLICATE,
  SET_DUPLICATES,
  SET_ALBUM_SHOW_DUPLICATES,
  SET_ALBUM_SHOW_INACTIVE,
  LOGOUT_USER,
  SET_ALBUM,
  SET_ALBUM_LOADING,
  SET_ALBUM_ERROR,
} from '../types/actions'

const initialState = {
  album: {},
  albums: [],
  sortValue: 'createdAt:DESC',
  sortUpdated: false,
  duplicates: [],
  showDuplicates: false,
  showInactive: false,
  hasMore: true,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ALBUMS:
      return { ...state, albums: action.payload }
    case SET_ALBUM_SEARCH:
      return { ...state, searchTerm: action.payload }
    case SET_ALBUM_QUERY_UPDATED:
      return { ...state, queryUpdated: action.payload }
    case SET_ALBUMS_CURSOR:
      return { ...state, cursor: action.payload }
    case SET_ALBUMS_HAS_MORE:
      return { ...state, hasMore: action.payload }
    case SET_ALBUMS_TOTAL_COUNT:
      return { ...state, totalCount: action.payload }
    case SET_ALBUMS_INFINITE_LOADING:
      return { ...state, isInfiniteLoading: action.payload }
    case SET_UPDATING_ALBUM_ERROR:
      return { ...state, updateAlbumError: action.payload }
    case SET_UPDATING_ALBUM_LOADING:
      return { ...state, updateAlbumLoading: action.payload }
    case SET_PRIMARY_DUPLICATE:
      return { ...state, primaryDuplicate: action.payload }
    case SET_DUPLICATES:
      return { ...state, duplicates: action.payload }
    case SET_ALBUM_SHOW_DUPLICATES:
      return { ...state, showDuplicates: action.payload }
    case SET_ALBUM_SHOW_INACTIVE:
      return { ...state, showInactive: action.payload }
    case SET_ALBUM_SORT:
      return { ...state, sortValue: action.payload }
    case LOGOUT_USER:
      return { ...initialState }
    case SET_ALBUM:
      return { ...state, album: action.payload }
    case SET_ALBUM_LOADING:
      return { ...state, albumLoading: action.payload }
    case SET_ALBUM_ERROR:
      return { ...state, albumError: action.payload }
    default:
      return state
  }
}
