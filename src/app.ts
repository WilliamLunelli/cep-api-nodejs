import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import routes from './routes';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();

const app: Application = express();

// Middlewares básicos
app.use(express.json());
app.use(cors());
app.use(helmet());

app.use('/api/v1', routes);
app.use(errorHandler);

// Rota de health check
app.get('/health', (req, res) => {
  res.json({ status: 'heakth ok', timestamp: new Date().toISOString() });
});

app.use(errorHandler);
export default app;
