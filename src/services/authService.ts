import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { getRedisClient } from '../config/redis';

const JWT_SECRET = process.env.JWT_SECRET || 'segredo';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';
const BLACKLIST_PREFIX = 'token:blacklist:';

// Usuários mock (para o desafio)
const MOCK_USERS = {
  admin: {
    username: 'admin',
    password: '$2b$10$mpAd/A0TeuRR/gW6b3AbSOtWFHrKCyk8uRo/BYtPLpvrBoEw34q3W', // senha: admin123
  },
};

interface AuthPayload {
  userId: string;
  username: string;
}

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const generateToken = (payload: AuthPayload): string => {
  // @ts-ignore - jwt.sign tem problema com tipos do TypeScript
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const verifyToken = (token: string): AuthPayload => {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthPayload;
  } catch (error) {
    throw new Error('Token inválido ou expirado');
  }
};

export const addToBlacklist = async (token: string): Promise<void> => {
  try {
    const redis = await getRedisClient();
    const decoded = verifyToken(token);

    const exp = (decoded as any).exp;
    const now = Math.floor(Date.now() / 1000);
    const ttl = exp - now;

    if (ttl > 0) {
      const key = `${BLACKLIST_PREFIX}${token}`;
      await redis.set(key, '1', { EX: ttl });
    }
  } catch (error) {
    throw new Error('Erro ao adicionar token à blacklist');
  }
};

export const isBlacklisted = async (token: string): Promise<boolean> => {
  try {
    const redis = await getRedisClient();
    const key = `${BLACKLIST_PREFIX}${token}`;
    const exists = await redis.exists(key);
    return exists === 1;
  } catch (error) {
    return false;
  }
};

export const login = async (
  username: string,
  password: string
): Promise<{ token: string; expiresIn: string }> => {
  const user = MOCK_USERS[username as keyof typeof MOCK_USERS];

  if (!user) {
    throw new Error('Credenciais inválidas');
  }

  const isValidPassword = await comparePassword(password, user.password);

  if (!isValidPassword) {
    throw new Error('Credenciais inválidas');
  }

  const token = generateToken({
    userId: username,
    username: user.username,
  });

  return {
    token,
    expiresIn: JWT_EXPIRES_IN,
  };
};
