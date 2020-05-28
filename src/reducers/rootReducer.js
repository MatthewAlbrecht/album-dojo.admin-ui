import { combineReducers } from 'redux'
import session from 'reducers/session'
import spotify from 'reducers/spotify'
import albums from 'reducers/albums'

export default combineReducers({
  session,
  spotify,
  albums,
})
