import {
  SET_PERMISSIONS,
  SET_PERMISSION_SEARCH,
  SET_PERMISSION_SORT,
  SET_PERMISSION_QUERY_UPDATED,
  SET_PERMISSIONS_CURSOR,
  SET_PERMISSIONS_HAS_MORE,
  SET_PERMISSIONS_TOTAL_COUNT,
  SET_PERMISSIONS_INFINITE_LOADING,
  SET_UPDATING_PERMISSION_ERROR,
  SET_UPDATING_PERMISSION_LOADING,
  SET_CREATE_PERMISSION_ERROR,
  SET_CREATE_PERMISSION_LOADING,
  LOGOUT_USER,
} from '../types/actions'

const initialState = {
  permissions: [],
  sortValue: 'name:ASC',
  sortUpdated: false,
  hasMore: true,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PERMISSIONS:
      return { ...state, permissions: action.payload }
    case SET_PERMISSION_SEARCH:
      return { ...state, searchTerm: action.payload }
    case SET_PERMISSION_QUERY_UPDATED:
      return { ...state, queryUpdated: action.payload }
    case SET_PERMISSIONS_CURSOR:
      return { ...state, cursor: action.payload }
    case SET_PERMISSIONS_HAS_MORE:
      return { ...state, hasMore: action.payload }
    case SET_PERMISSIONS_TOTAL_COUNT:
      return { ...state, totalCount: action.payload }
    case SET_PERMISSIONS_INFINITE_LOADING:
      return { ...state, isInfiniteLoading: action.payload }
    case SET_UPDATING_PERMISSION_ERROR:
      return { ...state, updatePermissionError: action.payload }
    case SET_UPDATING_PERMISSION_LOADING:
      return { ...state, updatePermissionLoading: action.payload }
    case SET_CREATE_PERMISSION_ERROR:
      return { ...state, createAchievementError: action.payload }
    case SET_CREATE_PERMISSION_LOADING:
      return { ...state, createAchievementLoading: action.payload }

    case SET_PERMISSION_SORT:
      return { ...state, sortValue: action.payload }
    case LOGOUT_USER:
      return { ...initialState }
    default:
      return state
  }
}
