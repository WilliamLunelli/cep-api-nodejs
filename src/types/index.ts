export interface CepData {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export interface CepResponse {
  success: boolean;
  data?: CepData;
  source?: 'cache' | 'viacep';
  cached?: boolean;
  timestamp?: string;
  cacheExpiresIn?: string;
}

export interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown[];
    timestamp: string;
  };
}

export interface AuthPayload {
  userId: string;
  username: string;
  iat?: number;
  exp?: number;
}

export interface LoginCredentials {
  username: string;
  password: string;
}
