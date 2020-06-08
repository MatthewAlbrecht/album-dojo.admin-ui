import gql from 'graphql-tag'
import { print } from 'graphql/language/printer'

export const getAchievements = print(gql`
  query getAchievements(
    $sort: codeSort!
    $sortOrder: sortOrder!
    $after: String
    $searchTerm: String
  ) {
    achievement(
      pageSize: 50
      sort: $sort
      sortOrder: $sortOrder
      after: $after
      searchTerm: $searchTerm
    ) {
      hasMore
      cursor
      totalCount
      achievements {
        code
        name
        description
        imageUrl
        level
      }
    }
  }
`)

export const updateAchievement = print(gql`
  mutation updateAchievement($achievement: AchievementInputTypeUpdate!) {
    updateAchievement(achievement: $achievement) {
      code
      name
      description
      imageUrl
      level
    }
  }
`)

export const createAchievement = print(gql`
  mutation createAchievement($achievement: AchievementInputTypeCreate!) {
    createAchievement(achievement: $achievement) {
      code
      name
    }
  }
`)
