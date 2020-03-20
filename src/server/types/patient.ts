import { gql } from 'apollo-server-express'

const patientType = gql`
  type Patient {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    gender: String!
    address: String!
    city: String!
    state: String!
    zipCode: String!
    prescription: String!
  }

  type PatientEdges {
    cursor: String
    node: [Patient!]!
  }

  type PageInfo {
    hasNextPage: Boolean
  }

  type GetPatientsResponse {
    totalCount: Int
    edges: PatientEdges
    pageInfo: PageInfo
  }

  enum SortDirection {
    ASC
    DESC
  }

  input Filter {
    exact: Boolean
    field: String!
    value: String!
    threshold: Int
  }

  input Sort {
    field: String!
    direction: SortDirection!
  }

  extend type Query {
    getPatient(id: Int!): Patient
    getPatients(
      after: String
      filters: [Filter!]
      limit: Int
      sort: Sort
    ): GetPatientsResponse
  }
`

export default patientType
