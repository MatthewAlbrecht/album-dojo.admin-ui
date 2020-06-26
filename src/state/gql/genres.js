import gql from 'graphql-tag'
import { print } from 'graphql/language/printer'

export const getGenres = print(gql`
  query getGenres(
    $sort: nameSort!
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

export const getGenre = print(gql`
  query getGenre($id: ID!) {
    genre(pageSize: 1, id: $id) {
      hasMore
      cursor
      totalCount
      genres {
        id
        name
        parentGenreId
        parentGenre {
          name
        }
      }
    }
  }
`)

export const updateGenre = print(gql`
  mutation updateGenre($genre: GenreInputTypeUpdate!) {
    updateGenre(genre: $genre) {
      id
      name
    }
  }
`)

export const createGenre = print(gql`
  mutation createGenre($genre: GenreInputTypeCreate!) {
    createGenre(genre: $genre) {
      name
    }
  }
`)
