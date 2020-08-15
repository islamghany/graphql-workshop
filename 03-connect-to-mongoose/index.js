const {ApolloServer} = require('apollo-server-express')
const express = require("express");
const mongoose = require('mongoose');

const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const typeDefs = require('./typeDefs')

const port = 4000;
const app = express();

// adding middlewares with app here

const server = new ApolloServer({
  typeDefs,
  resolvers:{
    Query,
    Mutation,
  }
});

server.applyMiddleware({app})
mongoose
  .connect(process.env.MONGO_DB, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB Connected');
    app.listen({ port }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
  }).catch(err=>console.log(err)
  )
 