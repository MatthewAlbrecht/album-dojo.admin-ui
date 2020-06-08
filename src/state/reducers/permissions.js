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
} from '../types/actions'

const initialState = {
  permissions: [],
  sortValue: 'name:ASC',
  sortUpdated: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PERMISSIONS:
      console.log('made it to SET_PERMISSIONS')
      return { ...state, permissions: action.payload }
    case SET_PERMISSION_SEARCH:
      console.log('made it to SET_PERMISSION_SEARCH')
      return { ...state, searchTerm: action.payload }
    case SET_PERMISSION_QUERY_UPDATED:
      console.log('made it to SET_PERMISSION_QUERY_UPDATED')
      return { ...state, queryUpdated: action.payload }
    case SET_PERMISSIONS_CURSOR:
      console.log('made it to SET_PERMISSIONS_CURSOR')
      return { ...state, cursor: action.payload }
    case SET_PERMISSIONS_HAS_MORE:
      console.log('made it to SET_PERMISSIONS_HAS_MORE')
      return { ...state, hasMore: action.payload }
    case SET_PERMISSIONS_TOTAL_COUNT:
      console.log('made it to SET_PERMISSIONS_TOTAL_COUNT')
      return { ...state, totalCount: action.payload }
    case SET_PERMISSIONS_INFINITE_LOADING:
      console.log('made it to SET_PERMISSIONS_INFINITE_LOADING')
      return { ...state, isInfiniteLoading: action.payload }
    case SET_UPDATING_PERMISSION_ERROR:
      console.log('made it to SET_UPDATING_PERMISSION_ERROR')
      return { ...state, updatePermissionError: action.payload }
    case SET_UPDATING_PERMISSION_LOADING:
      console.log('made it to SET_UPDATING_PERMISSION_LOADING')
      return { ...state, updatePermissionLoading: action.payload }
    case SET_PERMISSION_SORT:
      console.log('made it to SET_PERMISSION_SORT')
      return { ...state, sortValue: action.payload }
    default:
      return state
  }
}
