import Image from "../../models/Image";
import path from 'path'

export default {
  getImage(image: Image) {
    
    
    return {
      id: image.id,
      url: `http://localhost:3333/uploads/${image.path}`
    };
  },

  getImages(images: Image[]) {
    return images.map((image) => this.getImage(image));
  },
};
