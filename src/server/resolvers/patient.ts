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
  after?: string
  first?: number
  filters?: IPatientFilter[]
}

interface IPatientsResponse {
  totalCount: number
  edges: {
    cursor: string
    node: IPatient[]
  }
}

// Helpers for encoding & decoding the cursor
const encodeCursor = (value: string) => Buffer.from(value).toString('base64')
const decodeCursor = (cursor: string) =>
  Buffer.from(cursor, 'base64').toString('utf-8')

const patientResolvers: IResolvers = {
  Query: {
    getPatient: (_, { id }: { id: number }) => getPatients()[id],
    getPatients: (
      _,
      { after, filters = [], first }: IPatientsInput
    ): IPatientsResponse => {
      // TODO:
      // We'll need to create a cursor & edges
      // How to implement this w/ the filter

      let patients = getPatients()
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

      // If a cursor wasn't provided use the first patient to generate one
      const cursor = after || encodeCursor(patients[0].email)
      const startIndex = patients.findIndex(
        ({ email }) => decodeCursor(cursor) === email
      )

      // If no limit is provided return the entire list of patients
      const endIndex =
        first !== undefined ? startIndex + first : patients.length

      // Generate the cursor for the next set of data
      const nextCursor = encodeCursor(patients[endIndex].email)

      return {
        totalCount: patients.length,
        edges: {
          cursor,
          node: patients.slice(startIndex, endIndex)
        }
      }
    }
  }
}

export default patientResolvers
