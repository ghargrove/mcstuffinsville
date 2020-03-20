import matchSorter from 'match-sorter'

export { default as FieldVisibilityFilters } from './FieldVisibility'
export { default as PatientFilters } from './Patient'
export * from './Patient'

export interface IFilter {
  field: string
  value: string
  threshold?: number
}

export const defaultFilterValue: IFilter = {
  field: '',
  value: '',
  threshold: matchSorter.rankings.CASE_SENSITIVE_EQUAL
}

export const defaultFilters: { [key: string]: IFilter } = {
  search: {
    ...defaultFilterValue,
    field: 'search',
    threshold: matchSorter.rankings.CONTAINS
  },
  gender: { ...defaultFilterValue, field: 'gender' },
  state: { ...defaultFilterValue, field: 'state' }
}
