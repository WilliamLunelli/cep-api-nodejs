import { Request, Response } from 'express';
import * as cepService from '../services/cepService';

export const consultarCEP = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cep } = req.body;

    const resultado = await cepService.buscarCep(cep);

    res.status(200).json(resultado);
  } catch (error: any) {
    if (error.message.includes('inválido')) {
      res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_CEP',
          message: error.message,
          timestamp: new Date().toISOString(),
        },
      });
      return;
    }

    if (error.message.includes('não encontrado')) {
      res.status(404).json({
        success: false,
        error: {
          code: 'CEP_NOT_FOUND',
          message: error.message,
          timestamp: new Date().toISOString(),
        },
      });
      return;
    }

    if (
      error.message.includes('Timeout') ||
      error.message.includes('indisponível')
    ) {
      res.status(503).json({
        success: false,
        error: {
          code: 'SERVICE_UNAVAILABLE',
          message: 'ViaCEP está temporariamente indisponível. Tente novamente.',
          timestamp: new Date().toISOString(),
        },
      });
      return;
    }

    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Erro ao consultar CEP',
        timestamp: new Date().toISOString(),
      },
    });
  }
};

export const health = async (res: Response): Promise<void> => {
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
