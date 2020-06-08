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
} from '../types/actions'

const initialState = {
  actions: [],
  sortValue: 'code:ASC',
  sortUpdated: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIONS:
      console.log('made it to SET_ACTIONS')
      return { ...state, actions: action.payload }
    case SET_ACTION_SEARCH:
      console.log('made it to SET_ACTION_SEARCH')
      return { ...state, searchTerm: action.payload }
    case SET_ACTION_QUERY_UPDATED:
      console.log('made it to SET_ACTION_QUERY_UPDATED')
      return { ...state, queryUpdated: action.payload }
    case SET_ACTIONS_CURSOR:
      console.log('made it to SET_ACTIONS_CURSOR')
      return { ...state, cursor: action.payload }
    case SET_ACTIONS_HAS_MORE:
      console.log('made it to SET_ACTIONS_HAS_MORE')
      return { ...state, hasMore: action.payload }
    case SET_ACTIONS_TOTAL_COUNT:
      console.log('made it to SET_ACTIONS_TOTAL_COUNT')
      return { ...state, totalCount: action.payload }
    case SET_ACTIONS_INFINITE_LOADING:
      console.log('made it to SET_ACTIONS_INFINITE_LOADING')
      return { ...state, isInfiniteLoading: action.payload }
    case SET_UPDATING_ACTION_ERROR:
      console.log('made it to SET_UPDATING_ACTION_ERROR')
      return { ...state, updateActionError: action.payload }
    case SET_UPDATING_ACTION_LOADING:
      console.log('made it to SET_UPDATING_ACTION_LOADING')
      return { ...state, updateActionLoading: action.payload }
    case SET_ACTION_SORT:
      console.log('made it to SET_ACTION_SORT')
      return { ...state, sortValue: action.payload }
    default:
      return state
  }
}
