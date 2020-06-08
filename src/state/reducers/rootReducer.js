import { combineReducers } from 'redux'

import achievements from './achievements'
import albums from './albums'
import genres from './genres'
import session from './session'
import spotify from './spotify'
import actions from './actions'
import permissions from './permissions'
import roles from './roles'
import users from './users'

export default combineReducers({
  achievements,
  albums,
  genres,
  session,
  actions,
  spotify,
  permissions,
  roles,
  users,
})
