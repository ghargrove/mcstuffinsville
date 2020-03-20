import gql from 'graphql-tag'

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
