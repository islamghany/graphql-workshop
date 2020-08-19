import Image from '../models/Image';
import uploadImage from '../../utils/uploadImage'
export default {
	singleUpload: async (_, { file }) => {
		//extract image info
        const { stream, filename, mimetype, encoding } = await file;
        
        // upload to cloudinary
        const res = await uploadImage(stream);
        
        // save to database
        const image = new Image({
        	publicId: res.public_id,
        	url:res.url,
            format: res.format,
            filename
        });
        await image.save();

        // return the image data
        return image
      }
}