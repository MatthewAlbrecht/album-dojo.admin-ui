import { combineReducers } from 'redux'

import albums from './albums'
import genres from './genres'
import session from './session'
import spotify from './spotify'

export default combineReducers({
  albums,
  genres,
  session,
  spotify,
})
