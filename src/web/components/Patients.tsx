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
          id
          email
          state
        }
      }
    }
  }
`

const PatientsWrapper = styled.div`
  background-color: orange;
  color: #181719;
  padding: 1rem;
`

const Patients: React.FC = () => {
  const { loading, error, data } = useQuery<IGetPatientsResponse>(
    getPatientsQuery,
    {
      variables: {
        limit: 100
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
      <ul>
        {patients.map((p, i) => (
          <li key={i}>
            {i} -> {p.email}
          </li>
        ))}
      </ul>
    </PatientsWrapper>
  )
}

export default Patients
