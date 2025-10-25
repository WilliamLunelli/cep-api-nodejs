import { Response } from 'express';
import { ZodError } from 'zod';

export const errorHandler = (error: any, res: Response): void => {
  console.error('❌ Erro capturado:', error);

  if (error instanceof ZodError) {
    res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Dados de entrada inválidos',
        details: error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        })),
        timestamp: new Date().toISOString(),
      },
    });
    return;
  }

  if (error.name === 'JsonWebTokenError') {
    res.status(401).json({
      success: false,
      error: {
        code: 'INVALID_TOKEN',
        message: 'Token JWT inválido',
        timestamp: new Date().toISOString(),
      },
    });
    return;
  }

  if (error.name === 'TokenExpiredError') {
    res.status(401).json({
      success: false,
      error: {
        code: 'TOKEN_EXPIRED',
        message: 'Token JWT expirado',
        timestamp: new Date().toISOString(),
      },
    });
    return;
  }

  if (error.message && error.message.includes('CEP')) {
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

  if (error.message && error.message.includes('Redis')) {
    res.status(503).json({
      success: false,
      error: {
        code: 'CACHE_ERROR',
        message: 'Erro no serviço de cache',
        timestamp: new Date().toISOString(),
      },
    });
    return;
  }

  if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
    res.status(503).json({
      success: false,
      error: {
        code: 'SERVICE_UNAVAILABLE',
        message: 'Serviço externo indisponível',
        timestamp: new Date().toISOString(),
      },
    });
    return;
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: {
      code: error.code || 'INTERNAL_ERROR',
      message: error.message || 'Erro interno do servidor',
      timestamp: new Date().toISOString(),
    },
  });
};
