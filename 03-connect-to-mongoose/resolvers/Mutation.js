const Post = require('../models/Post');
const User = require('../models/User');

const jwt = require('jsonwebtoken')
const {AuthenticationError} = require('apollo-server-express');

module.exports = {
    async addPost(_,args,ctx,info){
       const {body,username} = args;
       let post = new Post({body,username});
       try{
       	 await post.save();
       }catch(err){
       	throw new Error("UnKnowen Error");
       }
       return post;
    },
    async deletePost(_,{id},ctx,info){
    	let post;
    	try{
           post = await Post.findByIdAndDelete(id);
    	}catch(err){
    	   throw new Error("post doesnot exist");
    	}
    	return post
    },
    async updatePost(_,{id,body},ctx,info){
    	let post;
    	try{
    		post = await Post.findById(id);
    	}catch(err){
    		throw new Error("UnKnowen Error");
    	}
    	if(!post){
    		throw new Error("post dosnot exist");
    	}

    	try{
           post.body =body;
           await post.save();
    	}catch(err){
    		throw new Error("UnKnowen Error");
    	}
    	return post;
    },
    async createUser(_,{name,password,email},ctx,info){
    	let user = new User({name,password,email});
    	try{
    		await user.save();
    	}catch(err){
    		throw new Error("UnKnowen Error");
    	}
    	return user;
    },
    async login(_,{name,email},ctx,info){
       let user;
       try{
       	user = await User.findOne({email});
       }catch(err){
    		throw new Error("UnKnowen Error");
    	}
    	if(!user){
    		throw new AuthenticationError("User Does't exist");
    	}
    	return jwt.sign(
        { "https://spaceapi.com/graphql": { name:user.name, email:user.email } },
        "SUPER_SECRET",
        { algorithm: "HS256", subject: user.id, expiresIn: "1d" }
      );
    }
}