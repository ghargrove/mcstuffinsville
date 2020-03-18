import matchSorter from 'match-sorter'
import { IResolvers } from 'graphql-tools'

import { decodeCursor, encodeCursor } from '../helpers'
import { getPatients, IPatient } from '../store'

interface IPatientFilter {
  exact: boolean
  field: keyof IPatient
  threshold: number
  value: string
}

interface IPatientsInput {
  after?: string
  limit?: number
  filters?: IPatientFilter[]
}

interface IPatientsResponse {
  totalCount: number
  edges: {
    cursor: string | null
    node: IPatient[]
  }
  pageInfo: {
    hasNextPage: boolean
  }
}

/**
 * Generate edge data for patients. I extracted this to keep the resolver slim.
 *
 * @param patients - Array of patient data to paginate
 * @param after - The cursor indicates where to start
 * @param limit - Number of patients included in the data set
 */
const patientEdges = (
  patients: IPatient[],
  after: string,
  limit: number | undefined
) => {
  // If a cursor wasn't provided use the first patient to generate one
  const cursor = after || encodeCursor(patients[0].email)
  const startIndex = patients.findIndex(
    ({ email }) => decodeCursor(cursor) === email
  )

  // If no limit is provided return the entire list of patients
  const endIndex =
    limit !== undefined && startIndex + limit < patients.length
      ? startIndex + limit - 1
      : patients.length - 1

  // Generate a cursor pointing at the next patient
  const nextPatient = patients[endIndex + 1]
  const nextCursor =
    nextPatient !== undefined ? encodeCursor(nextPatient.email) : null

  return {
    nextCursor,
    range: [startIndex, endIndex + 1]
  }
}

const patientResolvers: IResolvers = {
  Query: {
    getPatient: (_, { id }: { id: number }) => getPatients()[id],
    getPatients: (
      _,
      { after, filters = [], limit }: IPatientsInput
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

      const { nextCursor, range } = patientEdges(
        patients,
        after || encodeCursor(patients[0].email),
        limit
      )

      return {
        totalCount: patients.length,
        edges: {
          cursor: nextCursor,
          node: patients.slice(...range)
        },
        pageInfo: {
          hasNextPage: nextCursor !== null
        }
      }
    }
  }
}

export default patientResolvers
