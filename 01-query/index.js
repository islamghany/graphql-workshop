const { ApolloServer, gql } = require("apollo-server");
const { USERS } = require("./data.js");
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type Address {
    city: String
    houseNum: Int
    street: String
  }
  # This "User" type defines the queryable fields for every user in our data source.
  type User {
    id: ID!
    name: String!
    email: String
    address: Address!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  type Query {
    users: [User]!
    user(id: ID!): User!
  }
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves users from the "users" array above.
const resolvers = {
  Query: {
    users: (parent, args, ctx, info) => USERS,
    user: (parent, args, ctx, info) =>
      USERS.find((user) => user.id === args.id),
  },
};

// The ApolloServer constructor requires two parameters:  schema definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

// querying
/*
query user{
  user(id:"2"){
    name
    id
  }
}

query users{
  users{
    name
    email
    address{
      city
      street
    }
  }
}
*/
