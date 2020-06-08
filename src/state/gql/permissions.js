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
        description
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
