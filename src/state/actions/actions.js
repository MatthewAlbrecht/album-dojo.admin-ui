import {
  SET_ACTIONS,
  SET_ACTION_SEARCH,
  SET_ACTION_QUERY_UPDATED,
  SET_ACTIONS_CURSOR,
  SET_ACTIONS_HAS_MORE,
  SET_ACTIONS_TOTAL_COUNT,
  SET_ACTIONS_INFINITE_LOADING,
  SET_ACTION_SORT,
  SET_UPDATING_ACTION_ERROR,
  SET_UPDATING_ACTION_LOADING,
  SET_CREATE_ACTION_ERROR,
  SET_CREATE_ACTION_LOADING,
} from '../types/actions'
import { GraphQLClient } from 'graphql-request'
import get from 'lodash.get'
import {
  getActions,
  updateAction as updateActionMutation,
  createAction as createActionMutation,
} from '../gql'
import { toast } from 'react-toastify'

export const queryActions = () => async (dispatch, getState) => {
  dispatch({ type: SET_ACTIONS, payload: [] })

  const {
    actions: { sortValue, searchTerm },
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

  const actionResponse = await client
    .request(getActions, {
      sort,
      sortOrder,
      searchTerm,
    })
    .catch(error => {
      const errorType = get(error, 'response.errors[0].message')
      console.error('error ==='.toUpperCase(), error)
      console.error('errorType ==='.toUpperCase(), errorType)
    })

  if (actionResponse) {
    const { action } = actionResponse
    dispatch({ type: SET_ACTION_QUERY_UPDATED, payload: false })
    dispatch({ type: SET_ACTIONS, payload: action.actions })
    dispatch({ type: SET_ACTIONS_CURSOR, payload: action.cursor })
    dispatch({ type: SET_ACTIONS_HAS_MORE, payload: action.hasMore })
    dispatch({
      type: SET_ACTIONS_TOTAL_COUNT,
      payload: action.totalCount,
    })
  }
}

export const queryNextActions = () => async (dispatch, getState) => {
  dispatch({ type: SET_ACTIONS_INFINITE_LOADING, payload: true })
  const {
    actions: { sortValue, searchTerm, cursor, hasMore, actions },
  } = getState()
  const [sort, sortOrder] = sortValue.split(':')

  if (!hasMore) {
    return dispatch({ type: SET_ACTIONS_INFINITE_LOADING, payload: false })
  }

  const {
    session: { token },
  } = getState()

  const client = new GraphQLClient('http://localhost:2017/graphql', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const actionResponse = await client
    .request(getActions, {
      sort,
      sortOrder,
      searchTerm,
      after: cursor,
    })
    .catch(error => {
      const errorType = get(error, 'response.errors[0].message')
      console.error('error ==='.toUpperCase(), error)
      console.error('errorType ==='.toUpperCase(), errorType)
      dispatch({ type: SET_ACTIONS_INFINITE_LOADING, payload: false })
    })

  if (actionResponse) {
    const { action } = actionResponse
    let newActions = [...actions, ...action.actions]
    newActions = newActions
      .map(action => action.code)
      .reduce(
        (unique, code) => (unique.includes(code) ? unique : [...unique, code]),
        []
      )
      .map(code => {
        return newActions.find(action => code === action.code)
      })
    dispatch({ type: SET_ACTION_QUERY_UPDATED, payload: false })
    dispatch({ type: SET_ACTIONS, payload: newActions })
    dispatch({ type: SET_ACTIONS_CURSOR, payload: action.cursor })
    dispatch({ type: SET_ACTIONS_HAS_MORE, payload: action.hasMore })
    dispatch({ type: SET_ACTIONS_INFINITE_LOADING, payload: false })
  }
}

export const onSearchUpdate = e => dispatch => {
  dispatch({ type: SET_ACTION_SEARCH, payload: e.target.value })
  dispatch({ type: SET_ACTION_QUERY_UPDATED, payload: true })
}

export const onSortUpdate = e => dispatch => {
  dispatch({ type: SET_ACTION_SORT, payload: e.target.value })
  dispatch({ type: SET_ACTION_QUERY_UPDATED, payload: true })
}

export const updateAction = (code, updatedProperties = {}, onSuccess) => async (
  dispatch,
  getState
) => {
  dispatch({ type: SET_UPDATING_ACTION_ERROR, payload: null })
  dispatch({ type: SET_UPDATING_ACTION_LOADING, payload: true })
  const {
    session: { token },
  } = getState()
  const client = new GraphQLClient('http://localhost:2017/graphql', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const updateActionResponse = await client
    .request(updateActionMutation, {
      action: {
        code,
        ...updatedProperties,
      },
    })
    .catch(error => {
      const errorType = get(error, 'response.errors[0].message')
      console.error('error ==='.toUpperCase(), error)
      console.error('errorType ==='.toUpperCase(), errorType)
      dispatch({ type: SET_UPDATING_ACTION_ERROR, payload: null })
      dispatch({ type: SET_UPDATING_ACTION_LOADING, payload: false })
    })

  if (updateActionResponse) {
    const { updateAction } = updateActionResponse
    let actions = [...getState().actions.actions]

    actions = actions.map(action =>
      action.code === updateAction.code ? updateAction : action
    )

    dispatch({ type: SET_ACTIONS, payload: actions })
    dispatch({ type: SET_UPDATING_ACTION_ERROR, payload: null })
    dispatch({ type: SET_UPDATING_ACTION_LOADING, payload: false })

    if (onSuccess) {
      onSuccess()
    }

    toast.success(`Action Updated: ${updateAction.name}`)
  }
}

export const createAction = (action, onSuccess) => async (
  dispatch,
  getState
) => {
  dispatch({ type: SET_CREATE_ACTION_ERROR, payload: null })
  dispatch({ type: SET_CREATE_ACTION_LOADING, payload: true })
  const {
    session: { token },
  } = getState()
  const client = new GraphQLClient('http://localhost:2017/graphql', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const createActionResponse = await client
    .request(createActionMutation, {
      action,
    })
    .catch(error => {
      const errorType = get(error, 'response.errors[0].message')
      console.error('error ==='.toUpperCase(), error)
      console.error('errorType ==='.toUpperCase(), errorType)
      dispatch({ type: SET_CREATE_ACTION_ERROR, payload: null })
      dispatch({ type: SET_CREATE_ACTION_LOADING, payload: false })
    })

  if (createActionResponse) {
    const { createAction } = createActionResponse

    dispatch({ type: SET_CREATE_ACTION_ERROR, payload: null })
    dispatch({ type: SET_CREATE_ACTION_LOADING, payload: false })

    if (onSuccess) {
      onSuccess()
    }

    toast.success(`Action Created: ${createAction.name}`)
  }
}
