import gql from 'graphql-tag'
import { print } from 'graphql/language/printer'

export const getRoles = print(gql`
  query getRoles(
    $sort: nameSort!
    $sortOrder: sortOrder!
    $after: String
    $searchTerm: String
  ) {
    role(
      pageSize: 50
      sort: $sort
      sortOrder: $sortOrder
      after: $after
      searchTerm: $searchTerm
    ) {
      hasMore
      cursor
      totalCount
      roles {
        id
        name
        description
      }
    }
  }
`)

export const getRole = print(gql`
  query getRole($id: ID!) {
    role(pageSize: 1, id: $id) {
      hasMore
      cursor
      totalCount
      roles {
        id
        name
        description
        permissions {
          permission {
            id
            name
          }
        }
      }
    }
  }
`)

export const updateRole = print(gql`
  mutation updateRole($role: RoleInputTypeUpdate!) {
    updateRole(role: $role) {
      id
      name
      description
    }
  }
`)

export const createRole = print(gql`
  mutation createRole($role: RoleInputTypeCreate!) {
    createRole(role: $role) {
      name
      description
    }
  }
`)
