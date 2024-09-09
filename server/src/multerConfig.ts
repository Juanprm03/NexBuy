import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinaryConfig';

// Define the parameters for the Cloudinary storage
interface CloudinaryStorageParams {
    folder: string;
    allowed_formats: string[];
}

// Create a new Cloudinary storage instance
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', 
    allowed_formats: ['jpg', 'png'],
  } as CloudinaryStorageParams,
});

// Create a new Multer upload instance
const upload = multer({ storage: storage });

export default upload;