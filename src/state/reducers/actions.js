import {
  SET_ACTIONS,
  SET_ACTION_SEARCH,
  SET_ACTION_SORT,
  SET_ACTION_QUERY_UPDATED,
  SET_ACTIONS_CURSOR,
  SET_ACTIONS_HAS_MORE,
  SET_ACTIONS_TOTAL_COUNT,
  SET_ACTIONS_INFINITE_LOADING,
  SET_UPDATING_ACTION_ERROR,
  SET_UPDATING_ACTION_LOADING,
  SET_CREATE_ACTION_ERROR,
  SET_CREATE_ACTION_LOADING,
  LOGOUT_USER,
  SET_ACTION,
  SET_ACTION_LOADING,
  SET_ACTION_ERROR,
} from '../types/actions'

const initialState = {
  action: {},
  actions: [],
  sortValue: 'code:ASC',
  sortUpdated: false,
  hasMore: true,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIONS:
      return { ...state, actions: action.payload }
    case SET_ACTION_SEARCH:
      return { ...state, searchTerm: action.payload }
    case SET_ACTION_QUERY_UPDATED:
      return { ...state, queryUpdated: action.payload }
    case SET_ACTIONS_CURSOR:
      return { ...state, cursor: action.payload }
    case SET_ACTIONS_HAS_MORE:
      return { ...state, hasMore: action.payload }
    case SET_ACTIONS_TOTAL_COUNT:
      return { ...state, totalCount: action.payload }
    case SET_ACTIONS_INFINITE_LOADING:
      return { ...state, isInfiniteLoading: action.payload }
    case SET_UPDATING_ACTION_ERROR:
      return { ...state, updateActionError: action.payload }
    case SET_UPDATING_ACTION_LOADING:
      return { ...state, updateActionLoading: action.payload }
    case SET_CREATE_ACTION_ERROR:
      return { ...state, createActionError: action.payload }
    case SET_CREATE_ACTION_LOADING:
      return { ...state, createActionLoading: action.payload }
    case SET_ACTION_SORT:
      return { ...state, sortValue: action.payload }
    case SET_ACTION:
      return { ...state, action: action.payload }
    case SET_ACTION_LOADING:
      return { ...state, actionLoading: action.payload }
    case SET_ACTION_ERROR:
      return { ...state, actionError: action.payload }
    case LOGOUT_USER:
      return { ...initialState }
    default:
      return state
  }
}
