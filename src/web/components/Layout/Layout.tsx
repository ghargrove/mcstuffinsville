import React from 'react'

import styled from 'styled-components'

import { Select } from '../Generic'
import Header from '../Header'
import Filters from './Filters'
import Main from './Main'

const Layout = styled.div`
  min-height: 100vh;
  display: flex;
`

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`

const FilterSelect = styled(Select)`
  display: block;
  width: 100%;
`

const SectionLabel = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
`

const spacing = { marginBottom: '1rem' }

const LayoutWrapper: React.FC = ({ children }) => (
  <div>
    <Header />
    <Layout>
      <Filters>
        <SectionLabel>Filters</SectionLabel>
        <div style={spacing}>
          <Label>Gender</Label>
          <FilterSelect>
            <option>--</option>
            <option>Male</option>
            <option>Female</option>
          </FilterSelect>
        </div>
        <div style={spacing}>
          <Label>State</Label>
          <FilterSelect>
            <option>--</option>
            <option>Alabama</option>
            <option>Alaska</option>
            <option>Arizona</option>
          </FilterSelect>
        </div>
      </Filters>
      <Main>{children}</Main>
    </Layout>
  </div>
)

export default LayoutWrapper
