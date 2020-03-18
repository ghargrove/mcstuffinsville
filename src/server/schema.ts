import { gql } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'

import patientType from './types/patient'

import patientResolvers from './resolvers/patient'

const baseTypeDef = gql`
  type Query
`

const schema = makeExecutableSchema({
  typeDefs: [baseTypeDef, patientType],
  resolvers: patientResolvers
})

export default schema
