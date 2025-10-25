import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/authService';

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Token de autenticação não fornecido',
          timestamp: new Date().toISOString(),
        },
      });
      return;
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_TOKEN_FORMAT',
          message: 'Formato de token inválido. Use: Bearer {token}',
          timestamp: new Date().toISOString(),
        },
      });
      return;
    }

    const token = parts[1];

    const isBlacklisted = await authService.isBlacklisted(token);

    if (isBlacklisted) {
      res.status(401).json({
        success: false,
        error: {
          code: 'TOKEN_REVOKED',
          message: 'Token foi revogado. Faça login novamente.',
          timestamp: new Date().toISOString(),
        },
      });
      return;
    }

    const decoded = authService.verifyToken(token);

    req.userId = decoded.userId;
    req.username = decoded.username;

    next();
  } catch (error: any) {
    res.status(401).json({
      success: false,
      error: {
        code: 'INVALID_TOKEN',
        message: error.message || 'Token inválido ou expirado',
        timestamp: new Date().toISOString(),
      },
    });
  }
};
