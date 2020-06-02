import gql from 'graphql-tag'
import { print } from 'graphql/language/printer'

export const addAlbumByIdMutation = print(gql`
  mutation createAlbumById($album: AlbumInputTypeCreateById!) {
    createAlbumById(album: $album) {
      id
      spotifyId
      name
      durationInMs
      artists
      images
    }
  }
`)

export const addAlbumsByPlaylistMutation = print(gql`
  mutation createAlbumsByPlaylist($album: AlbumInputTypeCreateByPlaylistId!) {
    createAlbumsByPlaylist(album: $album) {
      id
      name
      artists
      images
    }
  }
`)
