import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'

const host = 'http://localhost:3000'
const client = new ApolloClient({
  cache: new InMemoryCache({
    addTypename: false
  }),
  link: new HttpLink({
    uri: `${host}/graphql`
  })
})

export default client
