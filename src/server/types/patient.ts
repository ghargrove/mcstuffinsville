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

  input Filter {
    exact: Boolean
    field: String!
    value: String!
    threshold: Int
  }

  extend type Query {
    getPatient(id: Int!): Patient
    getPatients(after: String, filters: [Filter!], first: Int): [Patient!]!
  }
`

export default patientType
