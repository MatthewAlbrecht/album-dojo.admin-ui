import gql from 'graphql-tag'
import { print } from 'graphql/language/printer'

export const getUsers = print(gql`
  query getUsers(
    $sort: userSort!
    $sortOrder: sortOrder!
    $after: String
    $searchTerm: String
  ) {
    user(
      pageSize: 50
      sort: $sort
      sortOrder: $sortOrder
      after: $after
      searchTerm: $searchTerm
    ) {
      hasMore
      cursor
      totalCount
      users {
        id
        email
        spotifyId
        username
      }
    }
  }
`)

export const getUser = print(gql`
  query getUser($id: ID!) {
    user(pageSize: 1, id: $id) {
      hasMore
      cursor
      totalCount
      users {
        id
        email
        spotifyId
        username
      }
    }
  }
`)

export const updateUser = print(gql`
  mutation updateUser($user: UserInputTypeUpdate!) {
    updateUser(user: $user) {
      id
      email
      spotifyId
      username
    }
  }
`)

export const createUser = print(gql`
  mutation createUser($user: UserInputTypeCreate!) {
    createUser(user: $user) {
      username
      email
    }
  }
`)
