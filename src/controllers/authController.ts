import { Request, Response } from 'express';
import * as authService from '../services/authService';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    const result = await authService.login(username, password);

    res.status(200).json({
      success: true,
      message: 'Login realizado com sucesso',
      data: {
        token: result.token,
        expiresIn: result.expiresIn,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      error: {
        code: 'LOGIN_FAILED',
        message: error.message || 'Erro ao realizar login',
        timestamp: new Date().toISOString(),
      },
    });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(400).json({
        success: false,
        error: {
          code: 'TOKEN_REQUIRED',
          message: 'Token não fornecido',
          timestamp: new Date().toISOString(),
        },
      });
      return;
    }

    const token = authHeader.split(' ')[1];

    await authService.addToBlacklist(token);

    res.status(200).json({
      success: true,
      message: 'Logout realizado com suceesso',
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: {
        code: 'LOGOUT_FAILED',
        message: error.message || 'Erro ao realizar logout',
        timestamp: new Date().toISOString(),
      },
    });
  }
};
