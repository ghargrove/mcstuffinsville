import React from 'react'

import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import styled from 'styled-components'

import { IPatient } from '../../server/store'
import { IFilterValue } from './Layout/Layout'
import PatientGrid from './Patients/Grid'
import Scroll from './Scroll'

interface IGetPatientsResponse {
  getPatients: {
    totalCount: number
    edges: {
      cursor: string | null
      node: IPatient[]
    }
  }
}

const getPatientsQuery = gql`
  query getPatients($after: String, $filters: [Filter!], $limit: Int) {
    getPatients(after: $after, filters: $filters, limit: $limit) {
      totalCount
      edges {
        cursor
        node {
          id
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
  padding-bottom: 1rem;

  border-bottom: solid 1px blueviolet;

  margin-bottom: 1rem;
`

interface IPatientsProps {
  filters: IFilterValue[]
}

const Patients: React.FC<IPatientsProps> = ({ filters }) => {
  const variables = {
    filters,
    limit: 50
  }

  const { loading, error, data, fetchMore } = useQuery<IGetPatientsResponse>(
    getPatientsQuery,
    {
      variables
    }
  )

  if (error) {
    return <div>Whoops</div>
  }

  if (loading) {
    return <div>Loading patients...</div>
  }

  if (data === undefined) {
    return <div>Whoops</div>
  }

  const {
    totalCount,
    edges: { cursor, node: patients }
  } = data.getPatients || {}

  const getMoreData = () => {
    if (!loading && cursor !== null) {
      fetchMore({
        query: getPatientsQuery,
        variables: { ...variables, after: cursor },

        updateQuery: (prevResult, { fetchMoreResult }) => {
          // TODO: handle no `fetchMoreResult`
          const {
            getPatients: {
              edges: { node: oldPatients }
            }
          } = prevResult

          const newPatients = fetchMoreResult?.getPatients.edges.node || []
          const newCursor = fetchMoreResult?.getPatients.edges.cursor

          return {
            getPatients: {
              ...prevResult.getPatients,
              edges: {
                ...prevResult.getPatients.edges,
                cursor: newCursor,
                node: [...oldPatients, ...newPatients]
              }
            }
          } as IGetPatientsResponse
        }
      })
    }
  }

  return (
    <PatientsWrapper>
      <div>Showing {totalCount} patients</div>
      <Scroll onBoundaryReached={getMoreData}>
        <PatientGrid patients={patients} />
      </Scroll>
    </PatientsWrapper>
  )
}

export default Patients
