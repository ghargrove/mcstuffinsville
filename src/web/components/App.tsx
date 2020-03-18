import React from 'react'

import { ApolloProvider, useQuery } from '@apollo/react-hooks'
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import gql from 'graphql-tag'

// Load the IPatient type from the server
import { IPatient } from '../../server/store'

interface IGetPatientResponse {
  getPatient: IPatient
}

const getPatientQuery = gql`
  query getPatient($id: Int!) {
    getPatient(id: $id) {
      id
      email
    }
  }
`

const client = new ApolloClient({
  cache: new InMemoryCache({
    addTypename: false
  }),
  link: new HttpLink({
    uri: 'http://localhost:3000/graphql'
  })
})

const Patient: React.FC = () => {
  const { loading, error, data } = useQuery<IGetPatientResponse>(
    getPatientQuery,
    { variables: { id: 1 } }
  )

  if (error) {
    return <div>Whoops</div>
  }

  if (loading) {
    return <div>Loading patient...</div>
  }

  return <div>{JSON.stringify(data?.getPatient)}</div>
}

const App: React.FC = () => (
  <ApolloProvider client={client}>
    <div>React application</div>
    <Patient />
  </ApolloProvider>
)

export default App
