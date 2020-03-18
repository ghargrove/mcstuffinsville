import matchSorter from 'match-sorter'
import { IResolvers } from 'graphql-tools'

import { getPatients, IPatient } from '../store'

interface IPatientFilter {
  exact: boolean
  field: keyof IPatient
  threshold: number
  value: string
}

interface IPatientsInput {
  filters: IPatientFilter[] | undefined
}

const patientResolvers: IResolvers = {
  Query: {
    getPatient: (_, { id }: { id: number }) => getPatients()[id],
    getPatients: (_, { filters }: IPatientsInput) => {
      let patients = getPatients()
      if (filters === undefined) {
        return patients
      }

      for (const { exact = false, field, threshold, value } of filters) {
        // If we're looking for an exact match just filter it out.
        // The same result could be had by providing threshold == matchSorter.ranking.CASE_SENSITIVE_EQUAL.
        // Mostly just added for demo & readability
        if (exact) {
          patients = patients.filter(patient => patient[field] === value)
          continue
        }

        patients = matchSorter(patients, value, {
          // Ranking is not required
          ...(threshold !== undefined ? { threshold } : {}),
          keys: [field]
        })
      }
      return patients
    }
  }
}

export default patientResolvers
