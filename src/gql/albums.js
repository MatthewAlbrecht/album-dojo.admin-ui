import gql from 'graphql-tag'
import { print } from 'graphql/language/printer'

export const getAlbums = print(gql`
  query getAlbums(
    $sort: albumSort!
    $sortOrder: sortOrder!
    $after: String
    $searchTerm: String
  ) {
    album(
      pageSize: 50
      sort: $sort
      sortOrder: $sortOrder
      after: $after
      searchTerm: $searchTerm
    ) {
      hasMore
      cursor
      totalCount
      albums {
        id
        name
        artists
        images
        spotifyId
      }
    }
  }
`)
