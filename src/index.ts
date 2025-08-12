import express from 'express';
import { Express, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import { corsConfig } from './configs/cors.config';
import morgan from 'morgan';
import { morganFormatString } from './configs/logger.config';
import { limiterMiddleware } from './middlewares/limiter.middleware';

const app: Express = express();
const PORT: string | number = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsConfig));
app.use(limiterMiddleware);
app.use(helmet());
app.use(morgan(morganFormatString));

app.get('/', (req: Request, res: Response): void => {
  res.json({ message: 'Hello World!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
