import React, { useState } from 'react'

import matchSorter from 'match-sorter'
import styled, { css } from 'styled-components'

import { Select } from '../Generic'
import Header from '../Header'
import Filters from './Filters'
import Main from './Main'

import stateNames from './states.json'

const Layout = styled.div`
  min-height: 100vh;
  display: flex;
`

const FilterSelect = styled(Select)`
  display: block;
  width: 100%;

  ${({ value }) =>
    value === '' &&
    css`
      color: #939393;
    `}
`

const SectionLabel = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
`

const FilterGroup = styled.div`
  margin-bottom: 1rem;
`

export interface IFilterValue {
  field: string
  value: string
  threshold?: number
}

interface ILayoutProps {
  children: (args: { filters: IFilterValue[] }) => React.ReactChild
}

const defaultFilterValue = {
  field: '',
  value: '',
  threshold: matchSorter.rankings.CASE_SENSITIVE_EQUAL
}

const LayoutWrapper: React.FC<ILayoutProps> = ({ children }) => {
  const [genderFilter, setGenderFilter] = useState<IFilterValue>({
    ...defaultFilterValue,
    field: 'gender'
  })
  const [stateFilter, setStateFilter] = useState<IFilterValue>({
    ...defaultFilterValue,
    field: 'state'
  })

  const [searchFilter, setSearchFilter] = useState<IFilterValue>({
    ...defaultFilterValue,
    field: 'firstName'
  })

  const handleGenderFilter: React.ChangeEventHandler<HTMLSelectElement> = ({
    target: { value }
  }) => setGenderFilter(prevState => ({ ...prevState, value }))

  const handleStateFilter: React.ChangeEventHandler<HTMLSelectElement> = ({
    target: { value }
  }) => setStateFilter(prevState => ({ ...prevState, value }))

  const handleSearchFilterChange = (searchFilters: IFilterValue[]) =>
    setSearchFilter(searchFilters[0])

  const filters = [genderFilter, searchFilter, stateFilter].filter(
    f => f.value !== ''
  )

  return (
    <div>
      <Header onSearchChange={handleSearchFilterChange} />
      <Layout>
        <Filters>
          <SectionLabel>Filters</SectionLabel>
          <FilterGroup>
            <FilterSelect
              onChange={handleGenderFilter}
              value={genderFilter.value}
            >
              {genderFilter.value === '' && <option>Gender</option>}
              <option>Male</option>
              <option>Female</option>
            </FilterSelect>
          </FilterGroup>
          <FilterGroup>
            <FilterSelect
              onChange={handleStateFilter}
              value={stateFilter.value}
            >
              {stateFilter.value === '' && <option>State</option>}
              {stateNames.map((state, i) => (
                <option key={i}>{state}</option>
              ))}
            </FilterSelect>
          </FilterGroup>
        </Filters>
        <Main>{children({ filters })}</Main>
      </Layout>
    </div>
  )
}

export default LayoutWrapper
