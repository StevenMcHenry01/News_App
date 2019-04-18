const { GraphQLServer } = require('graphql-yoga')
const Mutation = require('./resolvers/Mutation')
const Query = require('./resolvers/Query')
const db = require('./db')

// Create the GraphQL Yoga Server (Express Server)
function createServer() {
  return new GraphQLServer({
    typeDefs: 'src/schema.graphql',
    resolvers: {
      Mutation,
      Query,
    },
    // Turns off annoying warnings
    resolverValidationOptions: {
      requireResolversForResolveType: false,
    },
    // allows to access database through resolver files
    context: req => ({ ...req, db }),
  })
}

module.exports = createServer
