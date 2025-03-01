import { Router } from 'express';
import { Request, Response } from 'express';
import { deleteImages } from '../controllers/deleteImages'

const routes: Router = Router()

try {
    routes.get('/', (req: Request, res: Response) => {
      res.send('Server is running!');
    });
    routes.get('/cron/delete-images', async (req: Request, res: Response) => {
        console.log('|deleteImages| - RUNNING');
        try {
          const result = await deleteImages();
          console.log('|deleteImages| - Success');
          res.json({ message: 'deleteImages Success', result });
        } catch (error) {
            console.log('|deleteImages| - Fail', error );
          res.status(500).json({ message: 'deleteImages Fail', error });
        }
      });

} catch (e) {
  console.error(`Error in routes: ${e}`);
}

export default routes;