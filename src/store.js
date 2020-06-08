import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from 'state/reducers/rootReducer'

export default function configureStore(initialState = {}) {
  const saveToLocalStorage = state => {
    try {
      const serializedState = JSON.stringify(state)
      localStorage.setItem('state', serializedState)
    } catch (error) {
      console.log('error ==='.toUpperCase(), error)
    }
  }

  const loadFromLocalStorage = () => {
    try {
      const serializedState = localStorage.getItem('state')
      if (!serializedState) {
        return undefined
      }
      return deleteKeysFromSerializedState(JSON.parse(serializedState))
    } catch (error) {
      console.log('error ==='.toUpperCase(), error)
      return undefined
    }
  }

  const deleteKeysFromSerializedState = state => {
    // spotify
    delete state.spotify.newAlbumById
    delete state.spotify.newAlbumByIdError
    delete state.spotify.newAlbumByIdLoading
    delete state.spotify.newAlbumsByPlaylist
    delete state.spotify.newAlbumsByPlaylistLoading
    delete state.spotify.newAlbumsByPlaylistError

    // albums
    state.albums.albums = []
    state.albums.duplicates = []
    state.albums.hasMore = true

    delete state.albums.primaryDuplicate
    delete state.albums.isInfiniteLoading
    delete state.albums.createAlbumsLoading
    delete state.albums.createAlbumsError
    delete state.albums.updateAlbumsLoading
    delete state.albums.updateAlbumsError
    delete state.albums.cursor
    delete state.albums.totalCount
    delete state.albums.queryUpdated

    // achievements
    state.achievements.achievements = []
    state.achievements.hasMore = true

    delete state.achievements.isInfiniteLoading
    delete state.achievements.createAchievementsLoading
    delete state.achievements.createAchievementsError
    delete state.achievements.updateAchievementsLoading
    delete state.achievements.updateAchievementsError
    delete state.achievements.cursor
    delete state.achievements.totalCount
    delete state.achievements.queryUpdated

    // actions
    state.actions.actions = []
    state.actions.hasMore = true

    delete state.actions.isInfiniteLoading
    delete state.actions.createActionsLoading
    delete state.actions.createActionsError
    delete state.actions.updateActionsLoading
    delete state.actions.updateActionsError
    delete state.actions.cursor
    delete state.actions.totalCount
    delete state.actions.queryUpdated

    // genres
    state.genres.genreOptions = []
    state.genres.genres = []
    state.genres.hasMore = true

    delete state.genres.isInfiniteLoading
    delete state.genres.createGenresLoading
    delete state.genres.createGenresError
    delete state.genres.updateGenresLoading
    delete state.genres.updateGenresError
    delete state.genres.cursor
    delete state.genres.totalCount
    delete state.genres.queryUpdated

    // permissions
    state.permissions.permissions = []
    state.permissions.hasMore = true

    delete state.permissions.isInfiniteLoading
    delete state.permissions.createPermissionsLoading
    delete state.permissions.createPermissionsError
    delete state.permissions.updatePermissionsLoading
    delete state.permissions.updatePermissionsError
    delete state.permissions.cursor
    delete state.permissions.totalCount
    delete state.permissions.queryUpdated

    // roles
    state.roles.roles = []
    state.roles.hasMore = true

    delete state.roles.isInfiniteLoading
    delete state.roles.createRolesLoading
    delete state.roles.createRolesError
    delete state.roles.updateRolesLoading
    delete state.roles.updateRolesError
    delete state.roles.cursor
    delete state.roles.totalCount
    delete state.roles.queryUpdated

    // users
    state.users.users = []
    state.users.hasMore = true

    delete state.users.isInfiniteLoading
    delete state.users.createUsersLoading
    delete state.users.createUsersError
    delete state.users.updateUsersLoading
    delete state.users.updateUsersError
    delete state.users.cursor
    delete state.users.totalCount
    delete state.users.queryUpdated

    return state
  }

  const persistedState = loadFromLocalStorage()

  const store = createStore(
    rootReducer,
    persistedState || initialState,
    compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  )

  store.subscribe(() => saveToLocalStorage(store.getState()))

  return store
}
