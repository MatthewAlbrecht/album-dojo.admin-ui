import {
  SET_ROLES,
  SET_ROLE_SEARCH,
  SET_ROLE_QUERY_UPDATED,
  SET_ROLES_CURSOR,
  SET_ROLES_HAS_MORE,
  SET_ROLES_TOTAL_COUNT,
  SET_ROLES_INFINITE_LOADING,
  SET_ROLE_SORT,
  SET_UPDATING_ROLE_ERROR,
  SET_UPDATING_ROLE_LOADING,
  SET_CREATE_ROLE_ERROR,
  SET_CREATE_ROLE_LOADING,
} from '../types/actions'
import { GraphQLClient } from 'graphql-request'
import get from 'lodash.get'
import {
  getRoles,
  updateRole as updateRoleMutation,
  createRole as createRoleMutation,
} from '../gql'
import { toast } from 'react-toastify'

export const queryRoles = () => async (dispatch, getState) => {
  dispatch({ type: SET_ROLES, payload: [] })

  const {
    roles: { sortValue, searchTerm },
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

  const roleResponse = await client
    .request(getRoles, {
      sort,
      sortOrder,
      searchTerm,
    })
    .catch(error => {
      const errorType = get(error, 'response.errors[0].message')
      console.log('error ==='.toUpperCase(), error)
      console.log('errorType ==='.toUpperCase(), errorType)
    })

  if (roleResponse) {
    const { role } = roleResponse
    dispatch({ type: SET_ROLE_QUERY_UPDATED, payload: false })
    dispatch({ type: SET_ROLES, payload: role.roles })
    dispatch({ type: SET_ROLES_CURSOR, payload: role.cursor })
    dispatch({ type: SET_ROLES_HAS_MORE, payload: role.hasMore })
    dispatch({
      type: SET_ROLES_TOTAL_COUNT,
      payload: role.totalCount,
    })
  }
}

export const queryNextRoles = () => async (dispatch, getState) => {
  dispatch({ type: SET_ROLES_INFINITE_LOADING, payload: true })
  const {
    roles: { sortValue, searchTerm, cursor, hasMore, roles },
  } = getState()
  const [sort, sortOrder] = sortValue.split(':')

  if (!hasMore) {
    return dispatch({ type: SET_ROLES_INFINITE_LOADING, payload: false })
  }

  const {
    session: { token },
  } = getState()

  const client = new GraphQLClient('http://localhost:2017/graphql', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const roleResponse = await client
    .request(getRoles, {
      sort,
      sortOrder,
      searchTerm,
      after: cursor,
    })
    .catch(error => {
      const errorType = get(error, 'response.errors[0].message')
      console.log('error ==='.toUpperCase(), error)
      console.log('errorType ==='.toUpperCase(), errorType)
      dispatch({ type: SET_ROLES_INFINITE_LOADING, payload: false })
    })

  if (roleResponse) {
    const { role } = roleResponse
    let newRoles = [...roles, ...role.roles]
    newRoles = newRoles
      .map(role => role.id)
      .reduce(
        (unique, id) => (unique.includes(id) ? unique : [...unique, id]),
        []
      )
      .map(id => {
        return newRoles.find(role => id === role.id)
      })
    dispatch({ type: SET_ROLE_QUERY_UPDATED, payload: false })
    dispatch({ type: SET_ROLES, payload: newRoles })
    dispatch({ type: SET_ROLES_CURSOR, payload: role.cursor })
    dispatch({ type: SET_ROLES_HAS_MORE, payload: role.hasMore })
    dispatch({ type: SET_ROLES_INFINITE_LOADING, payload: false })
  }
}

export const onSearchUpdate = e => dispatch => {
  dispatch({ type: SET_ROLE_SEARCH, payload: e.target.value })
  dispatch({ type: SET_ROLE_QUERY_UPDATED, payload: true })
}

export const onSortUpdate = e => dispatch => {
  dispatch({ type: SET_ROLE_SORT, payload: e.target.value })
  dispatch({ type: SET_ROLE_QUERY_UPDATED, payload: true })
}

export const updateRole = (id, updatedProperties = {}, onSuccess) => async (
  dispatch,
  getState
) => {
  dispatch({ type: SET_UPDATING_ROLE_ERROR, payload: null })
  dispatch({ type: SET_UPDATING_ROLE_LOADING, payload: true })
  const {
    session: { token },
  } = getState()
  const client = new GraphQLClient('http://localhost:2017/graphql', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const updateRoleResponse = await client
    .request(updateRoleMutation, {
      role: {
        id,
        ...updatedProperties,
      },
    })
    .catch(error => {
      const errorType = get(error, 'response.errors[0].message')
      console.error('error ==='.toUpperCase(), error)
      console.error('errorType ==='.toUpperCase(), errorType)
      dispatch({ type: SET_UPDATING_ROLE_ERROR, payload: null })
      dispatch({ type: SET_UPDATING_ROLE_LOADING, payload: false })
    })

  if (updateRoleResponse) {
    const { updateRole } = updateRoleResponse
    let roles = [...getState().roles.roles]

    roles = roles.map(role => (role.id === updateRole.id ? updateRole : role))

    dispatch({ type: SET_ROLES, payload: roles })
    dispatch({ type: SET_UPDATING_ROLE_ERROR, payload: null })
    dispatch({ type: SET_UPDATING_ROLE_LOADING, payload: false })

    if (onSuccess) {
      onSuccess()
    }

    toast.success(`Role Updated: ${updateRole.name}`)
  }
}

export const createRole = (role, onSuccess) => async (dispatch, getState) => {
  dispatch({ type: SET_CREATE_ROLE_ERROR, payload: null })
  dispatch({ type: SET_CREATE_ROLE_LOADING, payload: true })
  const {
    session: { token },
  } = getState()
  const client = new GraphQLClient('http://localhost:2017/graphql', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const createRoleResponse = await client
    .request(createRoleMutation, {
      role,
    })
    .catch(error => {
      const errorType = get(error, 'response.errors[0].message')
      console.error('error ==='.toUpperCase(), error)
      console.error('errorType ==='.toUpperCase(), errorType)
      dispatch({ type: SET_CREATE_ROLE_ERROR, payload: null })
      dispatch({ type: SET_CREATE_ROLE_LOADING, payload: false })
    })

  if (createRoleResponse) {
    const { createRole } = createRoleResponse

    dispatch({ type: SET_CREATE_ROLE_ERROR, payload: null })
    dispatch({ type: SET_CREATE_ROLE_LOADING, payload: false })

    if (onSuccess) {
      onSuccess()
    }

    toast.success(`Role Created: ${createRole.name}`)
  }
}
