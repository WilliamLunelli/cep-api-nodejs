import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import routes from './routes';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

// Rotas
app.use('/api/v1', routes);

// Error handler (sempre por último!)
app.use(errorHandler);

export default app;
