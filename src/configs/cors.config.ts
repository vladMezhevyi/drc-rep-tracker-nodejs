import { CorsOptions } from 'cors';

export const corsConfig: CorsOptions = {
  origin: process.env.NODE_ENV === 'production' ? process.env.CLIENT_URL : 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
