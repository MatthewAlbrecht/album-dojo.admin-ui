import gql from 'graphql-tag'
import { print } from 'graphql/language/printer'

export const getPermissions = print(gql`
  query getPermissions(
    $sort: nameSort!
    $sortOrder: sortOrder!
    $after: String
    $searchTerm: String
  ) {
    permission(
      pageSize: 50
      sort: $sort
      sortOrder: $sortOrder
      after: $after
      searchTerm: $searchTerm
    ) {
      hasMore
      cursor
      totalCount
      permissions {
        id
        name
      }
    }
  }
`)

export const getPermission = print(gql`
  query getPermission($id: ID!) {
    permission(pageSize: 1, id: $id) {
      hasMore
      cursor
      totalCount
      permissions {
        id
        name
        description
        roles {
          id
          name
          description
        }
      }
    }
  }
`)

export const updatePermission = print(gql`
  mutation updatePermission($permission: PermissionInputTypeUpdate!) {
    updatePermission(permission: $permission) {
      id
      name
      description
    }
  }
`)

export const createPermission = print(gql`
  mutation createPermission($permission: PermissionInputTypeCreate!) {
    createPermission(permission: $permission) {
      name
      description
    }
  }
`)
