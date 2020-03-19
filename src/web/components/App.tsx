import React from 'react'

import { ApolloProvider } from '@apollo/react-hooks'
import { ThemeProvider } from 'styled-components'

import client from '../client'
import theme from '../theme'
import GlobalStyles from './GlobalStyles'
import Patients from './Patients'

import Layout from './Layout'

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <ApolloProvider client={client}>
      <Layout>
        <Patients />
      </Layout>
    </ApolloProvider>
  </ThemeProvider>
)

export default App
