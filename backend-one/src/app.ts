import express, { Application, Request, Response } from 'express';
import cors, { CorsOptions } from 'cors';
import router from './app/router';
const app: Application = express();
type CorsOptionsCallback = (err: Error | null, allow: boolean) => void;

app.use(express.json());
const corsOptions: CorsOptions = {
  origin: function (origin: string | undefined, callback: CorsOptionsCallback) {
    if (
      !origin ||
      [
        'http://localhost:5173',
        'http://www.localhost:5173',
        'https://car-wash-client-three.vercel.app',
      ].includes(origin)
    ) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'), false);
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use((err: Error, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

export default app;
