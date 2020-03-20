import React from 'react'

import styled from 'styled-components'

import { IPatientSort, SortDirection } from '../../server/resolvers/patient'
import { Select } from './Generic'

const SortBySelect = styled(Select)`
  width: 200px;
`

interface ISortSelectProps {
  onSortChange: (sortBy: IPatientSort) => void
  sort: IPatientSort
}

const SortSelect: React.FC<ISortSelectProps> = ({ onSortChange, sort }) => {
  const handleSortChange: React.ChangeEventHandler<HTMLSelectElement> = ({
    target: { name, value }
  }) => {
    onSortChange({
      ...sort,
      [name]: value
    })
  }

  return (
    <div>
      <SortBySelect
        placeholder="id"
        name="field"
        onChange={handleSortChange}
        value={sort.field}
      >
        <option value="id">Sort by</option>
        <option value="firstName">First name</option>
        <option value="lastName">Last name</option>
        <option value="email">Email</option>
        <option value="city">City</option>
        <option value="state">State</option>
      </SortBySelect>
      <SortBySelect
        name="direction"
        onChange={handleSortChange}
        style={{ marginLeft: '1rem' }}
        value={sort.direction}
      >
        <option value={SortDirection.ASC}>Ascending</option>
        <option value={SortDirection.DESC}>Descending</option>
      </SortBySelect>
    </div>
  )
}

export default SortSelect
