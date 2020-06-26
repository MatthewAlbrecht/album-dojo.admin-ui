import {
  SET_ACHIEVEMENTS,
  SET_ACHIEVEMENT_SEARCH,
  SET_ACHIEVEMENT_QUERY_UPDATED,
  SET_ACHIEVEMENTS_CURSOR,
  SET_ACHIEVEMENTS_HAS_MORE,
  SET_ACHIEVEMENTS_TOTAL_COUNT,
  SET_ACHIEVEMENTS_INFINITE_LOADING,
  SET_ACHIEVEMENT_SORT,
  SET_UPDATING_ACHIEVEMENT_ERROR,
  SET_UPDATING_ACHIEVEMENT_LOADING,
  SET_CREATE_ACHIEVEMENT_ERROR,
  SET_CREATE_ACHIEVEMENT_LOADING,
  SET_ACHIEVEMENT,
  SET_ACHIEVEMENT_LOADING,
  SET_ACHIEVEMENT_ERROR,
} from '../types/actions'
import { GraphQLClient } from 'graphql-request'
import get from 'lodash.get'
import {
  getAchievement,
  getAchievements,
  updateAchievement as updateAchievementMutation,
  createAchievement as createAchievementMutation,
} from '../gql'
import { toast } from 'react-toastify'

export const queryAchievements = () => async (dispatch, getState) => {
  dispatch({ type: SET_ACHIEVEMENTS, payload: [] })

  const {
    achievements: { sortValue, searchTerm },
  } = getState()
  const [sort, sortOrder] = sortValue.split(':')
  const {
    session: { token },
  } = getState()
  const client = new GraphQLClient('http://localhost:2017/graphql', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const achievementResponse = await client
    .request(getAchievements, {
      sort,
      sortOrder,
      searchTerm,
    })
    .catch(error => {
      const errorType = get(error, 'response.errors[0].message')
      console.error('error ==='.toUpperCase(), error)
      console.error('errorType ==='.toUpperCase(), errorType)
    })

  if (achievementResponse) {
    const { achievement } = achievementResponse
    console.log('achievement QUEWRY ==='.toUpperCase(), achievement)
    dispatch({ type: SET_ACHIEVEMENT_QUERY_UPDATED, payload: false })
    dispatch({ type: SET_ACHIEVEMENTS, payload: achievement.achievements })
    dispatch({ type: SET_ACHIEVEMENTS_CURSOR, payload: achievement.cursor })
    dispatch({ type: SET_ACHIEVEMENTS_HAS_MORE, payload: achievement.hasMore })
    dispatch({
      type: SET_ACHIEVEMENTS_TOTAL_COUNT,
      payload: achievement.totalCount,
    })
  }
}

export const queryNextAchievements = () => async (dispatch, getState) => {
  dispatch({ type: SET_ACHIEVEMENTS_INFINITE_LOADING, payload: true })
  const {
    achievements: { sortValue, searchTerm, cursor, hasMore, achievements },
  } = getState()
  const [sort, sortOrder] = sortValue.split(':')

  if (!hasMore) {
    return dispatch({ type: SET_ACHIEVEMENTS_INFINITE_LOADING, payload: false })
  }

  const {
    session: { token },
  } = getState()

  const client = new GraphQLClient('http://localhost:2017/graphql', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const achievementResponse = await client
    .request(getAchievements, {
      sort,
      sortOrder,
      searchTerm,
      after: cursor,
    })
    .catch(error => {
      const errorType = get(error, 'response.errors[0].message')
      console.error('error ==='.toUpperCase(), error)
      console.error('errorType ==='.toUpperCase(), errorType)
      dispatch({ type: SET_ACHIEVEMENTS_INFINITE_LOADING, payload: false })
    })

  if (achievementResponse) {
    const { achievement } = achievementResponse
    console.log('achievement NEXT QUERY ==='.toUpperCase(), achievement)
    let newAchievements = [...achievements, ...achievement.achievements]
    newAchievements = newAchievements
      .map(achievement => achievement.code)
      .reduce(
        (unique, code) => (unique.includes(code) ? unique : [...unique, code]),
        []
      )
      .map(code => {
        return newAchievements.find(achievement => code === achievement.code)
      })
    dispatch({ type: SET_ACHIEVEMENT_QUERY_UPDATED, payload: false })
    dispatch({ type: SET_ACHIEVEMENTS, payload: newAchievements })
    dispatch({ type: SET_ACHIEVEMENTS_CURSOR, payload: achievement.cursor })
    dispatch({ type: SET_ACHIEVEMENTS_HAS_MORE, payload: achievement.hasMore })
    dispatch({ type: SET_ACHIEVEMENTS_INFINITE_LOADING, payload: false })
  }
}

export const onSearchUpdate = e => dispatch => {
  dispatch({ type: SET_ACHIEVEMENT_SEARCH, payload: e.target.value })
  dispatch({ type: SET_ACHIEVEMENT_QUERY_UPDATED, payload: true })
}

export const onSortUpdate = e => dispatch => {
  dispatch({ type: SET_ACHIEVEMENT_SORT, payload: e.target.value })
  dispatch({ type: SET_ACHIEVEMENT_QUERY_UPDATED, payload: true })
}

export const updateAchievement = (
  code,
  updatedProperties = {},
  onSuccess
) => async (dispatch, getState) => {
  console.log('code ==='.toUpperCase(), code)
  dispatch({ type: SET_UPDATING_ACHIEVEMENT_ERROR, payload: null })
  dispatch({ type: SET_UPDATING_ACHIEVEMENT_LOADING, payload: true })
  const {
    session: { token },
  } = getState()
  const client = new GraphQLClient('http://localhost:2017/graphql', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const updateAchievementResponse = await client
    .request(updateAchievementMutation, {
      achievement: {
        code,
        ...updatedProperties,
      },
    })
    .catch(error => {
      const errorType = get(error, 'response.errors[0].message')
      console.error('error ==='.toUpperCase(), error)
      console.error('errorType ==='.toUpperCase(), errorType)
      dispatch({ type: SET_UPDATING_ACHIEVEMENT_ERROR, payload: null })
      dispatch({ type: SET_UPDATING_ACHIEVEMENT_LOADING, payload: false })
    })

  if (updateAchievementResponse) {
    const { updateAchievement } = updateAchievementResponse
    let achievements = [...getState().achievements.achievements]

    achievements = achievements.map(achievement =>
      achievement.code === updateAchievement.code
        ? updateAchievement
        : achievement
    )

    dispatch({ type: SET_ACHIEVEMENTS, payload: achievements })
    dispatch({ type: SET_UPDATING_ACHIEVEMENT_ERROR, payload: null })
    dispatch({ type: SET_UPDATING_ACHIEVEMENT_LOADING, payload: false })

    if (onSuccess) {
      onSuccess()
    }

    toast.success(`Achievement Updated: ${updateAchievement.name} `)
  }
}

export const createAchievement = (achievement, onSuccess) => async (
  dispatch,
  getState
) => {
  dispatch({ type: SET_CREATE_ACHIEVEMENT_ERROR, payload: null })
  dispatch({ type: SET_CREATE_ACHIEVEMENT_LOADING, payload: true })
  const {
    session: { token },
  } = getState()
  const client = new GraphQLClient('http://localhost:2017/graphql', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const createAchievementResponse = await client
    .request(createAchievementMutation, {
      achievement,
    })
    .catch(error => {
      const errorType = get(error, 'response.errors[0].message')
      console.error('error ==='.toUpperCase(), error)
      console.error('errorType ==='.toUpperCase(), errorType)
      dispatch({ type: SET_CREATE_ACHIEVEMENT_ERROR, payload: null })
      dispatch({ type: SET_CREATE_ACHIEVEMENT_LOADING, payload: false })
    })

  if (createAchievementResponse) {
    const { createAchievement } = createAchievementResponse

    dispatch({ type: SET_CREATE_ACHIEVEMENT_ERROR, payload: null })
    dispatch({ type: SET_CREATE_ACHIEVEMENT_LOADING, payload: false })

    if (onSuccess) {
      onSuccess()
    }

    toast.success(`Achievement Created: ${createAchievement.name}`)
  }
}

export const findAchievement = code => async (dispatch, getState) => {
  dispatch({ type: SET_ACHIEVEMENT, payload: [] })
  dispatch({ type: SET_ACHIEVEMENT_LOADING, payload: true })
  dispatch({ type: SET_ACHIEVEMENT_ERROR, payload: null })

  const {
    session: { token },
  } = getState()
  const client = new GraphQLClient('http://localhost:2017/graphql', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const achievementResponse = await client
    .request(getAchievement, {
      code,
    })
    .catch(error => {
      const errorType = get(error, 'response.errors[0].message')
      console.error('error ==='.toUpperCase(), error)
      console.error('errorType ==='.toUpperCase(), errorType)
      dispatch({ type: SET_ACHIEVEMENT_LOADING, payload: false })
      dispatch({ type: SET_ACHIEVEMENT_ERROR, payload: error })
    })

  if (achievementResponse) {
    const { achievement } = achievementResponse
    dispatch({
      type: SET_ACHIEVEMENT,
      payload: achievement.achievements[0] || {},
    })
    dispatch({ type: SET_ACHIEVEMENT_LOADING, payload: false })
  }
}

export const resetAchievement = () => async dispatch => {
  dispatch({ type: SET_ACHIEVEMENT, payload: {} })
}
