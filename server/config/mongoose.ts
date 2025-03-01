import mongoose from 'mongoose';
import config from '../config';

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(config.db_images)
    .then(() => console.log('images DB connected'))
    .catch(err => console.error('images DB connection error:', err));
}

export default mongoose;