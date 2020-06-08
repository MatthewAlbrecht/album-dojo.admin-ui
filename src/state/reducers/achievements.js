import {
  SET_ACHIEVEMENTS,
  SET_ACHIEVEMENT_SEARCH,
  SET_ACHIEVEMENT_SORT,
  SET_ACHIEVEMENT_QUERY_UPDATED,
  SET_ACHIEVEMENTS_CURSOR,
  SET_ACHIEVEMENTS_HAS_MORE,
  SET_ACHIEVEMENTS_TOTAL_COUNT,
  SET_ACHIEVEMENTS_INFINITE_LOADING,
  SET_UPDATING_ACHIEVEMENT_ERROR,
  SET_UPDATING_ACHIEVEMENT_LOADING,
  SET_CREATE_ACHIEVEMENT_ERROR,
  SET_CREATE_ACHIEVEMENT_LOADING,
} from '../types/actions'

const initialState = {
  achievements: [],
  sortValue: 'code:ASC',
  sortUpdated: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ACHIEVEMENTS:
      console.log('made it to SET_ACHIEVEMENTS')
      return { ...state, achievements: action.payload }
    case SET_ACHIEVEMENT_SEARCH:
      console.log('made it to SET_ACHIEVEMENT_SEARCH')
      return { ...state, searchTerm: action.payload }
    case SET_ACHIEVEMENT_QUERY_UPDATED:
      console.log('made it to SET_ACHIEVEMENT_QUERY_UPDATED')
      return { ...state, queryUpdated: action.payload }
    case SET_ACHIEVEMENTS_CURSOR:
      console.log('made it to SET_ACHIEVEMENTS_CURSOR')
      return { ...state, cursor: action.payload }
    case SET_ACHIEVEMENTS_HAS_MORE:
      console.log('made it to SET_ACHIEVEMENTS_HAS_MORE')
      return { ...state, hasMore: action.payload }
    case SET_ACHIEVEMENTS_TOTAL_COUNT:
      console.log('made it to SET_ACHIEVEMENTS_TOTAL_COUNT')
      return { ...state, totalCount: action.payload }
    case SET_ACHIEVEMENTS_INFINITE_LOADING:
      console.log('made it to SET_ACHIEVEMENTS_INFINITE_LOADING')
      return { ...state, isInfiniteLoading: action.payload }
    case SET_UPDATING_ACHIEVEMENT_ERROR:
      console.log('made it to SET_UPDATING_ACHIEVEMENT_ERROR')
      return { ...state, updateAchievementError: action.payload }
    case SET_UPDATING_ACHIEVEMENT_LOADING:
      console.log('made it to SET_UPDATING_ACHIEVEMENT_LOADING')
      return { ...state, updateAchievementLoading: action.payload }
    case SET_CREATE_ACHIEVEMENT_ERROR:
      console.log('made it to SET_CREATE_ACHIEVEMENT_ERROR')
      return { ...state, createAchievementError: action.payload }
    case SET_CREATE_ACHIEVEMENT_LOADING:
      console.log('made it to SET_CREATE_ACHIEVEMENT_LOADING')
      return { ...state, createAchievementLoading: action.payload }
    case SET_ACHIEVEMENT_SORT:
      console.log('made it to SET_ACHIEVEMENT_SORT')
      return { ...state, sortValue: action.payload }
    default:
      return state
  }
}
