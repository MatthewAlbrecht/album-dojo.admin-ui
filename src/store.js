import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from 'reducers/rootReducer'

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
    delete state.albums.newAlbumById
    delete state.albums.newAlbumByIdError
    delete state.albums.newAlbumByIdLoading
    delete state.albums.newAlbumsByPlaylistLoading
    delete state.albums.newAlbumsByPlaylistError
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
