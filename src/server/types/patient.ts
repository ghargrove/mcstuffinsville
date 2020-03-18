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

  extend type Query {
    getPatient: Patient
    getPatients: [Patient!]!
  }
`

export default patientType
