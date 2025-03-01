import cron from 'node-cron';
import { deleteImages } from '../controllers/deleteImages'

console.log('CRON JOB LOADED - |deleteImages|');

cron.schedule('0 0 * * *', async () => {
  deleteImages();
});
