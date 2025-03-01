import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import path from 'path';

import config from './config';
import './config/mongoose';
import './cron';

import routes from './routes';
import v1_routes from './routes/v1';


const app: Express = express();
const port = config.port;

app.use(
    express.urlencoded({
      extended: true
    })
);
app.use(cors());
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, '/public/images'))); // allow to display data from images folder

// Internal Check for server data
app.get('/', (req: Request, res: Response) => {
  res.send('Server is running!');
});

app.use('/', routes);
app.use('/v1', v1_routes);

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});

export default app;