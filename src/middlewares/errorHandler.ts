import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Erro capturado:', error);

  // Erros de validação (Zod)
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

  // Token JWT inválido
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

  // Token JWT expirado
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

  // Erros relacionados a CEP
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

  // Erros do Redis
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

  // Erros de conexão (serviços externos)
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

  // Erro genérico
  res.status(error.statusCode || 500).json({
    success: false,
    error: {
      code: error.code || 'INTERNAL_ERROR',
      message: error.message || 'Erro interno do servidor',
      timestamp: new Date().toISOString(),
    },
  });
};
