import gql from 'graphql-tag'
import { print } from 'graphql/language/printer'

export const loginUserMutation = print(
  gql`
    mutation loginUser($user: UserInputTypeLogin!) {
      loginUser(user: $user) {
        id
        username
        email
        role
        token
      }
    }
  `
)
