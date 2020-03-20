import React from 'react'

import { ThemeProvider } from 'styled-components'

import theme from '../theme'
import Layout from './Layout'
import GlobalStyles from './GlobalStyles'
import Patients from './Patients'

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <Layout>{props => <Patients {...props} />}</Layout>
  </ThemeProvider>
)

export default App
