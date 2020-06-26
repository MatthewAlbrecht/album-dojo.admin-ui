import {
  SET_USERS,
  SET_USER_SEARCH,
  SET_USER_QUERY_UPDATED,
  SET_USERS_CURSOR,
  SET_USERS_HAS_MORE,
  SET_USERS_TOTAL_COUNT,
  SET_USERS_INFINITE_LOADING,
  SET_USER_SORT,
  SET_UPDATING_USER_ERROR,
  SET_UPDATING_USER_LOADING,
  SET_CREATE_USER_ERROR,
  SET_CREATE_USER_LOADING,
  SET_USER,
  SET_USER_LOADING,
  SET_USER_ERROR,
} from '../types/actions'

import { GraphQLClient } from 'graphql-request'
import get from 'lodash.get'
import {
  getUser,
  getUsers,
  updateUser as updateUserMutation,
  createUser as createUserMutation,
} from '../gql'
import { toast } from 'react-toastify'

export const queryUsers = () => async (dispatch, getState) => {
  dispatch({ type: SET_USERS, payload: [] })

  const {
    users: { sortValue, searchTerm },
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

  const userResponse = await client
    .request(getUsers, {
      sort,
      sortOrder,
      searchTerm,
    })
    .catch(error => {
      const errorType = get(error, 'response.errors[0].message')
      console.log('error ==='.toUpperCase(), error)
      console.log('errorType ==='.toUpperCase(), errorType)
    })

  if (userResponse) {
    const { user } = userResponse
    dispatch({ type: SET_USER_QUERY_UPDATED, payload: false })
    dispatch({ type: SET_USERS, payload: user.users })
    dispatch({ type: SET_USERS_CURSOR, payload: user.cursor })
    dispatch({ type: SET_USERS_HAS_MORE, payload: user.hasMore })
    dispatch({ type: SET_USERS_TOTAL_COUNT, payload: user.totalCount })
  }
}

export const queryNextUsers = () => async (dispatch, getState) => {
  dispatch({ type: SET_USERS_INFINITE_LOADING, payload: true })
  const {
    users: { sortValue, searchTerm, cursor, hasMore, users },
  } = getState()
  const [sort, sortOrder] = sortValue.split(':')

  if (!hasMore) {
    return dispatch({ type: SET_USERS_INFINITE_LOADING, payload: false })
  }

  const {
    session: { token },
  } = getState()

  const client = new GraphQLClient('http://localhost:2017/graphql', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const userResponse = await client
    .request(getUsers, {
      sort,
      sortOrder,
      searchTerm,
      after: cursor,
    })
    .catch(error => {
      const errorType = get(error, 'response.errors[0].message')
      console.log('error ==='.toUpperCase(), error)
      console.log('errorType ==='.toUpperCase(), errorType)
      dispatch({ type: SET_USERS_INFINITE_LOADING, payload: false })
    })

  if (userResponse) {
    const { user } = userResponse
    let newUsers = [...users, ...user.users]
    newUsers = newUsers
      .map(user => user.id)
      .reduce(
        (unique, id) => (unique.includes(id) ? unique : [...unique, id]),
        []
      )
      .map(id => {
        return newUsers.find(user => id === user.id)
      })
    dispatch({ type: SET_USER_QUERY_UPDATED, payload: false })
    dispatch({ type: SET_USERS, payload: newUsers })
    dispatch({ type: SET_USERS_CURSOR, payload: user.cursor })
    dispatch({ type: SET_USERS_HAS_MORE, payload: user.hasMore })
    dispatch({ type: SET_USERS_INFINITE_LOADING, payload: false })
  }
}

export const onSearchUpdate = e => dispatch => {
  dispatch({ type: SET_USER_SEARCH, payload: e.target.value })
  dispatch({ type: SET_USER_QUERY_UPDATED, payload: true })
}

export const onSortUpdate = e => dispatch => {
  dispatch({ type: SET_USER_SORT, payload: e.target.value })
  dispatch({ type: SET_USER_QUERY_UPDATED, payload: true })
}

export const updateUser = (id, updatedProperties = {}, onSuccess) => async (
  dispatch,
  getState
) => {
  dispatch({ type: SET_UPDATING_USER_ERROR, payload: null })
  dispatch({ type: SET_UPDATING_USER_LOADING, payload: true })
  const {
    session: { token },
  } = getState()
  const client = new GraphQLClient('http://localhost:2017/graphql', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const updateUserResponse = await client
    .request(updateUserMutation, {
      user: {
        id,
        ...updatedProperties,
      },
    })
    .catch(error => {
      const errorType = get(error, 'response.errors[0].message')
      console.error('error ==='.toUpperCase(), error)
      console.error('errorType ==='.toUpperCase(), errorType)
      dispatch({ type: SET_UPDATING_USER_ERROR, payload: null })
      dispatch({ type: SET_UPDATING_USER_LOADING, payload: false })
    })

  if (updateUserResponse) {
    const { updateUser } = updateUserResponse
    let users = [...getState().users.users]

    users = users.map(user => (user.id === updateUser.id ? updateUser : user))

    dispatch({ type: SET_USERS, payload: users })
    dispatch({ type: SET_UPDATING_USER_ERROR, payload: null })
    dispatch({ type: SET_UPDATING_USER_LOADING, payload: false })

    if (onSuccess) {
      onSuccess()
    }

    toast.success(`User Updated: ${updateUser.name}`)
  }
}

export const createUser = (user, onSuccess) => async (dispatch, getState) => {
  dispatch({ type: SET_CREATE_USER_ERROR, payload: null })
  dispatch({ type: SET_CREATE_USER_LOADING, payload: true })
  const {
    session: { token },
  } = getState()
  const client = new GraphQLClient('http://localhost:2017/graphql', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const createUserResponse = await client
    .request(createUserMutation, {
      user,
    })
    .catch(error => {
      const errorType = get(error, 'response.errors[0].message')
      console.error('error ==='.toUpperCase(), error)
      console.error('errorType ==='.toUpperCase(), errorType)
      dispatch({ type: SET_CREATE_USER_ERROR, payload: null })
      dispatch({ type: SET_CREATE_USER_LOADING, payload: false })
    })

  if (createUserResponse) {
    const { createUser } = createUserResponse

    dispatch({ type: SET_CREATE_USER_ERROR, payload: null })
    dispatch({ type: SET_CREATE_USER_LOADING, payload: false })

    if (onSuccess) {
      onSuccess()
    }

    toast.success(`User Created: ${createUser.email}`)
  }
}

export const findUser = id => async (dispatch, getState) => {
  dispatch({ type: SET_USER, payload: [] })
  dispatch({ type: SET_USER_LOADING, payload: true })
  dispatch({ type: SET_USER_ERROR, payload: null })

  const {
    session: { token },
  } = getState()
  const client = new GraphQLClient('http://localhost:2017/graphql', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const userResponse = await client
    .request(getUser, {
      id,
    })
    .catch(error => {
      const errorType = get(error, 'response.errors[0].message')
      console.error('error ==='.toUpperCase(), error)
      console.error('errorType ==='.toUpperCase(), errorType)
      dispatch({ type: SET_USER_LOADING, payload: false })
      dispatch({ type: SET_USER_ERROR, payload: error })
    })

  if (userResponse) {
    const { user } = userResponse
    dispatch({
      type: SET_USER,
      payload: user.users[0] || {},
    })
    dispatch({ type: SET_USER_LOADING, payload: false })
  }
}

export const resetUser = () => async dispatch => {
  dispatch({ type: SET_USER, payload: {} })
}
