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
      showDuplicates: false
      showInactive: false
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
        genres {
          id
        }
      }
    }
  }
`)

export const updateAlbum = print(gql`
  mutation updateAlbum($album: AlbumInputTypeUpdate!) {
    updateAlbum(album: $album) {
      id
      name
      artists
      images
      spotifyId
      genres {
        id
        name
      }
    }
  }
`)
