const path = require('path')

const Post = require('./types/,models/Post')
const User = require('./types/,models/User')
const {Mutation,UserInputType,AuthPayload}=require('./types/resolvers/Mutation');
const Query=require('./types/resolvers/Query');

const { makeSchema } = require('@nexus/schema')
const { nexusSchemaPrisma } = require('nexus-plugin-prisma/schema')

export const schema = makeSchema({
  types:[Post,User,Mutation,UserInputType,Query,AuthPayload],
  plugins: [nexusSchemaPrisma()],
  outputs: {
    schema: path.join(__dirname, './../schema.graphql'),
    typegen: path.join(__dirname, './generated/nexus.js'),
  }
});

