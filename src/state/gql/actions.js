import gql from 'graphql-tag'
import { print } from 'graphql/language/printer'

export const getActions = print(gql`
  query getActions(
    $sort: codeSort!
    $sortOrder: sortOrder!
    $after: String
    $searchTerm: String
  ) {
    action(
      pageSize: 50
      sort: $sort
      sortOrder: $sortOrder
      after: $after
      searchTerm: $searchTerm
    ) {
      hasMore
      cursor
      totalCount
      actions {
        code
        name
        description
        points
        level
      }
    }
  }
`)

export const getAction = print(gql`
  query getActions($code: String) {
    action(pageSize: 1, code: $code) {
      hasMore
      cursor
      totalCount
      actions {
        code
        name
        description
        level
        points
        achievementCode
        achievement {
          code
          name
          description
          level
          imageUrl
        }
        relatedActions {
          code
          name
          description
          points
          level
        }
      }
    }
  }
`)

export const updateAction = print(gql`
  mutation updateAction($action: ActionInputTypeUpdate!) {
    updateAction(action: $action) {
      code
      name
      description
      points
      level
    }
  }
`)

export const createAction = print(gql`
  mutation createAction($action: ActionInputTypeCreate!) {
    createAction(action: $action) {
      code
      name
    }
  }
`)
