import express from 'express';
import { Express, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';

const app: Express = express();
const PORT: string | number = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(helmet());

app.get('/', (req: Request, res: Response): void => {
  res.json({ message: 'Hello World!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
