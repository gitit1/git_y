import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

interface Config {
  port: number;
  db_images: string;
  images_folder: string;
  base_url: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 3031,
  db_images: process.env.DB_IMAGES || '',
  images_folder: process.env.NODE_ENV === 'test' ? path.join(process.cwd(), 'test_images') : path.join(process.cwd(), process.env.IMAGES_FOLDER || 'public/images'),
  base_url: process.env.BASE_URL || `http://localhost:${process.env.PORT || 3031}`
};

if (!config.db_images) {
  console.warn('DB_IMAGES is not set in .env file.');
}

export default config;