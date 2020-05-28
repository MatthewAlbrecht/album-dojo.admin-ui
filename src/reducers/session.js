import {
  SET_CURRENT_USER,
  SET_TOKEN,
  LOGIN_ERROR,
  LOGIN_LOADING,
  SET_SPOTIFY_TOKEN,
  LOGOUT_USER,
} from 'types/actions'

const initialState = { currentUser: {} }

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      console.log('made it to SET_CURRENT_USER')
      return { ...state, currentUser: action.payload }
    case SET_TOKEN:
      console.log('made it to SET_TOKEN')
      return { ...state, token: action.payload }
    case LOGIN_ERROR:
      console.log('made it to LOGIN_ERROR')
      return { ...state, loginError: action.payload }
    case LOGIN_LOADING:
      console.log('made it to LOGIN_LOADING')
      return { ...state, loginLoading: action.payload }
    case SET_SPOTIFY_TOKEN:
      console.log('made it to SET_SPOTIFY_TOKEN')
      return { ...state, spotifyAccessToken: action.payload }
    case LOGOUT_USER:
      console.log('made it to LOGOUT_USER')
      return { ...initialState }
    default:
      return state
  }
}
