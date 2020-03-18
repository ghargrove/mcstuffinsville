import patients from '../patients.json'

const patientResolvers = {
  Query: {
    getPatient: () => patients[0],
    getPatients: () => patients
  }
}

export default patientResolvers
