import React from 'react'
import ReactDOM from 'react-dom'

import { ApolloProvider } from '@apollo/react-hooks'

import App from './components/App'
import client from './client'

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.querySelector('#app')
)
