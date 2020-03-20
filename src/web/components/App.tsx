import React from 'react'

import { ApolloProvider } from '@apollo/react-hooks'
import { ThemeProvider } from 'styled-components'

import client from '../client'
import theme from '../theme'
import Layout from './Layout'
import GlobalStyles from './GlobalStyles'
import Patients from './Patients'

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <ApolloProvider client={client}>
      <Layout>{props => <Patients {...props} />}</Layout>
    </ApolloProvider>
  </ThemeProvider>
)

export default App
