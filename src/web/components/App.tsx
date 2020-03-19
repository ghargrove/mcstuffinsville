import React from 'react'

import { ApolloProvider } from '@apollo/react-hooks'
import { ThemeProvider } from 'styled-components'

import client from '../client'
import theme from '../theme'
import GlobalStyles from './GlobalStyles'
import Header from './Header'
import Patients from './Patients'

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <ApolloProvider client={client}>
      <Header />
      <Patients />
    </ApolloProvider>
  </ThemeProvider>
)

export default App
