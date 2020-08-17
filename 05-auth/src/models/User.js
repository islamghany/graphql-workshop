import {Schema,model} from 'mongoose';

const userSchema = new Schema({
  name: String,
  password: String,
  email: String,
  role:String,
},{
	timestamps:true
});

export default model('User', userSchema);