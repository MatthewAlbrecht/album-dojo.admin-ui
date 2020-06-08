import {
  SET_PERMISSIONS,
  SET_PERMISSION_SEARCH,
  SET_PERMISSION_QUERY_UPDATED,
  SET_PERMISSIONS_CURSOR,
  SET_PERMISSIONS_HAS_MORE,
  SET_PERMISSIONS_TOTAL_COUNT,
  SET_PERMISSIONS_INFINITE_LOADING,
  SET_PERMISSION_SORT,
  SET_UPDATING_PERMISSION_ERROR,
  SET_UPDATING_PERMISSION_LOADING,
} from '../types/actions'
import { GraphQLClient } from 'graphql-request'
import get from 'lodash.get'
import {
  getPermissions,
  updatePermission as updatePermissionMutation,
} from '../gql'
import { toast } from 'react-toastify'

export const queryPermissions = () => async (dispatch, getState) => {
  dispatch({ type: SET_PERMISSIONS, payload: [] })

  const {
    permissions: { sortValue, searchTerm },
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

  const permissionResponse = await client
    .request(getPermissions, {
      sort,
      sortOrder,
      searchTerm,
    })
    .catch(error => {
      const errorType = get(error, 'response.errors[0].message')
      console.log('error ==='.toUpperCase(), error)
      console.log('errorType ==='.toUpperCase(), errorType)
    })

  if (permissionResponse) {
    const { permission } = permissionResponse
    dispatch({ type: SET_PERMISSION_QUERY_UPDATED, payload: false })
    dispatch({ type: SET_PERMISSIONS, payload: permission.permissions })
    dispatch({ type: SET_PERMISSIONS_CURSOR, payload: permission.cursor })
    dispatch({ type: SET_PERMISSIONS_HAS_MORE, payload: permission.hasMore })
    dispatch({
      type: SET_PERMISSIONS_TOTAL_COUNT,
      payload: permission.totalCount,
    })
  }
}

export const queryNextPermissions = () => async (dispatch, getState) => {
  dispatch({ type: SET_PERMISSIONS_INFINITE_LOADING, payload: true })
  const {
    permissions: { sortValue, searchTerm, cursor, hasMore, permissions },
  } = getState()
  const [sort, sortOrder] = sortValue.split(':')

  if (!hasMore) {
    return dispatch({ type: SET_PERMISSIONS_INFINITE_LOADING, payload: false })
  }

  const {
    session: { token },
  } = getState()

  const client = new GraphQLClient('http://localhost:2017/graphql', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const permissionResponse = await client
    .request(getPermissions, {
      sort,
      sortOrder,
      searchTerm,
      after: cursor,
    })
    .catch(error => {
      const errorType = get(error, 'response.errors[0].message')
      console.log('error ==='.toUpperCase(), error)
      console.log('errorType ==='.toUpperCase(), errorType)
      dispatch({ type: SET_PERMISSIONS_INFINITE_LOADING, payload: false })
    })

  if (permissionResponse) {
    const { permission } = permissionResponse
    let newPermissions = [...permissions, ...permission.permissions]
    newPermissions = newPermissions
      .map(permission => permission.id)
      .reduce(
        (unique, id) => (unique.includes(id) ? unique : [...unique, id]),
        []
      )
      .map(id => {
        return newPermissions.find(permission => id === permission.id)
      })
    dispatch({ type: SET_PERMISSION_QUERY_UPDATED, payload: false })
    dispatch({ type: SET_PERMISSIONS, payload: newPermissions })
    dispatch({ type: SET_PERMISSIONS_CURSOR, payload: permission.cursor })
    dispatch({ type: SET_PERMISSIONS_HAS_MORE, payload: permission.hasMore })
    dispatch({ type: SET_PERMISSIONS_INFINITE_LOADING, payload: false })
  }
}

export const onSearchUpdate = e => dispatch => {
  dispatch({ type: SET_PERMISSION_SEARCH, payload: e.target.value })
  dispatch({ type: SET_PERMISSION_QUERY_UPDATED, payload: true })
}

export const onSortUpdate = e => dispatch => {
  dispatch({ type: SET_PERMISSION_SORT, payload: e.target.value })
  dispatch({ type: SET_PERMISSION_QUERY_UPDATED, payload: true })
}

export const updatePermission = (
  id,
  updatedProperties = {},
  onSuccess
) => async (dispatch, getState) => {
  dispatch({ type: SET_UPDATING_PERMISSION_ERROR, payload: null })
  dispatch({ type: SET_UPDATING_PERMISSION_LOADING, payload: true })
  const {
    session: { token },
  } = getState()
  const client = new GraphQLClient('http://localhost:2017/graphql', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const updatePermissionResponse = await client
    .request(updatePermissionMutation, {
      permission: {
        id,
        ...updatedProperties,
      },
    })
    .catch(error => {
      const errorType = get(error, 'response.errors[0].message')
      console.error('error ==='.toUpperCase(), error)
      console.error('errorType ==='.toUpperCase(), errorType)
      dispatch({ type: SET_UPDATING_PERMISSION_ERROR, payload: null })
      dispatch({ type: SET_UPDATING_PERMISSION_LOADING, payload: false })
    })

  if (updatePermissionResponse) {
    const { updatePermission } = updatePermissionResponse
    let permissions = [...getState().permissions.permissions]

    permissions = permissions.map(permission =>
      permission.id === updatePermission.id ? updatePermission : permission
    )

    dispatch({ type: SET_PERMISSIONS, payload: permissions })
    dispatch({ type: SET_UPDATING_PERMISSION_ERROR, payload: null })
    dispatch({ type: SET_UPDATING_PERMISSION_LOADING, payload: false })

    if (onSuccess) {
      onSuccess()
    }

    toast.success(`Permission Updated: ${updatePermission.name}`)
  }
}
