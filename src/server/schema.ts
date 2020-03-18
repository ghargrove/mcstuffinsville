import { gql } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'

import patientResolvers from './resolvers/patient'
import patientType from './types/patient'

const baseTypeDef = gql`
  type Query
`

/**
 * GraphQL schema that can be used by the apollo server
 */
const schema = makeExecutableSchema({
  typeDefs: [baseTypeDef, patientType],
  resolvers: patientResolvers
})

export default schema
