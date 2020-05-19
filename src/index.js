import React from 'react'
import ReactDOM from 'react-dom'
import 'index.scss'
import { Provider } from 'react-redux'
import configureStore from 'store'
import ApolloClient, { gql } from 'apollo-boost'

import App from 'components/App/App'

const client = new ApolloClient({
  uri: 'http://localhost:2017/graphql',
})

client
  .query({
    query: gql`
      {
        user {
          username
          email
          id
          role
          points
          albums {
            id
            albumId
            tags
            rating
          }
        }
      }
    `,
  })
  .then(result => console.log('result', result))

ReactDOM.render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
  document.getElementById('root')
)
