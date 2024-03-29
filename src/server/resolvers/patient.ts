import matchSorter from 'match-sorter'
import { IResolvers } from 'graphql-tools'

import { decodeCursor, encodeCursor } from '../helpers'
import { getPatients, IPatient, ISearchablePatient } from '../store'

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC'
}

interface IPatientFilter {
  exact: boolean
  field: keyof IPatient
  threshold: number
  value: string
}

export interface IPatientSort {
  direction: SortDirection
  field: 'id' | 'firstName' | 'lastName' | 'email' | 'city' | 'state'
}

interface IGetPatientsInput {
  after?: string
  filters?: IPatientFilter[]
  limit?: number
  sort?: IPatientSort
}

interface IGetPatientsResponse {
  totalCount: number
  edges: {
    cursor: string | null
    node: ISearchablePatient[]
  }
  pageInfo: {
    hasNextPage: boolean
  }
}

/**
 * Generate edge data for patient pagination. I extracted this to keep the resolver slim.
 *
 * @param patients - Array of patient data to paginate
 * @param after - The cursor indicates where to start
 * @param limit - Number of patients included in the data set
 */
const paginatePatients = (
  patients: ISearchablePatient[],
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

  // Generate a cursor pointing at the next patient (if there is one)
  const nextPatient = patients[endIndex + 1]
  const nextCursor =
    nextPatient !== undefined ? encodeCursor(nextPatient.email) : null

  return {
    nextCursor,
    range: [startIndex, endIndex + 1]
  }
}

/**
 * Sort a list of patients
 *
 * @param patients - Array of patient data
 * @param sort - Object indicating how the patients should be sorted
 */
const sortPatients = (patients: ISearchablePatient[], sort: IPatientSort) => {
  const { direction, field } = sort
  return patients.sort((a, b) => {
    if (a[field] < b[field]) {
      return direction === SortDirection.ASC ? -1 : 1
    } else if (a[field] > b[field]) {
      return direction === SortDirection.ASC ? 1 : -1
    } else {
      return 0
    }
  })
}

const patientResolvers: IResolvers = {
  Query: {
    getPatient: (_, { id }: { id: number }) => getPatients()[id],
    getPatients: (
      _,
      { after, filters = [], limit, sort }: IGetPatientsInput
    ): IGetPatientsResponse => {
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

      // Short circuit if we have no patients
      if (patients.length === 0) {
        return {
          totalCount: 0,
          edges: {
            cursor: null,
            node: []
          },
          pageInfo: {
            hasNextPage: false
          }
        }
      }

      if (sort) {
        patients = sortPatients(patients, sort)
      }

      const { nextCursor, range } = paginatePatients(
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
