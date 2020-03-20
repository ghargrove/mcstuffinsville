import React from 'react'

import '@testing-library/jest-dom/extend-expect'
import { MockedProvider, MockedResponse } from '@apollo/react-testing'
import { fireEvent, render, wait } from '@testing-library/react'

import { getPatients } from '../../server/store'
import { getPatientsQuery } from '../queries/getPatients'
import App from './App'

const testPatients = getPatients().slice(0, 6)
const mocks: MockedResponse[] = [
  // All patients
  {
    request: {
      query: getPatientsQuery,
      variables: {
        filters: [],
        limit: 50,
        sort: {
          direction: 'ASC',
          field: 'id'
        }
      }
    },
    result: {
      data: {
        getPatients: {
          totalCount: 5,
          edges: {
            cursor: null,
            node: testPatients
          }
        }
      }
    }
  },
  // State filter response
  {
    request: {
      query: getPatientsQuery,
      variables: {
        filters: [{ field: 'state', value: 'Arizona', threshold: 9 }],
        limit: 50,
        sort: {
          direction: 'ASC',
          field: 'id'
        }
      }
    },
    result: {
      data: {
        getPatients: {
          totalCount: 1,
          edges: {
            cursor: null,
            node: [testPatients[1]]
          }
        }
      }
    }
  }
]

it('filters results by state', async () => {
  const { findByTestId, getByTestId } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>
  )

  // Deprecation: I used this because `waitFor` isn't type yet
  await wait(() => undefined)
  expect(await findByTestId('total-count')).toHaveTextContent(
    'Showing 5 patients'
  )

  // Trigger Arizona
  fireEvent.change(getByTestId('state-filter'), {
    target: { value: 'Arizona' }
  })

  await wait(() => undefined)
  expect(await findByTestId('total-count')).toHaveTextContent(
    'Showing 1 patients'
  )
})
