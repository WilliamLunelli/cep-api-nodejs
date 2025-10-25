import { Router } from 'express';
import * as cepController from '../controllers/cepController';
import { authenticate } from '../middlewares/auth';
import { validate } from '../middlewares/validator';
import { consultarCepSchema } from '../schemas/cepSchema';

const router = Router();

router.post(
  '/',
  authenticate,
  validate(consultarCepSchema),
  cepController.consultarCEP
);

router.get('/health', cepController.health);

export default router;
