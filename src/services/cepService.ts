import axios from 'axios';
import * as cacheService from './cacheService';

const sanitizeCep = (cep: string): string => {
  return cep.replace(/\D/g, '');
};

const isValidCep = (cep: string): boolean => {
  return /^[0-9]{8}$/.test(cep);
};

export const buscarCep = async (cep: string) => {
  const cepLimpo = sanitizeCep(cep);

  if (!isValidCep(cepLimpo)) {
    throw new Error('CEP inválido. Deve conter 8 dígitos numéricos.');
  }

  const dadosCache = await cacheService.getCache(cepLimpo);

  if (dadosCache) {
    return {
      success: true,
      data: dadosCache,
      source: 'cache',
      cached: true,
      timestamp: new Date().toISOString(),
    };
  }

  try {
    const BASE_URL = process.env.VIACEP_BASE_URL || 'https://viacep.com.br/ws';
    const TIMEOUT = parseInt(process.env.VIACEP_TIMEOUT || '5000', 10);

    const url = `${BASE_URL}/${cepLimpo}/json/`;
    const response = await axios.get(url, { timeout: TIMEOUT });

    if (response.data.erro === true) {
      throw new Error('CEP não encontrado no ViaCEP.');
    }

    await cacheService.setCache(cepLimpo, response.data);

    return {
      success: true,
      data: response.data,
      source: 'viacep',
      cached: false,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('Timeout: ViaCEP demorou muito para responder.');
      }
      if (error.response?.status === 400) {
        throw new Error('CEP com formato inválido.');
      }
      throw new Error('Erro ao consultar ViaCEP. Serviço indisponível.');
    }
    throw error;
  }
};
