import {gql} from 'apollo-server-express';

export default gql`
    enum Role {
	  ADMIN
	  USER
	} 
    type User{
    	id:ID!
    	name:String!
    	email:String!
    	password:String!
    	role: Role
    } 
    type Post{
    	id:ID!
    	title:String!
    	body:String
    	user:User!
    }
    type Query{
    	viewer:SafeUser!
    #	posts:[Post]!
    }
    type Mutation{
    	login(email:String!,password:String!):PayloadUser!
    	signup(name:String!,email:String!,password:String!):PayloadUser!
    #	createPost(title:String!, body:String):Post!
    }
    type SafeUser{
    	id:ID!
    	name:String!
    	email:String!
    	role: Role
    }
    type PayloadUser{
    	user:SafeUser
    	token:String!
    }

`
