import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';

const typeDefs = gql`
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
  type Query {
    getPatients: [Patient!]!
  }
`;

const resolvers = {
  Query: {
    getPatients: () => {
      return [{ email: 'test@email.com' }, { email: 'other@email.com' }];
    }
  }
};

const port = 3000;
const server = new ApolloServer({ resolvers, typeDefs });
const app = express();

server.applyMiddleware({ app });

app.get('/', (_, res) => {
  res.redirect('/graphql');
});

app.listen(port, () =>
  // tslint:disable-next-line:no-console
  console.log(`Now listening on http://localhost:${3000}`)
);
