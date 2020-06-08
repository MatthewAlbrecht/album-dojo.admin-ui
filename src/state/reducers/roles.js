import {
  SET_ROLES,
  SET_ROLE_SEARCH,
  SET_ROLE_SORT,
  SET_ROLE_QUERY_UPDATED,
  SET_ROLES_CURSOR,
  SET_ROLES_HAS_MORE,
  SET_ROLES_TOTAL_COUNT,
  SET_ROLES_INFINITE_LOADING,
  SET_UPDATING_ROLE_ERROR,
  SET_UPDATING_ROLE_LOADING,
  SET_CREATE_ROLE_ERROR,
  SET_CREATE_ROLE_LOADING,
  LOGOUT_USER,
} from '../types/actions'

const initialState = {
  roles: [],
  sortValue: 'name:ASC',
  sortUpdated: false,
  hasMore: true,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ROLES:
      return { ...state, roles: action.payload }
    case SET_ROLE_SEARCH:
      return { ...state, searchTerm: action.payload }
    case SET_ROLE_QUERY_UPDATED:
      return { ...state, queryUpdated: action.payload }
    case SET_ROLES_CURSOR:
      return { ...state, cursor: action.payload }
    case SET_ROLES_HAS_MORE:
      return { ...state, hasMore: action.payload }
    case SET_ROLES_TOTAL_COUNT:
      return { ...state, totalCount: action.payload }
    case SET_ROLES_INFINITE_LOADING:
      return { ...state, isInfiniteLoading: action.payload }
    case SET_UPDATING_ROLE_ERROR:
      return { ...state, updateRoleError: action.payload }
    case SET_UPDATING_ROLE_LOADING:
      return { ...state, updateRoleLoading: action.payload }
    case SET_CREATE_ROLE_ERROR:
      return { ...state, createRoleError: action.payload }
    case SET_CREATE_ROLE_LOADING:
      return { ...state, createRoleLoading: action.payload }
    case SET_ROLE_SORT:
      return { ...state, sortValue: action.payload }
    case LOGOUT_USER:
      return { ...initialState }
    default:
      return state
  }
}
