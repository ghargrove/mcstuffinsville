import React, { useState } from 'react'

import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import styled from 'styled-components'

import { IPatientSort, SortDirection } from '../../server/resolvers/patient'
import { IPatient } from '../../server/store'
import { IFilter } from './Filters'
import PatientGrid from './Patients/Grid'

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
  query getPatients(
    $after: String
    $filters: [Filter!]
    $limit: Int
    $sort: Sort
  ) {
    getPatients(after: $after, filters: $filters, limit: $limit, sort: $sort) {
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
  color: #181719;
  padding: 1rem;
`

interface IPatientsProps {
  filters: IFilter[]
}

const Patients: React.FC<IPatientsProps> = ({ filters }) => {
  const [sort, setSort] = useState<IPatientSort>({
    direction: SortDirection.ASC,
    field: 'id'
  })

  const variables = {
    filters,
    limit: 50,
    sort
  }

  const { loading, error, data, fetchMore } = useQuery<IGetPatientsResponse>(
    getPatientsQuery,
    {
      variables
    }
  )

  const {
    totalCount,
    edges: { cursor, node: patients }
  } = data?.getPatients || {
    totalCount: 0,
    edges: { cursor: null, node: [] }
  }

  const handleSortChange = (sortBy: IPatientSort) => setSort(sortBy)

  const fetchMoreData = () => {
    if (!loading && cursor !== null) {
      fetchMore({
        query: getPatientsQuery,
        variables: { ...variables, after: cursor },

        updateQuery: (prevResult, { fetchMoreResult }) => {
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
      <PatientGrid
        onGetMoreData={fetchMoreData}
        onPatientSort={handleSortChange}
        patients={patients}
        sort={sort}
        totalPatientCount={totalCount}
        loading={loading}
        error={error !== undefined}
      />
    </PatientsWrapper>
  )
}

export default Patients
