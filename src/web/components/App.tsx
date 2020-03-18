import React from 'react'

import { ApolloProvider } from '@apollo/react-hooks'
import { ThemeProvider } from 'styled-components'

import Header from '../components/Header'
import Patients from '../components/Patients'
import client from '../client'
import theme from '../theme'

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <ApolloProvider client={client}>
      <Header />
      <Patients />
    </ApolloProvider>
  </ThemeProvider>
)

export default App
