import gql from 'graphql-tag'

import { IPatient } from '../../server/store'

export interface IGetPatientsResponse {
  getPatients: {
    totalCount: number
    edges: {
      cursor: string | null
      node: IPatient[]
    }
  }
}

export const getPatientsQuery = gql`
  query getPatients(
    $after: String
    $filters: [Filter!]
    $limit: Int
    $sort: Sort
  ) {
    getPatients(after: $after, filters: $filters, limit: $limit, sort: $sort) {
      totalCount
      edges {
        cursor
        node {
          id
          firstName
          lastName
          email
          gender
          address
          city
          state
          zipCode
          prescription
        }
      }
    }
  }
`
