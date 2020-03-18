import React from 'react'

import { ApolloProvider, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { ThemeProvider } from 'styled-components'

// Load the IPatient type from the server
import { IPatient } from '../../server/store'
import TextField from '../components/Generic/TextField'
import client from '../client'
import theme from '../theme'

interface IGetPatientsResponse {
  getPatients: {
    edges: {
      cursor: string | null
      node: IPatient[]
    }
  }
}

const getPatientsQuery = gql`
  query getPatients {
    getPatients {
      edges {
        node {
          id
          email
          state
        }
      }
    }
  }
`

const Patient: React.FC = () => {
  const { loading, error, data } = useQuery<IGetPatientsResponse>(
    getPatientsQuery
  )

  if (error) {
    return <div>Whoops</div>
  }

  if (loading) {
    return <div>Loading patient...</div>
  }

  return <div>{JSON.stringify(data?.getPatients)}</div>
}

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <ApolloProvider client={client}>
      <div>React application</div>
      <TextField type="text" />
      <Patient />
    </ApolloProvider>
  </ThemeProvider>
)

export default App
