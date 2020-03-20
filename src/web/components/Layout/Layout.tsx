import React, { useState } from 'react'

import styled from 'styled-components'

import FieldVisibilityProvider from '../FieldVisibilityProvider'
import {
  defaultFilters,
  FieldVisibilityFilters,
  IFilter,
  PatientFilters
} from '../Filters'

import { Link, SectionLabel } from '../Generic'
import Header from '../Header'
import Shoutout from '../Shoutout'
import FilterGroup from './FilterGroup'
import FilterSidebar from './FilterSidebar'
import Main from './Main'

const Content = styled.div`
  min-height: 100vh;
  display: flex;
`

interface ILayoutProps {
  children: (args: { filters: IFilter[] }) => React.ReactChild
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  const [filters, setFilters] = useState(defaultFilters)

  const handleSearchFilterChange = (search: string) =>
    setFilters(prevState => ({
      ...prevState,
      search: {
        ...prevState.search,
        value: search
      }
    }))

  const handlePatientFilterChange = (filter: IFilter) =>
    setFilters(prevState => ({
      ...prevState,
      [filter.field]: filter
    }))

  const handlePatientFilterClear = () =>
    setFilters(prevState => ({
      ...prevState,
      gender: {
        ...prevState.gender,
        value: ''
      },
      state: {
        ...prevState.state,
        value: ''
      }
    }))

  // Could memoize this if you had many filters
  const activeFilters = Object.values(filters).filter(
    ({ value }) => value !== ''
  )

  return (
    <FieldVisibilityProvider>
      <Header onSearchChange={handleSearchFilterChange} />
      <Content>
        <FilterSidebar>
          <FilterGroup>
            <PatientFilters
              filters={filters}
              onFilterChange={handlePatientFilterChange}
              onFilterClear={handlePatientFilterClear}
            />
          </FilterGroup>
          <FilterGroup>
            <FieldVisibilityFilters />
          </FilterGroup>
          <FilterGroup>
            <SectionLabel>Developer</SectionLabel>
            <div>
              <Link href="http://localhost:3000/graphql" target="__blank">
                API
              </Link>
            </div>
            <div>
              <Link href="http://localhost:8081" target="__blank">
                Component Library
              </Link>
            </div>
          </FilterGroup>
          <Shoutout />
        </FilterSidebar>
        <Main>{children({ filters: activeFilters })}</Main>
      </Content>
    </FieldVisibilityProvider>
  )
}

export default Layout
