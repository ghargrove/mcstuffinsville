import React, { useState } from 'react'

import matchSorter from 'match-sorter'
import styled from 'styled-components'

import FieldVisibilityProvider from '../FieldVisibilityProvider'
import { FieldVisibilityFilters, IFilter, PatientFilters } from '../Filters'
import Shoutout from '../Shoutout'
import { Link, SectionLabel } from '../Generic'
import Header from '../Header'
import FilterSidebar from './FilterSidebar'
import FilterGroup from './FilterGroup'
import Main from './Main'

const Layout = styled.div`
  min-height: 100vh;
  display: flex;
`

const defaultFilterValue = {
  field: '',
  value: '',
  threshold: matchSorter.rankings.CASE_SENSITIVE_EQUAL
}

interface ILayoutProps {
  children: (args: { filters: IFilter[] }) => React.ReactChild
}

const LayoutWrapper: React.FC<ILayoutProps> = ({ children }) => {
  const [filters, setFilters] = useState<{ [key: string]: IFilter }>({
    search: {
      ...defaultFilterValue,
      field: 'search',
      threshold: matchSorter.rankings.CONTAINS
    },
    gender: { ...defaultFilterValue, field: 'gender' },
    state: { ...defaultFilterValue, field: 'state' }
  })

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
      <Layout>
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
      </Layout>
    </FieldVisibilityProvider>
  )
}

export default LayoutWrapper
