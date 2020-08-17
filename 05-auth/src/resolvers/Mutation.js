import User from '../models/User';
import {AuthenticationError} from 'apollo-server-express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
export default {
	async login(parent,{email,password},ctx,info){
		 // 1. check if there is a user with that email
	    const user = await User.findOne({email});
	    if (!user) {
	      throw new Error(`No such user found for email ${email}`);
	    }
	    // 2. Check if their password is correct
	    const valid = await bcrypt.compare(password, user.password);
	    if (!valid) {
	      throw new Error('Invalid Password!');
	    }
	    // 3. generate the JWT Token
	    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET,{expiresIn:"1d"});

	    // 4. Return the user
	    console.log(user)
	    return {user,token};
	},

	async signup(parent,{name,email,password},ctx,info){
		// lowercase their email
	    email = email.toLowerCase();
	    //check if the email in the database
        let existingUser;
        existingUser = await User.findOne({email});
        if(existingUser){
        	throw new AuthenticationError('this email is existed please login insted!');
        }
	    // hash their password
	    password = await bcrypt.hash(password, 10);
	    // create the user in the database
	    const user = new User({   
	    	  name,
	      	  email,
	          password,
	          permissions:'USER',
	        });
	    await user.save();
	    // create the JWT token for them
	    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET,{expiresIn:"1d"});
	    
	    // Finalllllly we return the user to the browser
	    return {user,token};
	},
}