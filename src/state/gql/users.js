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
