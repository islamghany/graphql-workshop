import {ApolloServer,gql}  from 'apollo-server-express';
import express from 'express';

import dotenv from 'dotenv';
import typeDefs from './typeDefs';
import Mutation from './resolvers/Mutation'
import Query from './resolvers/Query'

import mongoose from 'mongoose'
const app = express();

dotenv.config();

const server = new ApolloServer({
	 typeDefs,
	 resolvers:{Query,Mutation}
	});

server.applyMiddleware({ app });
 
mongoose.connect(process.env.MONGO_DB,{
	useNewUrlParser:true,
	useFindAndModify:false,
	useUnifiedTopology:true,
	useCreateIndex:true
})
.then((res)=>{
	app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    );
})
.catch(err=>console.log('err'))