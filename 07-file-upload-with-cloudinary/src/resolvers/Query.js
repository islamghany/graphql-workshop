import Image from '../models/Image'


export default {
	 images(){
       return Image.find({})
	}
}