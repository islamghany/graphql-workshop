const {gql} = require('apollo-server-express');



module.exports = gql`
  enum SORT{
  	CREATEDAT_DECS
    CREATEDAT_ASC
    UPDATEDAT_DECS
    UPDATEDAT_ASC  
  }
  type Post {
    id: ID!
    body: String!
    username: String!
    createdAt:String
    updatedAt:String
  }
  type User{
  	id:ID!
    name:String!
    email:String!
    password:String!
  }
  type Query {
    getPosts: [Post]
    user(id:ID!):User
    viewer:User!
  }
  type Mutation {
  	addPost(body:String!,username:String!):Post
  	deletePost(id:ID!):Post
  	updatePost(body:String,id:ID!):Post
  	createUser(name:String!,email:String!,password:String!):User
  	login(email:String!,password:String!):String
  }
`;