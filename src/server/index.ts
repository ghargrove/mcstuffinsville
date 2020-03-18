import { ApolloServer, gql } from 'apollo-server-express'
import express from 'express'

import schema from './schema'

const port = 3000
const server = new ApolloServer({ schema })
const app = express()

server.applyMiddleware({ app })

app.get('/', (_, res) => {
  res.redirect('/graphql')
})

app.listen(port, () =>
  // tslint:disable-next-line:no-console
  console.log(`Now listening on http://localhost:${3000}`)
)
