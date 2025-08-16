import express from 'express';
import { Express } from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import { corsConfig } from './configs/cors.config';
import morgan from 'morgan';
import { morganFormatString } from './configs/logger.config';
import { limiterMiddleware } from './middlewares/limiter.middleware';
import authRoutes from './routes/auth.routes';
import { errorMiddleware } from './middlewares/error.middleware';

const app: Express = express();
const PORT: string | number = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsConfig));
app.use(limiterMiddleware);
app.use(helmet());
app.use(morgan(morganFormatString));

app.use('/api/auth', authRoutes);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
