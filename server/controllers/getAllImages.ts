import { Request, Response } from 'express';
import Image from '../models/imageModel';

// Fetch all images from the database - Internal use
export const getAllImages = async (req: Request, res: Response): Promise<void> => {
  console.log('|getAllImages| - RUNNING');
  try {
    const images = await Image.find();
    console.log('|getAllImages| - Success');
    res.status(200).json(images);
  } catch (error) {
    console.log('|getAllImages| - Fail');
    res.status(500).json({ message: 'Failed to retrieve images' });
  }
};