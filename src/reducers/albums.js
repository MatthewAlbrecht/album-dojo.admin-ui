import { SET_ALBUMS } from 'types/actions'

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ALBUMS:
      console.log('made it to ADD_ALBUM_BY_ID')
      return { ...state, albums: action.payload }
    default:
      return state
  }
}
