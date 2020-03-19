import React from 'react'

import styled from 'styled-components'

import { Select } from './Generic'

const SortBySelect = styled(Select)`
  width: 200px;
`

interface ISortSelectProps {
  onSortChange: (sortBy: string) => void
  value: string
}

const SortSelect: React.FC<ISortSelectProps> = ({ onSortChange, value }) => {
  const handleSortChange: React.ChangeEventHandler<HTMLSelectElement> = ({
    target: { value: sortBy }
  }) => onSortChange(sortBy)

  return (
    <SortBySelect onChange={handleSortChange} value={value}>
      <option value="">Sort by</option>
      <option value="firstName">First name</option>
      <option value="lastName">Last name</option>
      <option value="email">Email</option>
      <option value="city">City</option>
      <option value="state">State</option>
    </SortBySelect>
  )
}

export default SortSelect
