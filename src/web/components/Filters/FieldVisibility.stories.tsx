import React from 'react'

import FieldVisibilityFilters from './FieldVisibility'
import { FilterGroup } from '../Layout'

export default {
  component: FieldVisibilityFilters,
  title: 'Field visibility filters'
}

export const filters = () => (
  <FilterGroup>
    <FieldVisibilityFilters />
  </FilterGroup>
)
