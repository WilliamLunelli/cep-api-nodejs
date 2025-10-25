import { Router } from 'express';
import authRoutes from './auth.routes';
import cepRoutes from './cep.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/cep', cepRoutes);

export default router;
