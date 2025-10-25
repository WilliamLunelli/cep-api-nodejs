import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();

// Middlewares básicos
app.use(express.json());
app.use(cors());
app.use(helmet());

// Rota de health check
app.get('/health', (req, res) => {
  res.json({ status: 'heakth ok', timestamp: new Date().toISOString() });
});

export default app;
