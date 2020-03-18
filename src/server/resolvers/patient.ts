import { IResolvers } from 'graphql-tools'

import { getPatients } from '../store'

const patientResolvers: IResolvers = {
  Query: {
    getPatient: (_, { id }: { id: number }) => getPatients()[id],
    getPatients: () => getPatients()
  }
}

export default patientResolvers
