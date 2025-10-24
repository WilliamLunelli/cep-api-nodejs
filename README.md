# 📮 API de Consulta de CEP

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-blue.svg)](https://expressjs.com/)
[![Redis](https://img.shields.io/badge/Redis-7.x-red.svg)](https://redis.io/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

API RESTful robusta e escalável para consulta de CEPs brasileiros com sistema inteligente de cache, autenticação JWT e integração com o serviço ViaCEP.

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Arquitetura](#-arquitetura)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Como Usar](#-como-usar)
- [Documentação da API](#-documentação-da-api)
- [Sistema de Cache](#-sistema-de-cache)
- [Autenticação](#-autenticação)
- [Validações](#-validações)
- [Tratamento de Erros](#-tratamento-de-erros)
- [Testes](#-testes)
- [Deploy](#-deploy)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)
- [Contato](#-contato)

---

## 🎯 Sobre o Projeto

Esta API foi desenvolvida como solução para um desafio técnico que consiste em criar um serviço de consulta de CEPs com as seguintes características:

- Recebe requisições POST com um CEP como parâmetro
- Consulta o serviço ViaCEP para obter informações do endereço
- Implementa sistema de cache Redis com TTL de 5 minutos
- Possui autenticação JWT para proteger os endpoints
- Valida e sanitiza todas as entradas de dados
- Retorna a origem dos dados (cache ou ViaCEP)

### 💡 Caso de Uso

Ideal para aplicações que necessitam de:
- Autocomplete de endereços em formulários
- Integração com sistemas de e-commerce
- Aplicações de logística e entregas
- Sistemas de cadastro de clientes
- Análise de dados geográficos

---

## ✨ Funcionalidades

- ✅ **Consulta de CEP em tempo real** - Busca instantânea de informações de endereço
- ⚡ **Cache Inteligente com Redis** - Armazena consultas por 5 minutos para otimizar performance
- 🔐 **Autenticação JWT** - Proteção de rotas com tokens de acesso
- 📊 **Rastreamento de Origem** - Indica se os dados vieram do cache ou da API externa
- ✔️ **Validação Robusta** - Validação completa de entrada de dados e tratamento de erros
- 🐳 **Docker Support** - Configuração containerizada para fácil deployment
- 📖 **Documentação Completa** - Exemplos com cURL, Postman e Insomnia
- 🧪 **Testes Automatizados** - Cobertura de testes unitários e de integração
- 📝 **Linting e Formatação** - ESLint e Prettier configurados
- 🔄 **Rate Limiting** - Proteção contra abuso de requisições
- 📈 **Logs Estruturados** - Sistema de logging para monitoramento

---

## 🛠 Tecnologias Utilizadas

### Core
- **[Node.js](https://nodejs.org/)** (v18+) - Runtime JavaScript
- **[Express.js](https://expressjs.com/)** (v4.x) - Framework web minimalista
- **[Redis](https://redis.io/)** (v7.x) - Banco de dados em memória para cache

### Autenticação e Segurança
- **[jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)** - Geração e validação de JWT
- **[bcryptjs](https://github.com/dcodeIO/bcrypt.js)** - Hash de senhas
- **[helmet](https://helmetjs.github.io/)** - Proteção de headers HTTP
- **[express-rate-limit](https://github.com/nfriedly/express-rate-limit)** - Limitação de requisições

### Validação e Utilidades
- **[zod](https://zod.dev/)** - Validação de schemas e dados
- **[axios](https://axios-http.com/)** - Cliente HTTP
- **[dotenv](https://github.com/motdotla/dotenv)** - Gerenciamento de variáveis de ambiente

### Desenvolvimento e Qualidade
- **[ESLint](https://eslint.org/)** - Linter de código
- **[Prettier](https://prettier.io/)** - Formatador de código
- **[Jest](https://jestjs.io/)** - Framework de testes
- **[nodemon](https://nodemon.io/)** - Hot reload durante desenvolvimento

---

## 🏗 Arquitetura

```
src/
├── config/              # Configurações da aplicação
│   ├── redis.js        # Configuração do Redis
│   └── database.js     # Configuração de banco (se houver)
│
├── controllers/         # Controladores da aplicação
│   ├── authController.js
│   └── cepController.js
│
├── middlewares/         # Middlewares personalizados
│   ├── auth.js         # Middleware de autenticação
│   ├── errorHandler.js # Tratamento de erros global
│   ├── rateLimiter.js  # Limitador de requisições
│   └── validator.js    # Validações de entrada
│
├── services/            # Lógica de negócio
│   ├── cacheService.js # Serviço de cache Redis
│   ├── cepService.js   # Serviço de consulta CEP
│   └── authService.js  # Serviço de autenticação
│
├── routes/              # Definição de rotas
│   ├── auth.routes.js
│   └── cep.routes.js
│
├── utils/               # Funções utilitárias
│   ├── logger.js       # Sistema de logs
│   └── helpers.js      # Funções auxiliares
│
├── tests/               # Testes automatizados
│   ├── unit/
│   └── integration/
│
└── app.js               # Configuração do Express
└── server.js            # Inicialização do servidor
```

### Padrões Utilizados

- **MVC (Model-View-Controller)** - Separação de responsabilidades
- **Service Layer** - Lógica de negócio isolada
- **Dependency Injection** - Facilita testes e manutenção
- **Error Handling Middleware** - Tratamento centralizado de erros

---

## 📦 Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (v18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Redis](https://redis.io/) (v7 ou superior)
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/) (opcional, mas recomendado)

---

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/cep-api-nodejs.git
cd cep-api-nodejs
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

### 4. Inicie o Redis

**Opção A - Docker (Recomendado):**
```bash
docker-compose up -d redis
```

**Opção B - Instalação Local:**
```bash
redis-server
```

### 5. Execute a aplicação

**Desenvolvimento:**
```bash
npm run dev
```

**Produção:**
```bash
npm start
```

A API estará disponível em `http://localhost:3000`

---

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Servidor
NODE_ENV=development
PORT=3000
API_VERSION=v1

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
CACHE_TTL=300

# JWT
JWT_SECRET=seu_secret_super_seguro_aqui
JWT_EXPIRES_IN=24h

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100

# ViaCEP
VIACEP_BASE_URL=https://viacep.com.br/ws
VIACEP_TIMEOUT=5000

# Logs
LOG_LEVEL=info
```

### Arquivo .env.example

```env
NODE_ENV=development
PORT=3000
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=change_this_secret_in_production
JWT_EXPIRES_IN=24h
```

---

## 📘 Como Usar

### 1. Obter Token de Autenticação

Primeiro, você precisa obter um token JWT para acessar os endpoints protegidos.

**Endpoint:** `POST /api/v1/auth/login`

**Exemplo cURL:**
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "senha123"
  }'
```

**Resposta:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": "24h"
}
```

### 2. Consultar um CEP

Use o token obtido para fazer consultas de CEP.

**Endpoint:** `POST /api/v1/cep`

**Exemplo cURL:**
```bash
curl -X POST http://localhost:3000/api/v1/cep \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "cep": "01310100"
  }'
```

**Resposta (do ViaCEP):**
```json
{
  "success": true,
  "data": {
    "cep": "01310-100",
    "logradouro": "Avenida Paulista",
    "complemento": "de 612 a 1510 - lado par",
    "bairro": "Bela Vista",
    "localidade": "São Paulo",
    "uf": "SP",
    "ibge": "3550308",
    "gia": "1004",
    "ddd": "11",
    "siafi": "7107"
  },
  "source": "viacep",
  "cached": false,
  "timestamp": "2025-10-24T10:30:00.000Z"
}
```

**Resposta (do Cache - em até 5 minutos):**
```json
{
  "success": true,
  "data": {
    "cep": "01310-100",
    "logradouro": "Avenida Paulista",
    "complemento": "de 612 a 1510 - lado par",
    "bairro": "Bela Vista",
    "localidade": "São Paulo",
    "uf": "SP",
    "ibge": "3550308",
    "gia": "1004",
    "ddd": "11",
    "siafi": "7107"
  },
  "source": "cache",
  "cached": true,
  "timestamp": "2025-10-24T10:30:00.000Z",
  "cacheExpiresIn": "3m 45s"
}
```

---

## 📚 Documentação da API

### Endpoints Disponíveis

#### Autenticação

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| POST | `/api/v1/auth/login` | Realizar login e obter token | Não |
| POST | `/api/v1/auth/register` | Registrar novo usuário | Não |
| POST | `/api/v1/auth/refresh` | Renovar token | Sim |

#### CEP

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| POST | `/api/v1/cep` | Consultar um CEP | Sim |
| GET | `/api/v1/cep/health` | Status da API | Não |

### Exemplos Detalhados

#### 1. Login

```bash
POST /api/v1/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "senha123"
}
```

#### 2. Consultar CEP (com traço)

```bash
POST /api/v1/cep
Authorization: Bearer {token}
Content-Type: application/json

{
  "cep": "01310-100"
}
```

#### 3. Consultar CEP (sem traço)

```bash
POST /api/v1/cep
Authorization: Bearer {token}
Content-Type: application/json

{
  "cep": "01310100"
}
```

### Códigos de Status HTTP

| Código | Significado | Descrição |
|--------|-------------|-----------|
| 200 | OK | Requisição bem-sucedida |
| 201 | Created | Recurso criado com sucesso |
| 400 | Bad Request | Dados de entrada inválidos |
| 401 | Unauthorized | Token ausente ou inválido |
| 404 | Not Found | CEP não encontrado |
| 429 | Too Many Requests | Limite de requisições excedido |
| 500 | Internal Server Error | Erro interno do servidor |
| 503 | Service Unavailable | ViaCEP indisponível |

---

## 💾 Sistema de Cache

### Como Funciona

1. **Primeira Consulta**: Busca no ViaCEP e armazena no Redis por 5 minutos
2. **Consultas Subsequentes**: Retorna dados do cache (muito mais rápido)
3. **Expiração**: Após 5 minutos, o cache expira automaticamente
4. **Indicador de Origem**: Resposta sempre indica se veio do cache ou ViaCEP

### Benefícios

- ⚡ **Performance**: Redução de 95% no tempo de resposta
- 💰 **Economia**: Menos requisições ao serviço externo
- 🛡️ **Confiabilidade**: Tolerância a falhas do ViaCEP
- 📊 **Escalabilidade**: Suporta mais usuários simultâneos

### Configuração do TTL

Você pode alterar o tempo de expiração do cache no arquivo `.env`:

```env
CACHE_TTL=300  # 5 minutos (em segundos)
```

---

## 🔐 Autenticação

### JWT (JSON Web Token)

A API utiliza JWT para autenticação. O token deve ser enviado no header de cada requisição:

```
Authorization: Bearer {seu_token_aqui}
```

### Fluxo de Autenticação

1. Usuário faz login com credenciais
2. API valida credenciais e retorna um JWT
3. Cliente armazena o token (localStorage, sessionStorage, etc.)
4. Cliente envia o token em todas as requisições subsequentes
5. API valida o token e processa a requisição

### Expiração do Token

- **Tempo de Expiração**: Configurável via `.env` (padrão: 24h)
- **Renovação**: Use o endpoint `/api/v1/auth/refresh` para renovar o token

### Segurança

- Tokens são assinados com HS256
- Senhas são hasheadas com bcrypt
- Tokens expirados são automaticamente rejeitados
- Rate limiting para prevenir ataques de força bruta

---

## ✅ Validações

### Validação de CEP

A API realiza as seguintes validações no CEP:

1. **Presença**: CEP é obrigatório
2. **Formato**: Aceita com ou sem traço (01310-100 ou 01310100)
3. **Comprimento**: Deve ter exatamente 8 dígitos numéricos
4. **Caracteres**: Apenas números são aceitos (após remoção do traço)

### Exemplos de CEPs Válidos

```json
"01310100"    ✅
"01310-100"   ✅
"01.310-100"  ✅ (pontuação é removida)
```

### Exemplos de CEPs Inválidos

```json
"123"         ❌ (muito curto)
"123456789"   ❌ (muito longo)
"abcd-efgh"   ❌ (não numérico)
""            ❌ (vazio)
null          ❌ (nulo)
```

### Mensagens de Erro

```json
{
  "success": false,
  "error": {
    "code": "INVALID_CEP",
    "message": "CEP inválido. Deve conter 8 dígitos numéricos.",
    "details": [
      {
        "field": "cep",
        "message": "O CEP deve ter exatamente 8 dígitos"
      }
    ]
  }
}
```

---

## 🚨 Tratamento de Erros

### Estrutura Padrão de Erro

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Mensagem descritiva do erro",
    "details": [],
    "timestamp": "2025-10-24T10:30:00.000Z"
  }
}
```

### Tipos de Erro

| Código | Descrição |
|--------|-----------|
| `INVALID_CEP` | CEP inválido ou mal formatado |
| `CEP_NOT_FOUND` | CEP não encontrado no ViaCEP |
| `UNAUTHORIZED` | Token ausente ou inválido |
| `RATE_LIMIT_EXCEEDED` | Limite de requisições excedido |
| `VIACEP_UNAVAILABLE` | Serviço ViaCEP indisponível |
| `REDIS_ERROR` | Erro ao conectar com Redis |
| `INTERNAL_ERROR` | Erro interno do servidor |

---

## 🧪 Testes

### Executar Testes

```bash
# Todos os testes
npm test

# Testes com coverage
npm run test:coverage

# Testes em modo watch
npm run test:watch
```

### Cobertura de Testes

O projeto possui testes unitários focados em:
- Validação de dados (Zod schemas)
- Serviços de autenticação (JWT)
- Funções auxiliares (helpers)
- Serviço de cache (Redis)

```
----------------------------|---------|----------|---------|---------|
File                        | % Stmts | % Branch | % Funcs | % Lines |
----------------------------|---------|----------|---------|---------|
All files                   |   90+   |   85+    |   90+   |   90+   |
 services                   |   92    |   88     |   94    |   92    |
 utils                      |   95    |   90     |   96    |   95    |
----------------------------|---------|----------|---------|---------|
```

---

## 🐳 Deploy

### Docker

#### Build da Imagem

```bash
docker build -t cep-api:latest .
```

#### Executar Container

```bash
docker run -d \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e JWT_SECRET=seu_secret_aqui \
  --name cep-api \
  cep-api:latest
```

### Docker Compose

```bash
# Iniciar todos os serviços
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar serviços
docker-compose down
```

### Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - REDIS_HOST=redis
    depends_on:
      - redis
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    restart: unless-stopped

volumes:
  redis_data:
```

---

## 📝 Scripts Disponíveis

```json
{
  "start": "node src/server.js",
  "dev": "nodemon src/server.js",
  "test": "jest",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage",
  "lint": "eslint src/",
  "lint:fix": "eslint src/ --fix",
  "format": "prettier --write \"src/**/*.js\""
}
```

---

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Para contribuir:

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Código

- Siga o [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- Use ESLint e Prettier para manter a consistência
- Escreva testes para novas funcionalidades
- Documente mudanças significativas

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👤 Contato

**Seu Nome**

- GitHub: [@seu-usuario](https://github.com/seu-usuario)
- LinkedIn: [seu-perfil](https://linkedin.com/in/seu-perfil)
- Email: seu-email@exemplo.com

---

## 🙏 Agradecimentos

- [ViaCEP](https://viacep.com.br/) - API de consulta de CEPs
- [Egadnet](https://www.egadnet.com.br/) - Pelo desafio técnico
- Comunidade Node.js e Redis

---

## 📊 Status do Projeto

🚀 **Em Desenvolvimento** | ✅ **Pronto para Produção** | 🎯 **Melhorias Futuras**

### Roadmap

- [x] API básica de consulta CEP
- [x] Sistema de cache com Redis
- [x] Autenticação JWT
- [x] Validações de entrada
- [x] Documentação completa
- [x] Testes unitários
- [x] Docker support
- [ ] Swagger/OpenAPI documentation
- [ ] GraphQL support
- [ ] Webhooks
- [ ] Dashboard administrativo
- [ ] Suporte a múltiplos idiomas

---

<div align="center">

**Desenvolvido com ❤️ para o desafio técnico Egadnet**

⭐ Se este projeto te ajudou, considere dar uma estrela!

</div>
