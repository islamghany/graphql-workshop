import {Schema,model} from 'mongoose';

const ImageSchema = new Schema({
  filename: String,
  publicId: String,
  format: String,
  url:String,
},{
	timestamps:true
});

export default model('Image', ImageSchema);