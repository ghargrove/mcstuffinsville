import React, { useState } from 'react'

import { useQuery } from '@apollo/react-hooks'
import styled from 'styled-components'

import { IPatientSort, SortDirection } from '../../../server/resolvers/patient'
import {
  IGetPatientsResponse,
  getPatientsQuery
} from '../../queries/getPatients'
import { IFilter } from '../Filters'
import { SecondaryText } from '../Generic'
import PatientGrid from '../Patients/Grid'
import { SortRow } from './Grid/Row'
import Scroll from '../Scroll'
import SortSelect from './SortSelect'

const PatientsWrapper = styled.div`
  padding: ${props => props.theme.spacing.space400};
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

  // Support lazy loading
  const fetchMoreData = () => {
    if (!loading && cursor !== null) {
      fetchMore({
        query: getPatientsQuery,
        variables: { ...variables, after: cursor },

        updateQuery: (prevResult, { fetchMoreResult }) => {
          const {
            getPatients: {
              totalCount: prevTotalCount,
              edges: { node: oldPatients }
            }
          } = prevResult

          const newPatients = fetchMoreResult?.getPatients.edges.node || []
          const newCursor = fetchMoreResult?.getPatients.edges.cursor
          const node = [...oldPatients, ...newPatients]

          // Had a weird issue where if there was a very small number of results
          // left it could trigger twice causing duplicates. If that occurs just
          // discard the extra fetch
          if (node.length > prevTotalCount) {
            return prevResult
          }

          return {
            getPatients: {
              ...prevResult.getPatients,
              edges: {
                ...prevResult.getPatients.edges,
                cursor: newCursor,
                node
              }
            }
          } as IGetPatientsResponse
        }
      })
    }
  }

  return (
    <PatientsWrapper>
      <Scroll onBoundaryReached={fetchMoreData}>
        <SortRow>
          <SortSelect onSortChange={handleSortChange} sort={sort} />
          <SecondaryText small>Showing {totalCount} patients</SecondaryText>
        </SortRow>
        <PatientGrid
          patients={patients}
          loading={loading}
          error={error !== undefined}
        />
      </Scroll>
    </PatientsWrapper>
  )
}

export default Patients
