import { SET_ALBUMS } from 'types/actions'
import { getNewTokens } from 'actions/helpers'
import { GraphQLClient } from 'graphql-request'
import get from 'lodash.get'
import { addAlbumByIdMutation, addAlbumsByPlaylistMutation } from 'gql'

export const addAlbumBySpotifyId = id => async (dispatch, getState) => {
  dispatch({ type: SET_ALBUMS, payload: [] })
}
