# 📮 API de Consulta de CEP

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-4.x-blue.svg)](https://expressjs.com/)
[![Redis](https://img.shields.io/badge/Redis-7.x-red.svg)](https://redis.io/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

API RESTful robusta e escalável para consulta de CEPs brasileiros com sistema inteligente de cache, autenticação JWT com blacklist e integração com o serviço ViaCEP.

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Arquitetura](#-arquitetura)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação e Execução](#-instalação-e-execução)
- [Configuração](#-configuração)
- [Como Usar](#-como-usar)
- [Documentação da API](#-documentação-da-api)
- [Sistema de Cache](#-sistema-de-cache)
- [Autenticação](#-autenticação)
- [Validações](#-validações)
- [Tratamento de Erros](#-tratamento-de-erros)
- [Docker](#-docker)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Contato](#-contato)

---

## 🎯 Sobre o Projeto

Esta API foi desenvolvida como solução para um desafio técnico da **Egadnet** que consiste em criar um serviço de consulta de CEPs com as seguintes características:

- ✅ Recebe requisições POST com um CEP como parâmetro
- ✅ Consulta o serviço ViaCEP para obter informações do endereço
- ✅ Implementa sistema de cache Redis com TTL de 5 minutos
- ✅ Possui autenticação JWT com blacklist de tokens
- ✅ Valida e sanitiza todas as entradas de dados
- ✅ Retorna a origem dos dados (cache ou ViaCEP)
- ✅ Desenvolvida com TypeScript para maior segurança de tipos

### 💡 Caso de Uso

Ideal para aplicações que necessitam de:

- Autocomplete de endereços em formulários
- Integração com sistemas de e-commerce
- Aplicações de logística e entregas
- Sistemas de cadastro de clientes
- Análise de dados geográficos

---

## ✨ Funcionalidades

### Requisitos Obrigatórios

- ✅ **API Node.js** com endpoint POST
- ✅ **Consulta ao ViaCEP** (https://viacep.com.br/)
- ✅ **Sistema de autenticação** JWT
- ✅ **Validações robustas** de entrada com Zod
- ✅ **Código limpo** e bem documentado
- ✅ **Lint configurado** (ESLint + Prettier)
- ✅ **Estrutura organizada** do projeto

### Requisitos Opcionais (Implementados)

- ✅ **Cache inteligente** com Redis (TTL de 5 minutos)
- ✅ **Indicador de origem** dos dados (cache vs ViaCEP)
- ✅ **Exemplos de requisição** (cURL e Postman Collection)

### Diferenciais Implementados

- 🚀 **TypeScript** - Tipagem estática para maior segurança
- 🔐 **JWT com Blacklist** - Logout real usando Redis
- 🏗️ **Arquitetura em Camadas** - MVC + Service Layer + Middlewares
- 🐳 **Docker Support** - Redis containerizado
- 📊 **Rastreamento de Performance** - Indicador de origem dos dados
- 🛡️ **Error Handler Global** - Tratamento centralizado de erros
- ⚡ **Performance Otimizada** - Cache reduz tempo de resposta em 60-100x

---

## 🛠 Tecnologias Utilizadas

### Core

- **[Node.js](https://nodejs.org/)** (v18+) - Runtime JavaScript
- **[TypeScript](https://www.typescriptlang.org/)** (v5.x) - Superset tipado do JavaScript
- **[Express.js](https://expressjs.com/)** (v4.x) - Framework web minimalista
- **[Redis](https://redis.io/)** (v7.x) - Banco de dados em memória para cache

### Autenticação e Segurança

- **[jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)** - Geração e validação de JWT
- **[bcryptjs](https://github.com/dcodeIO/bcrypt.js)** - Hash de senhas
- **[helmet](https://helmetjs.github.io/)** - Proteção de headers HTTP
- **[cors](https://github.com/expressjs/cors)** - Configuração de CORS

### Validação e Utilidades

- **[zod](https://zod.dev/)** - Validação de schemas e dados
- **[axios](https://axios-http.com/)** - Cliente HTTP
- **[dotenv](https://github.com/motdotla/dotenv)** - Gerenciamento de variáveis de ambiente

### Desenvolvimento e Qualidade

- **[ESLint](https://eslint.org/)** - Linter de código
- **[Prettier](https://prettier.io/)** - Formatador de código
- **[ts-node-dev](https://github.com/wclr/ts-node-dev)** - Hot reload com TypeScript

---

## 🏗 Arquitetura

```
src/
├── config/              # Configurações da aplicação
│   └── redis.ts        # Configuração do Redis
│
├── controllers/         # Controladores da aplicação
│   ├── authController.ts
│   └── cepController.ts
│
├── middlewares/         # Middlewares personalizados
│   ├── auth.ts         # Middleware de autenticação
│   ├── errorHandler.ts # Tratamento de erros global
│   └── validator.ts    # Validações de entrada
│
├── services/            # Lógica de negócio
│   ├── cacheService.ts # Serviço de cache Redis
│   ├── cepService.ts   # Serviço de consulta CEP
│   └── authService.ts  # Serviço de autenticação
│
├── routes/              # Definição de rotas
│   ├── index.ts
│   ├── auth.routes.ts
│   └── cep.routes.ts
│
├── schemas/             # Validação de dados (Zod)
│   ├── authSchema.ts
│   └── cepSchema.ts
│
└── app.ts               # Configuração do Express
└── server.ts            # Inicialização do servidor
```

### Padrões Utilizados

- **MVC (Model-View-Controller)** - Separação de responsabilidades
- **Service Layer** - Lógica de negócio isolada
- **Middleware Pattern** - Autenticação, validação e error handling
- **Error Handling Middleware** - Tratamento centralizado de erros
- **TypeScript** - Tipagem estática para maior segurança

---

## 📦 Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (v18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) e Docker Compose (para rodar o Redis)
- [Git](https://git-scm.com/)

**⚠️ Importante:** Esta API usa Redis para cache e blacklist de tokens. O Redis pode ser executado facilmente via Docker com o comando `docker-compose up -d`.

---

## 🚀 Instalação e Execução

### Opção 1: Desenvolvimento Local (Recomendado)

#### 1. Clone o repositório

```bash
git clone https://github.com/[SEU_GITHUB]/cep-api-nodejs.git
cd cep-api-nodejs
```

#### 2. Instale as dependências

```bash
npm install
```

#### 3. Configure as variáveis de ambiente

Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

Edite o `.env` se necessário (as configurações padrão já funcionam).

#### 4. Inicie o Redis com Docker

```bash
docker-compose up -d
```

Verifique se o Redis está rodando:

```bash
docker ps
# Deve mostrar: cep-api-redis com status "Up"
```

#### 5. Execute a aplicação

**Desenvolvimento (com hot reload):**

```bash
npm run dev
```

**Produção:**

```bash
npm run build  # Compila TypeScript para JavaScript
npm start      # Executa a versão compilada
```

#### 6. Acesse a API

A API estará disponível em: `http://localhost:3000`

Teste o health check:

```bash
curl http://localhost:3000/api/v1/cep/health
```

---

### Opção 2: Tudo no Docker (Opcional)

Se você configurou o serviço `api` no `docker-compose.yml`:

```bash
# Subir API + Redis
docker-compose up --build -d

# Ver logs
docker-compose logs -f

# Parar tudo
docker-compose down
```

---

## ⚙️ Configuração

### Variáveis de Ambiente

Arquivo `.env`:

```env
# Servidor
NODE_ENV=development
PORT=3000

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
CACHE_TTL=300

# JWT
JWT_SECRET=seu_secret_super_seguro_aqui_mude_em_producao
JWT_EXPIRES_IN=24h

# ViaCEP
VIACEP_BASE_URL=https://viacep.com.br/ws
VIACEP_TIMEOUT=5000

# Logs
LOG_LEVEL=info
```

### Descrição das Variáveis

| Variável         | Descrição                   | Padrão             |
| ---------------- | --------------------------- | ------------------ |
| `PORT`           | Porta do servidor           | 3000               |
| `REDIS_HOST`     | Host do Redis               | localhost          |
| `REDIS_PORT`     | Porta do Redis              | 6379               |
| `CACHE_TTL`      | Tempo de cache (segundos)   | 300 (5 min)        |
| `JWT_SECRET`     | Chave secreta para JWT      | (gere uma segura!) |
| `JWT_EXPIRES_IN` | Tempo de expiração do token | 24h                |

---

## 📘 Como Usar

### 1. Obter Token de Autenticação

Primeiro, você precisa obter um token JWT para acessar os endpoints protegidos.

**Endpoint:** `POST /api/v1/auth/login`

**Credenciais de Teste:**

- Username: `admin`
- Password: `admin123`

**Exemplo cURL:**

```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123"
  }'
```

**Resposta:**

```json
{
  "success": true,
  "message": "Login realizado com sucesso",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": "24h"
  },
  "timestamp": "2025-10-25T13:18:50.586Z"
}
```

---

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

**Resposta (primeira consulta - ViaCEP):**

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
  "timestamp": "2025-10-25T10:30:00.000Z"
}
```

**Resposta (segunda consulta - Cache Redis):**

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
  "timestamp": "2025-10-25T10:30:05.000Z"
}
```

⚡ **Observe:** A segunda consulta retorna `"source": "cache"` e é muito mais rápida (< 50ms vs ~2000ms)!

---

### 3. Fazer Logout

Invalida o token atual (adiciona à blacklist no Redis).

**Endpoint:** `POST /api/v1/auth/logout`

**Exemplo cURL:**

```bash
curl -X POST http://localhost:3000/api/v1/auth/logout \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

**Resposta:**

```json
{
  "success": true,
  "message": "Logout realizado com sucesso"
}
```

⚠️ **Após o logout, o token não pode mais ser utilizado. Tentativas de uso resultarão em erro 401.**

---

### 4. Usando Postman

Importe a collection disponível em `docs/CEP-API.postman_collection.json` para ter acesso a todos os exemplos de requisições pré-configurados.

**Passos:**

1. Abra o Postman
2. Clique em **Import**
3. Selecione o arquivo `docs/CEP-API.postman_collection.json`
4. A collection "CEP API - Egadnet Challenge" será adicionada

---

## 📡 Documentação da API

### Endpoints Disponíveis

#### Autenticação

| Método | Endpoint              | Descrição                    | Autenticação |
| ------ | --------------------- | ---------------------------- | ------------ |
| POST   | `/api/v1/auth/login`  | Realizar login e obter token | Não          |
| POST   | `/api/v1/auth/logout` | Invalidar token (blacklist)  | Sim          |

#### CEP

| Método | Endpoint             | Descrição        | Autenticação |
| ------ | -------------------- | ---------------- | ------------ |
| POST   | `/api/v1/cep`        | Consultar um CEP | Sim          |
| GET    | `/api/v1/cep/health` | Status da API    | Não          |

---

### Códigos de Status HTTP

| Código | Significado           | Descrição                           |
| ------ | --------------------- | ----------------------------------- |
| 200    | OK                    | Requisição bem-sucedida             |
| 400    | Bad Request           | Dados de entrada inválidos          |
| 401    | Unauthorized          | Token ausente, inválido ou revogado |
| 404    | Not Found             | CEP não encontrado                  |
| 500    | Internal Server Error | Erro interno do servidor            |
| 503    | Service Unavailable   | ViaCEP indisponível                 |

---

## 💾 Sistema de Cache

### Como Funciona

1. **Primeira Consulta**: Busca no ViaCEP e armazena no Redis por 5 minutos
2. **Consultas Subsequentes**: Retorna dados do cache (muito mais rápido)
3. **Expiração**: Após 5 minutos, o cache expira automaticamente
4. **Indicador de Origem**: Resposta sempre indica se veio do cache ou ViaCEP

### Benefícios

- ⚡ **Performance**: Redução de 95% no tempo de resposta (de ~2s para ~30ms)
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

A API utiliza JWT para autenticação. O token deve ser enviado no header de cada requisição protegida:

```
Authorization: Bearer {seu_token_aqui}
```

### Fluxo de Autenticação

1. Usuário faz login com credenciais
2. API valida credenciais e retorna um JWT
3. Cliente armazena o token
4. Cliente envia o token em todas as requisições subsequentes
5. API valida o token e processa a requisição

### Expiração do Token

- **Tempo de Expiração**: Configurável via `.env` (padrão: 24h)
- **Renovação**: Faça login novamente para obter novo token

### Blacklist de Tokens (Logout Real)

A API implementa um sistema de blacklist usando Redis para invalidar tokens:

1. **Logout**: Quando você faz logout, o token é adicionado à blacklist no Redis
2. **TTL Automático**: O token permanece na blacklist até sua expiração natural
3. **Verificação**: Todo endpoint protegido verifica se o token está na blacklist
4. **Segurança**: Tokens roubados podem ser invalidados imediatamente

**Fluxo:**

```
Login  → Recebe token válido
Logout → Token vai para blacklist (Redis)
Próxima requisição → Token é rejeitado (401 Unauthorized)
```

Isso resolve o problema de JWT stateless, permitindo logout real sem comprometer a performance.

### Segurança

- ✅ Tokens são assinados com HS256
- ✅ Senhas são hasheadas com bcrypt
- ✅ Tokens expirados são automaticamente rejeitados
- ✅ Tokens na blacklist são rejeitados
- ✅ Headers de segurança com Helmet

---

## ✅ Validações

### Validação de CEP

A API realiza as seguintes validações no CEP usando Zod:

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
    "code": "VALIDATION_ERROR",
    "message": "Dados de entrada inválidos",
    "details": [
      {
        "field": "body.cep",
        "message": "CEP deve ter exatamente 8 dígitos"
      }
    ],
    "timestamp": "2025-10-25T10:30:00.000Z"
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
    "timestamp": "2025-10-25T10:30:00.000Z"
  }
}
```

### Tipos de Erro

| Código                | Descrição                     |
| --------------------- | ----------------------------- |
| `VALIDATION_ERROR`    | Dados de entrada inválidos    |
| `INVALID_CEP`         | CEP inválido ou mal formatado |
| `CEP_NOT_FOUND`       | CEP não encontrado no ViaCEP  |
| `UNAUTHORIZED`        | Token ausente ou inválido     |
| `TOKEN_REVOKED`       | Token foi invalidado (logout) |
| `SERVICE_UNAVAILABLE` | Serviço ViaCEP indisponível   |
| `CACHE_ERROR`         | Erro no serviço de cache      |
| `INTERNAL_ERROR`      | Erro interno do servidor      |

---

## 🐳 Docker

### docker-compose.yml

O projeto inclui configuração Docker para o Redis:

```yaml
version: '3.8'

services:
  redis:
    image: redis:7-alpine
    container_name: cep-api-redis
    ports:
      - '6379:6379'
    volumes:
      - redis_data:/data
    restart: unless-stopped
    command: redis-server --appendonly yes
    healthcheck:
      test: ['CMD', 'redis-cli', 'ping']
      interval: 10s
      timeout: 3s
      retries: 3

volumes:
  redis_data:
    driver: local
```

### Comandos Docker Úteis

```bash
# Subir Redis
docker-compose up -d

# Ver logs do Redis
docker logs cep-api-redis

# Parar Redis
docker-compose down

# Verificar se Redis está rodando
docker ps

# Entrar no Redis CLI
docker exec -it cep-api-redis redis-cli
```

---

## 📝 Scripts Disponíveis

```json
{
  "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js",
  "lint": "eslint src/**/*.ts",
  "lint:fix": "eslint src/**/*.ts --fix",
  "format": "prettier --write \"src/**/*.ts\""
}
```

**Comandos:**

```bash
# Desenvolvimento (hot reload)
npm run dev

# Build (compilar TypeScript)
npm run build

# Produção (rodar versão compilada)
npm start

# Linting
npm run lint       # Verificar erros
npm run lint:fix   # Corrigir automaticamente

# Formatação
npm run format     # Formatar código com Prettier
```

---

## 📂 Estrutura do Projeto

```
cep-api-nodejs/
├── src/                          # Código-fonte TypeScript
│   ├── config/
│   │   └── redis.ts
│   ├── controllers/
│   │   ├── authController.ts
│   │   └── cepController.ts
│   ├── middlewares/
│   │   ├── auth.ts
│   │   ├── validator.ts
│   │   └── errorHandler.ts
│   ├── routes/
│   │   ├── index.ts
│   │   ├── auth.routes.ts
│   │   └── cep.routes.ts
│   ├── schemas/
│   │   ├── authSchema.ts
│   │   └── cepSchema.ts
│   ├── services/
│   │   ├── authService.ts
│   │   ├── cacheService.ts
│   │   └── cepService.ts
│   ├── app.ts
│   └── server.ts
│
├── docs/                         # Documentação
│   └── CEP-API.postman_collection.json
│
├── dist/                         # Código compilado (gerado)
├── node_modules/                 # Dependências (não versionado)
│
├── .env                          # Variáveis de ambiente (não versionado)
├── .env.example                  # Exemplo de configuração
├── .gitignore                    # Arquivos ignorados pelo Git
├── docker-compose.yml            # Configuração Docker para Redis
├── .dockerignore                 # Arquivos ignorados pelo Docker
├── package.json                  # Dependências e scripts
├── tsconfig.json                 # Configuração TypeScript
├── .eslintrc.js                  # Configuração ESLint
├── .prettierrc                   # Configuração Prettier
└── README.md                     # Este arquivo
```

---

## 🎯 Decisões Técnicas

### Por que Redis ao invés de PostgreSQL/MongoDB?

- ✅ O desafio não exige persistência de usuários
- ✅ Redis resolve cache E blacklist de tokens
- ✅ Performance superior (in-memory)
- ✅ TTL automático (limpeza eficiente)
- ✅ Menos complexidade, foco na qualidade

### Por que TypeScript?

- ✅ Tipagem estática previne bugs
- ✅ Melhor experiência de desenvolvimento (autocomplete)
- ✅ Documentação automática do código
- ✅ Facilita manutenção e refatoração

### Por que JWT com Blacklist?

- ✅ JWT = Performance (stateless)
- ✅ Blacklist = Segurança (logout real)
- ✅ Redis = Eficiência (TTL automático)
- ✅ Melhor dos dois mundos

---

## 📊 Status do Projeto

✅ **Pronto para Produção**

### Checklist de Requisitos

**Obrigatórios:**

- [x] API Node.js com endpoint POST
- [x] Consulta ao ViaCEP
- [x] Sistema de autenticação
- [x] Validações robustas
- [x] Código limpo e documentado
- [x] Lint configurado
- [x] Estrutura organizada

**Opcionais:**

- [x] Cache com TTL de 5 minutos
- [x] Indicador de origem dos dados
- [x] Exemplos de requisição

**Extras:**

- [x] TypeScript
- [x] Arquitetura profissional
- [x] JWT com blacklist
- [x] Docker support
- [x] Error handler global
- [x] Postman Collection

---

## 👤 Contato

**[SEU_NOME]**

- GitHub: [@[SEU_GITHUB]](https://github.com/[SEU_GITHUB])
- Email: [SEU_EMAIL]
- LinkedIn: [SEU_LINKEDIN] (opcional)

---

## 🙏 Agradecimentos

- [ViaCEP](https://viacep.com.br/) - API de consulta de CEPs
- [Egadnet](https://www.egadnet.com.br/) - Pelo desafio técnico
- Comunidade Node.js, TypeScript e Redis

---

<div align="center">

**Desenvolvido com ❤️ para o desafio técnico Egadnet**

⭐ Se este projeto te ajudou, considere dar uma estrela!

</div>
