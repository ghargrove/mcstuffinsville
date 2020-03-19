import React from 'react'

import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import styled from 'styled-components'

// Load the IPatient type from the server
import { IPatient } from '../../server/store'

interface IGetPatientsResponse {
  getPatients: {
    edges: {
      cursor: string | null
      node: IPatient[]
    }
  }
}

const getPatientsQuery = gql`
  query getPatients($after: String, $filters: [Filter!], $limit: Int) {
    getPatients(after: $after, filters: $filters, limit: $limit) {
      edges {
        node {
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

const PatientsWrapper = styled.div`
  /* background-color: #a1a1a1; */
  color: #181719;
  /* padding: 1rem; */
`

const PatientsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  row-gap: 0.5rem;

  /* height: 100vh; */
`

const PatientHeaderCell = styled.div`
  /* background-color: white; */
  border-bottom: solid 1px #a1a1a1;
  padding: 0.5rem 0;
`

const PatientDataCell = styled.div`
  /* background-color: white; */
  border-bottom: solid 1px #efefef;
  padding: 0 0 0.5rem 0;
`

const Patients: React.FC = () => {
  const { loading, error, data } = useQuery<IGetPatientsResponse>(
    getPatientsQuery,
    {
      variables: {
        limit: 50
      }
    }
  )

  if (error) {
    return <div>Whoops</div>
  }

  if (loading) {
    return <div>Loading patients...</div>
  }

  const patients = data?.getPatients.edges.node || []

  return (
    <PatientsWrapper>
      <PatientsGrid>
        <PatientHeaderCell>First Name</PatientHeaderCell>
        <PatientHeaderCell>Last name</PatientHeaderCell>
        <PatientHeaderCell>Email</PatientHeaderCell>
        <PatientHeaderCell>Gender</PatientHeaderCell>
        <PatientHeaderCell>Address</PatientHeaderCell>
        <PatientHeaderCell>City</PatientHeaderCell>
        <PatientHeaderCell>State</PatientHeaderCell>
        <PatientHeaderCell>Zip Code</PatientHeaderCell>
        <PatientHeaderCell>Prescriptions</PatientHeaderCell>

        {patients.map((p, i) => (
          <React.Fragment key={i}>
            <PatientDataCell>{p.firstName}</PatientDataCell>
            <PatientDataCell>{p.lastName}</PatientDataCell>
            <PatientDataCell>{p.email}</PatientDataCell>
            <PatientDataCell>{p.gender}</PatientDataCell>
            <PatientDataCell>{p.address}</PatientDataCell>
            <PatientDataCell>{p.city}</PatientDataCell>
            <PatientDataCell>{p.state}</PatientDataCell>
            <PatientDataCell>{p.zipCode}</PatientDataCell>
            <PatientDataCell>{p.prescription}</PatientDataCell>
          </React.Fragment>
        ))}
      </PatientsGrid>
    </PatientsWrapper>
  )
}

export default Patients
