import React from 'react'

import apolloStorybookDecorator from 'apollo-storybook-react'

import Patients from './Patients'

export default {
  component: Patients,
  title: 'Patients list'
}

// Copied a couple rows from the json
const patients = [
  {
    id: 1,
    firstName: 'Bliss',
    lastName: 'Danbye',
    email: 'bdanbye0@stanford.edu',
    gender: 'Female',
    address: '737 Coolidge Terrace',
    city: 'Newark',
    state: 'New Jersey',
    zipCode: '07104',
    prescription:
      'ARNICA MONTANA, BELLIS PERENNIS, BRYONIA CRETICA SUBSP. DIOICA ROOT, GUAIACUM OFFICINALE RESIN, LEDUM PALUSTRE TWIG, RUTA GRAVEOLENS WHOLE, TOXICODENDRON PUBESCENS LEAF, and VISCUM ALBUM FRUIT'
  },
  {
    id: 2,
    firstName: 'Grove',
    lastName: 'Worg',
    email: 'gworg1@webmd.com',
    gender: 'Male',
    address: '990 Hanson Pass',
    city: 'Tucson',
    state: 'Arizona',
    zipCode: '85748',
    prescription: 'Amitriptyline Hydrochloride'
  },
  {
    id: 3,
    firstName: 'Jeff',
    lastName: 'Marquot',
    email: 'jmarquot2@unicef.org',
    gender: 'Male',
    address: '12 Sunfield Alley',
    city: 'Orlando',
    state: 'Florida',
    zipCode: '32885',
    prescription: 'GLYCERIN'
  },
  {
    id: 4,
    firstName: 'Ivie',
    lastName: 'Francillo',
    email: 'ifrancillo3@51.la',
    gender: 'Female',
    address: '9987 Oakridge Way',
    city: 'Fort Wayne',
    state: 'Indiana',
    zipCode: '46825',
    prescription:
      'Bellis Perennis, Hypericum Perfomatum,Toxicodendron Pubscens Leaf, Ruta Graveolens Flowering Top'
  },
  {
    id: 5,
    firstName: 'Rogerio',
    lastName: 'Danilyak',
    email: 'rdanilyak4@cnn.com',
    gender: 'Male',
    address: '7015 Raven Crossing',
    city: 'Van Nuys',
    state: 'California',
    zipCode: '91499',
    prescription: 'Niacinamide'
  }
]

// Copied & modfied from server
const typeDefs = `
  type Patient {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    gender: String!
    address: String!
    city: String!
    state: String!
    zipCode: String!
    prescription: String!
  }

  type PatientEdges {
    cursor: String
    node: [Patient!]!
  }

  type PageInfo {
    hasNextPage: Boolean
  }

  type GetPatientsResponse {
    totalCount: Int
    edges: PatientEdges
    pageInfo: PageInfo
  }

  enum SortDirection {
    ASC
    DESC
  }

  input Filter {
    exact: Boolean
    field: String!
    value: String!
    threshold: Int
  }

  input Sort {
    field: String!
    direction: SortDirection!
  }

  type Query {
    getPatients(
      after: String
      filters: [Filter!]
      limit: Int
      sort: Sort
    ): GetPatientsResponse
  }
`

export const patientsGrid = () => <Patients filters={[]} />

patientsGrid.story = {
  decorators: [
    apolloStorybookDecorator({
      mocks: {
        Query: () => ({
          getPatients: () => ({
            totalCount: patients.length,
            edges: {
              cursor: null,
              node: patients
            },
            pageInfo: {
              hasNextPage: false
            }
          })
        })
      },
      typeDefs
    })
  ]
}
