import { getRedisClient } from '../config/redis';

const KEY_PREFIX = 'cep:';

export const setCache = async (cep: string, data: any): Promise<void> => {
  try {
    const redis = await getRedisClient();
    const TTL = parseInt(process.env.CACHE_TTL || '300', 10);

    const key = `${KEY_PREFIX}${cep}`;
    const jsonData = JSON.stringify(data);

    await redis.set(key, jsonData, { EX: TTL });
  } catch (error) {
    console.error('Erro ao salvar no cache:', error);
    throw error;
  }
};

export const getCache = async (cep: string): Promise<any> => {
  try {
    const redis = await getRedisClient();

    const key = `${KEY_PREFIX}${cep}`;
    const jsonData = await redis.get(key);

    if (!jsonData) {
      return null;
    }

    return JSON.parse(jsonData);
  } catch (error) {
    console.error('Erro ao buscar do cache:', error);
    return null;
  }
};

export const existsCache = async (cep: string): Promise<boolean> => {
  try {
    const redis = await getRedisClient();

    const key = `${KEY_PREFIX}${cep}`;
    const exists = await redis.exists(key);

    return exists === 1;
  } catch (error) {
    console.error('Erro ao verificar cache:', error);
    return false;
  }
};

export const getTTLCache = async (cep: string): Promise<number> => {
  try {
    const redis = await getRedisClient();

    const key = `${KEY_PREFIX}${cep}`;
    const ttl = await redis.ttl(key);

    return ttl;
  } catch (error) {
    console.error('Erro ao buscar TTL:', error);
    return -2;
  }
};

export const deleteCache = async (cep: string): Promise<void> => {
  try {
    const redis = await getRedisClient();

    const key = `${KEY_PREFIX}${cep}`;
    await redis.del(key);
  } catch (error) {
    console.error('Erro ao deletar do cache:', error);
    throw error;
  }
};
