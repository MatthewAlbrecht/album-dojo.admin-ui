import {
  SET_USERS,
  SET_USER_SEARCH,
  SET_USER_SORT,
  SET_USER_QUERY_UPDATED,
  SET_USERS_CURSOR,
  SET_USERS_HAS_MORE,
  SET_USERS_TOTAL_COUNT,
  SET_USERS_INFINITE_LOADING,
  SET_UPDATING_USER_ERROR,
  SET_UPDATING_USER_LOADING,
} from '../types/actions'

const initialState = {
  users: [],
  sortValue: 'createdAt:ASC',
  sortUpdated: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      console.log('made it to SET_USERS')
      return { ...state, users: action.payload }
    case SET_USER_SEARCH:
      console.log('made it to SET_USER_SEARCH')
      return { ...state, searchTerm: action.payload }
    case SET_USER_QUERY_UPDATED:
      console.log('made it to SET_USER_QUERY_UPDATED')
      return { ...state, queryUpdated: action.payload }
    case SET_USERS_CURSOR:
      console.log('made it to SET_USERS_CURSOR')
      return { ...state, cursor: action.payload }
    case SET_USERS_HAS_MORE:
      console.log('made it to SET_USERS_HAS_MORE')
      return { ...state, hasMore: action.payload }
    case SET_USERS_TOTAL_COUNT:
      console.log('made it to SET_USERS_TOTAL_COUNT')
      return { ...state, totalCount: action.payload }
    case SET_USERS_INFINITE_LOADING:
      console.log('made it to SET_USERS_INFINITE_LOADING')
      return { ...state, isInfiniteLoading: action.payload }
    case SET_UPDATING_USER_ERROR:
      console.log('made it to SET_UPDATING_USER_ERROR')
      return { ...state, updateUserError: action.payload }
    case SET_UPDATING_USER_LOADING:
      console.log('made it to SET_UPDATING_USER_LOADING')
      return { ...state, updateUserLoading: action.payload }
    case SET_USER_SORT:
      console.log('made it to SET_USER_SORT')
      return { ...state, sortValue: action.payload }
    default:
      return state
  }
}
