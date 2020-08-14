const { ApolloServer, gql } = require("apollo-server");
const { MOVIES } = require("./data.js");


const typeDefs = gql`
  type Movie {
    id:ID!
    name:String!
    dirctor:String!
    comeoutYear:String
  }
  type Query{
    movies:[Movie]!
  }
  input MovieInputData{
    name:String!
    dirctor:String!
    comeoutYear:String
  }
  type Mutation{
    createMovie(data:MovieInputData):Movie
  }
`;

const resolvers = {
  Query: {
    movies: (parent, atgs, ctx, info) => MOVIES,
  },
  Mutation: {
    createMovie(parent, {data}, ctx, info){
      let movie ={...data,id:(MOVIES.length+1).toString()}
      MOVIES.push(movie) 
      return movie
    }
  }
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
