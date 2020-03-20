import React from 'react'

import styled from 'styled-components'

import stateNames from './states.json'
import { IFilter } from './'
import { Link, Select, SectionLabel } from '../Generic'

const FilterSelect = styled(Select)`
  display: block;
  width: 100%;
`

interface IPatientFiltersProps {
  filters: { [key: string]: IFilter }
  onFilterChange: (filter: IFilter) => void
  onFilterClear: React.MouseEventHandler
}

const PatientFilters: React.FC<IPatientFiltersProps> = ({
  filters,
  onFilterChange,
  onFilterClear
}) => {
  const handleFilterChange: React.ChangeEventHandler<HTMLSelectElement> = ({
    target: { name, value }
  }) =>
    onFilterChange({
      ...filters[name],
      value
    })

  return (
    <React.Fragment>
      <SectionLabel>Filters</SectionLabel>
      <div style={{ marginBottom: '1rem' }}>
        <FilterSelect
          name="gender"
          onChange={handleFilterChange}
          value={filters.gender.value}
        >
          {filters.gender.value === '' && <option>Gender</option>}
          <option>Male</option>
          <option>Female</option>
        </FilterSelect>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <FilterSelect
          data-testid="state-filter"
          name="state"
          onChange={handleFilterChange}
          value={filters.state.value}
        >
          {filters.state.value === '' && <option>State</option>}
          {stateNames.map((state, i) => (
            <option key={i}>{state}</option>
          ))}
        </FilterSelect>
      </div>
      <Link onClick={onFilterClear}>Clear filters</Link>
    </React.Fragment>
  )
}

export default PatientFilters
