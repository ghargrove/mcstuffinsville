import path from 'path'

import { ApolloServer } from 'apollo-server-express'
import express from 'express'

import schema from './schema'

const distPath = path.resolve(__dirname, '../../dist')
const port = 3000

const server = new ApolloServer({ schema })
const app = express()

app.use(express.static(distPath))
server.applyMiddleware({ app })

// Serve app
app.get('/', (_, res) => {
  res.send('helllo')
})

// We only have a single page, so redirect
app.get('*', (_, res) => {
  res.redirect('/')
})

app.listen(port, () =>
  // tslint:disable-next-line:no-console
  console.log(`Now listening on http://localhost:${3000}`)
)
