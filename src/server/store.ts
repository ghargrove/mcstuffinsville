import camelcase from 'lodash.camelcase'
import patients from './patients.json'

let mappedPatients: IPatient[] = []

export interface IPatient {
  id: number
  firstName: string
  lastName: string
  email: string
  gender: string
  address: string
  city: string
  state: string
  zipCode: string
  prescription: string
}

/**
 * Get patient data. This function will handle converting the json
 * data into camelcased keys
 */
export const getPatients = () => {
  // If we're already mapped the patient data just return it
  if (mappedPatients.length > 0) {
    return mappedPatients
  }

  mappedPatients = patients.map(p => {
    const patient: { [key: string]: any } = {}
    for (const [k, v] of Object.entries(p)) {
      patient[camelcase(k)] = v
    }
    return patient as IPatient
  })

  return mappedPatients
}