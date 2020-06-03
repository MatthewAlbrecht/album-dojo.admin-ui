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
    delete state.spotify.newAlbumById
    delete state.spotify.newAlbumByIdError
    delete state.spotify.newAlbumByIdLoading
    delete state.spotify.newAlbumsByPlaylist
    delete state.spotify.newAlbumsByPlaylistLoading
    delete state.spotify.newAlbumsByPlaylistError

    state.albums.albums = []
    state.albums.hasMore = true
    delete state.albums.isInfiniteLoading
    delete state.albums.cursor
    delete state.albums.totalCount
    delete state.albums.queryUpdated
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
