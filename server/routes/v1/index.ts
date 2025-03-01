import { Router } from 'express';
import { getAllImages } from '../../controllers/getAllImages';
import { getImage } from '../../controllers/getImage';
import { uploadImage } from '../../controllers/uploadImage';

const v1_routes: Router = Router()

try {
  v1_routes.get('/images', getAllImages);
  v1_routes.get('/images/:imageID', getImage);
  v1_routes.post('/images', uploadImage);
} catch (e) {
  console.error(`Error in routes: ${e}`);
}

export default v1_routes;