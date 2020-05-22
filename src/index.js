import React from 'react'
import ReactDOM from 'react-dom'
import 'index.scss'
import { Provider } from 'react-redux'
import { InMemoryCache } from 'apollo-cache-inmemory'
import configureStore from 'store'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { CookiesProvider } from 'react-cookie'
import App from 'components/App/App'

const cache = new InMemoryCache()
cache.writeData({
  data: {
    isLoggedIn: false,
    currentUser: {
      id: '',
      username: '',
      points: {},
      __typename: 'CurrentUser',
    },
  },
})

const client = new ApolloClient({
  cache,
  uri: 'http://localhost:2017/graphql',
  resolvers: {},
  request: operation => {
    const token = localStorage.getItem('token')
    if (typeof token === 'string') {
      //TODO: break this out into it's own utils function validateLocalStorageToken
      operation.setContext({
        headers: {
          authorization: token ? `Bearer ${token}` : '',
        },
      })
    }
  },
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={configureStore()}>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
)
