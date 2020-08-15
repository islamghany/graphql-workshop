const Post = require('../models/Post');
const User = require('../models/User');

module.exports = {
	async getPosts(parent,{sortBy,skip,limit},ctx,info) {
      try {
        const posts = await Post.find({})
        // .sort({
        // 	createdAt:-1
        // }).skip(skip).limit(limit);
        return posts;
      } catch (err) {
        throw new Error("Faild to fetch");
      }
    },
    async user(parent,{id},ctx,info){
       let user; 
       try{
       	user = await User.findById(id);
       }catch(err){
        throw new Error("Faild to fetch");
       }
       if(!user){
       	 throw new Error("User Does't exist");
       }

       return user;
    }
}