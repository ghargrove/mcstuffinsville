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

app.get('/', (_, res) => {
  res.send('No dist file available. Please run `npm run build`')
})

// We only have a single page, so redirect
app.get('*', (_, res) => {
  res.redirect('/')
})

app.listen(port, () =>
  // tslint:disable-next-line:no-console
  console.log(`Now listening on http://localhost:${3000}`)
)
