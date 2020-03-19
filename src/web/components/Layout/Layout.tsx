import React from 'react'

import styled from 'styled-components'

import Header from '../Header'
import Filters from './Filters'
import Main from './Main'

const Layout = styled.div`
  min-height: 100vh;
  display: flex;
`

const LayoutWrapper: React.FC = ({ children }) => (
  <div>
    <Header />
    <Layout>
      <Filters />
      <Main>{children}</Main>
    </Layout>
  </div>
)

export default LayoutWrapper
