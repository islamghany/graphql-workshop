const {ApolloServer} = require('apollo-server-express');
const express = require('express');
const { createServer } = require('http');
const { createContext } = require('./context');
const { schema } = require('./schema')

const app = express();
const PORT = 4000;

const server = createServer(app);

const apollo = new ApolloServer({
	context: createContext,
	schema
})

apollo.applyMiddleware({ app });

server.listen({port:PORT},()=>console.log(`🚀 Server ready at http://localhost:${PORT}${apollo.graphqlPath}\n`))