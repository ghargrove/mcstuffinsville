import React from 'react'

import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql'
})

const App: React.FC = () => (
  <ApolloProvider client={client}>
    <div>React application</div>
  </ApolloProvider>
)

export default App
