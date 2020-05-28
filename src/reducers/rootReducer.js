import { combineReducers } from 'redux'
import session from 'reducers/session'
import albums from 'reducers/albums'

export default combineReducers({
  session,
  albums,
})
