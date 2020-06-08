import {
  ADD_ALBUM_BY_ID,
  ADD_ALBUM_BY_ID_LOADING,
  ADD_ALBUM_BY_ID_ERROR,
  ADD_ALBUMS_BY_PLAYLIST,
  ADD_ALBUMS_BY_PLAYLIST_LOADING,
  ADD_ALBUMS_BY_PLAYLIST_ERROR,
  LOGOUT_USER,
} from '../types/actions'

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ALBUM_BY_ID:
      return { ...state, newAlbumById: action.payload }
    case ADD_ALBUM_BY_ID_LOADING:
      return { ...state, newAlbumByIdLoading: action.payload }
    case ADD_ALBUM_BY_ID_ERROR:
      return { ...state, newAlbumByIdError: action.payload }
    case ADD_ALBUMS_BY_PLAYLIST:
      return { ...state, newAlbumsByPlaylist: action.payload }
    case ADD_ALBUMS_BY_PLAYLIST_LOADING:
      return { ...state, newAlbumsByPlaylistLoading: action.payload }
    case ADD_ALBUMS_BY_PLAYLIST_ERROR:
      return { ...state, newAlbumsByPlaylistError: action.payload }
    case LOGOUT_USER:
      return { ...initialState }
    default:
      return state
  }
}
