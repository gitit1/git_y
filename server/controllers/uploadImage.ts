import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import config from '../config';
import Image from '../models/imageModel';

interface MulterRequest extends Omit<Request, 'file'> {
  file?: Express.Multer.File;
}

const configureStorage = () =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, config.images_folder);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      // Create a serial name using timestamp and a random number
      const serialName = `${Date.now()}-${Math.floor(Math.random() * 1e9)}${ext}`;
      cb(null, serialName);
    },
  });
  
const upload = multer({
  storage: configureStorage(),
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Invalid file type. Only images are allowed.'));
    }
    cb(null, true);
  }
}).single('image');

export const uploadImage = async (req: MulterRequest, res: Response): Promise<void> => {
  console.log('|uploadImage| - RUNNING');
  upload(req as Request, res, async (err: any) => {
    if (err) {
      console.log('|clearExpiredImages| - Upload error', err);
      return res.status(500).json({ message: 'Upload error', error: err });
    }
    if (!req.file) {
      console.log('|uploadImage| - No image uploaded');
      return res.status(400).json({ message: 'No image uploaded' });
    }

    try {
      const fileName = req.file.filename;
      const imageUrl = `${config.base_url}/v1/images/${fileName}`;
      const expirationDate = new Date(req.body.expirationDate);

      // Save image metadata in MongoDB
      const imageRecord = new Image({ fileName, expirationDate });

      await Image.insertMany([imageRecord]);
      console.log(`|uploadImage| - image ${fileName} was saved.`);

      res.status(201).json({ fileName, expirationDate, imageUrl });

    } catch (error) {
      console.error('|uploadImage| - Error saving image record:', error);
      res.status(500).json({ message: 'Server error', error });
    }
  });
};