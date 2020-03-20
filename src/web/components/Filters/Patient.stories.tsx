import React from 'react'

import PatientFilters from './Patient'

export default {
  component: PatientFilters,
  title: 'Patient filters'
}

export const filters = () => (
  <div style={{ width: '300px' }}>
    <PatientFilters
      filters={{
        state: { field: 'state', value: '', threshold: 9 },
        gender: { field: 'gender', value: '', threshold: 9 }
      }}
      onFilterChange={() => undefined}
      onFilterClear={() => undefined}
    />
  </div>
)
