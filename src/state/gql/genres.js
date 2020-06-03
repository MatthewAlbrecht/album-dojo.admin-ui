import gql from 'graphql-tag'
import { print } from 'graphql/language/printer'

export const getGenres = print(gql`
  query getGenres(
    $sort: genreSort!
    $sortOrder: sortOrder!
    $after: String
    $searchTerm: String
  ) {
    genre(
      pageSize: 100
      sort: $sort
      sortOrder: $sortOrder
      after: $after
      searchTerm: $searchTerm
    ) {
      hasMore
      cursor
      totalCount
      genres {
        id
        name
      }
    }
  }
`)
