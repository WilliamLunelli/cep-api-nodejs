import { Request, Response, NextFunction } from 'express';
import * as cepService from '../services/cepService';

/**
 * Consultar um CEP
 */
export const consultarCEP = async (
  req: Request,
  res: Response,
  next: NextFunction // ← Adicione isso!
): Promise<void> => {
  try {
    const { cep } = req.body;

    const resultado = await cepService.buscarCep(cep);

    res.status(200).json(resultado);
  } catch (error) {
    next(error); // ← Só passa o erro! O errorHandler vai tratar!
  }
};

/**
 * Health check
 */
export const health = (req: Request, res: Response): void => {
  res.status(200).json({
    status: 'ok',
    service: 'CEP API',
    timestamp: new Date().toISOString(),
    endpoints: {
      login: 'POST /api/v1/auth/login',
      logout: 'POST /api/v1/auth/logout',
      consultarCEP: 'POST /api/v1/cep (requer autenticação)',
    },
  });
};
