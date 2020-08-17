import {Schema,model} from 'mongoose';

const postSchema = new Schema({
  text: String,
  body:String,
  user: {
    // referencing the User docutment
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});
export default model('Post',postSchema)