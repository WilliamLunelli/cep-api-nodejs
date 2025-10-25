import { Router } from 'express';
import * as authController from '../controllers/authController';
import { validate } from '../middlewares/validator';
import { loginSchema } from '../schemas/authSchema';

const router = Router();

router.post('/login', validate(loginSchema), authController.login);

router.post('/logout', authController.logout);

export default router;
