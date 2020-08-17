import User from '../models/User';
import {AuthenticationError} from 'apollo-server-express'

export default {
	async viewer(parent,args,ctx,info){
		const {user} = ctx;
		if(!user || !user.userId){
			throw new AuthenticationError('you must be logged in to query this schema');
		}
		const existedUser =await User.findById(user.userId)
		return existedUser;
	}
}