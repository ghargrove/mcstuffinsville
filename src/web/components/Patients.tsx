import React, { useState } from 'react'

import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import styled from 'styled-components'

import { IPatientSort, SortDirection } from '../../server/resolvers/patient'
import { IPatient } from '../../server/store'
import { IFilter } from './Filters'
import PatientGrid from './Patients/Grid'
import Scroll from './Scroll'
import SortSelect from './SortSelect'

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

const SecondaryText = styled.p`
  font-size: 0.8rem;
  color: #5a565e;
`

const SortRow = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
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

  const handleSortChange = (sortBy: IPatientSort) => setSort(sortBy)

  const getMoreData = () => {
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
      <SortRow>
        <SortSelect onSortChange={handleSortChange} sort={sort} />
        <SecondaryText>Showing {totalCount} patients</SecondaryText>
      </SortRow>
      <Scroll onBoundaryReached={getMoreData}>
        <PatientGrid patients={patients} />
      </Scroll>
    </PatientsWrapper>
  )
}

export default Patients
