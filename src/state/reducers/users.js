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
  SET_CREATE_USER_ERROR,
  SET_CREATE_USER_LOADING,
  LOGOUT_USER,
  SET_USER,
  SET_USER_LOADING,
  SET_USER_ERROR,
} from '../types/actions'

const initialState = {
  user: {},
  users: [],
  sortValue: 'createdAt:ASC',
  sortUpdated: false,
  hasMore: true,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return { ...state, users: action.payload }
    case SET_USER_SEARCH:
      return { ...state, searchTerm: action.payload }
    case SET_USER_QUERY_UPDATED:
      return { ...state, queryUpdated: action.payload }
    case SET_USERS_CURSOR:
      return { ...state, cursor: action.payload }
    case SET_USERS_HAS_MORE:
      return { ...state, hasMore: action.payload }
    case SET_USERS_TOTAL_COUNT:
      return { ...state, totalCount: action.payload }
    case SET_USERS_INFINITE_LOADING:
      return { ...state, isInfiniteLoading: action.payload }
    case SET_UPDATING_USER_ERROR:
      return { ...state, updateUserError: action.payload }
    case SET_UPDATING_USER_LOADING:
      return { ...state, updateUserLoading: action.payload }
    case SET_CREATE_USER_ERROR:
      return { ...state, createUserError: action.payload }
    case SET_CREATE_USER_LOADING:
      return { ...state, createUserLoading: action.payload }
    case SET_USER_SORT:
      return { ...state, sortValue: action.payload }
    case LOGOUT_USER:
      return { ...initialState }
    case SET_USER:
      return { ...state, user: action.payload }
    case SET_USER_LOADING:
      return { ...state, userLoading: action.payload }
    case SET_USER_ERROR:
      return { ...state, userError: action.payload }
    default:
      return state
  }
}
