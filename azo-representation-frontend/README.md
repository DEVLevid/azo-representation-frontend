# AZO Representation Frontend

## Visão Geral

Este projeto implementa uma **Arquitetura Hexagonal (Ports and Adapters)** para uma aplicação frontend moderna construída com Next.js 15, TypeScript e React. A arquitetura garante separação clara de responsabilidades, testabilidade e manutenibilidade do código.

## Arquitetura Hexagonal

### Princípios Fundamentais

A arquitetura hexagonal divide a aplicação em três camadas principais:

1. **Core (Domínio)**: Lógica de negócio e regras da aplicação
2. **Infrastructure (Infraestrutura)**: Implementações concretas de interfaces externas
3. **Application (Aplicação)**: Orquestração e casos de uso

### Estrutura de Diretórios

```
src/
├── Core/                    # Camada de domínio (núcleo da aplicação)
│   ├── domain/             # Entidades e regras de negócio
│   ├── interfaces/         # Contratos e abstrações
│   ├── services/           # Serviços de domínio
│   ├── useCases/           # Casos de uso da aplicação
│   ├── error/              # Tratamento de erros
│   └── utils/              # Utilitários do domínio
├── Infra/                  # Camada de infraestrutura
│   ├── api/                # Implementações de API
│   ├── mock/               # Dados mock para desenvolvimento
│   ├── di/                 # Injeção de dependências
│   └── config/             # Configurações
└── app/                    # Camada de apresentação (Next.js)
    ├── api/                # Rotas da API
    ├── components/         # Componentes React
    └── [pages]/            # Páginas da aplicação
```

## 🔧 Componentes da Arquitetura

### 1. Core Domain (Domínio Central)

#### Entidades (`Core/domain/entities/`)

**User.ts**
- **Propósito**: Representa a entidade usuário do sistema
- **Responsabilidades**: 
  - Definir estrutura de dados do usuário
  - Implementar regras de negócio (validações, transformações)
  - Garantir imutabilidade dos dados
- **Funcionalidades**:
  - Criação de usuários com validações
  - Atualização de informações
  - Controle de roles (ADMIN, USER, MODERATOR)

**Auth.ts**
- **Propósito**: Gerenciar autenticação e sessões
- **Responsabilidades**:
  - Credenciais de login
  - Tokens de acesso e refresh
  - Sessões de usuário
- **Funcionalidades**:
  - Validação de autenticação
  - Controle de permissões por role
  - Gerenciamento de estado de login

#### Interfaces (`Core/interfaces/`)

**Repositories (`Core/interfaces/repositories/`)**
- **IUserRepository**: Contrato para operações de usuários
- **IAuthRepository**: Contrato para operações de autenticação
- **Propósito**: Definir contratos que a infraestrutura deve implementar

**Services (`Core/interfaces/services/`)**
- **IUserService**: Contrato para serviços de usuário
- **IAuthService**: Contrato para serviços de autenticação
- **Propósito**: Definir operações de negócio que podem ser executadas

#### Serviços (`Core/services/`)

**UserService**
- **Propósito**: Implementar lógica de negócio para usuários
- **Responsabilidades**:
  - Validações de dados
  - Regras de negócio
  - Orquestração de operações
- **Funcionalidades**:
  - CRUD de usuários
  - Validação de senhas
  - Controle de duplicação

**AuthService**
- **Propósito**: Gerenciar autenticação e autorização
- **Responsabilidades**:
  - Validação de credenciais
  - Gerenciamento de tokens
  - Controle de sessões
- **Funcionalidades**:
  - Login/logout
  - Refresh de tokens
  - Validação de permissões

#### Casos de Uso (`Core/useCases/`)

**LoginUseCase**
- **Propósito**: Orquestrar o processo de login
- **Responsabilidades**:
  - Validação de entrada
  - Execução da lógica de negócio
  - Tratamento de erros
- **Fluxo**: Credenciais → Validação → Autenticação → Sessão

**CreateUserUseCase**
- **Propósito**: Orquestrar a criação de usuários
- **Responsabilidades**:
  - Validação de dados
  - Verificação de duplicação
  - Criação segura
- **Fluxo**: Dados → Validação → Verificação → Criação

#### Tratamento de Erros (`Core/error/`)

**AppError**
- **Propósito**: Classe base para erros da aplicação
- **Características**:
  - Códigos de status HTTP
  - Rastreamento de stack
  - Categorização de erros

**Tipos Específicos**:
- `ValidationError`: Erros de validação (400)
- `AuthenticationError`: Erros de autenticação (401)
- `AuthorizationError`: Erros de autorização (403)
- `NotFoundError`: Recursos não encontrados (404)
- `ConflictError`: Conflitos de dados (409)

#### Utilitários (`Core/utils/`)

**Result.ts**
- **Propósito**: Implementar padrão Result para operações que podem falhar
- **Benefícios**:
  - Tratamento explícito de sucesso/falha
  - Encadeamento de operações
  - Type safety para erros

### 2. Infrastructure (Infraestrutura)

#### Repositórios de API (`Infra/api/`)

**UserApiRepository**
- **Propósito**: Implementar `IUserRepository` usando HTTP
- **Responsabilidades**:
  - Comunicação com API REST
  - Mapeamento de dados
  - Tratamento de erros HTTP
- **Endpoints**:
  - `GET /api/users` - Listar usuários
  - `POST /api/users` - Criar usuário
  - `PUT /api/users/:id` - Atualizar usuário
  - `DELETE /api/users/:id` - Deletar usuário

**AuthApiRepository**
- **Propósito**: Implementar `IAuthRepository` usando HTTP
- **Responsabilidades**:
  - Autenticação via API
  - Gerenciamento de tokens
  - Validação de sessões
- **Endpoints**:
  - `POST /api/auth/login` - Login
  - `POST /api/auth/refresh` - Refresh token
  - `POST /api/auth/logout` - Logout
  - `GET /api/auth/validate` - Validar token

#### Repositórios Mock (`Infra/mock/`)

**MockUserRepository**
- **Propósito**: Implementar `IUserRepository` com dados em memória
- **Uso**: Desenvolvimento e testes
- **Dados Iniciais**:
  - Admin: admin@example.com / admin123
  - User: user@example.com / user123

**MockAuthRepository**
- **Propósito**: Implementar `IAuthRepository` com autenticação simulada
- **Uso**: Desenvolvimento sem backend
- **Funcionalidades**:
  - Validação de credenciais hardcoded
  - Geração de tokens simulados
  - Gerenciamento de sessões em memória

#### Injeção de Dependências (`Infra/di/`)

**Container**
- **Propósito**: Gerenciar dependências da aplicação
- **Responsabilidades**:
  - Configuração de implementações
  - Ciclo de vida dos serviços
  - Alternância entre mock e produção
- **Funcionalidades**:
  - Singleton pattern
  - Auto-configuração por ambiente
  - Método para alternar implementações

#### Configuração (`Infra/config/`)

**environment.ts**
- **Propósito**: Centralizar configurações da aplicação
- **Configurações**:
  - Ambiente (dev/prod/test)
  - URLs de API
  - Configurações de cookies
  - Flags de funcionalidade

### 3. Application Layer (Camada de Aplicação)

#### Rotas da API (`app/api/`)

**`/api/auth/login`**
- **Método**: POST
- **Propósito**: Autenticar usuários
- **Fluxo**: Recebe credenciais → Valida → Autentica → Retorna sessão + cookies

**`/api/users`**
- **Métodos**: GET, POST
- **Propósito**: Gerenciar usuários
- **Funcionalidades**:
  - GET: Listar todos os usuários
  - POST: Criar novo usuário

#### Páginas (`app/`)

**Dashboard (`/dashboard`)**
- **Propósito**: Página principal após login
- **Funcionalidades**:
  - Estatísticas de usuários
  - Lista de usuários recentes
  - Métricas do sistema

**Navegação**
- **Componente**: `Navigation.tsx`
- **Propósito**: Menu principal da aplicação
- **Funcionalidades**:
  - Navegação entre páginas
  - Menu responsivo
  - Indicador de página ativa

#### Componentes (`app/components/`)

**LoadingSpinner**
- **Propósito**: Indicador de carregamento
- **Características**:
  - Tamanhos configuráveis
  - Animação CSS
  - Reutilizável

## Fluxo de Dados

### 1. Autenticação
```
Login Form → API Route → AuthService → AuthRepository → Response + Cookies
```

### 2. Listagem de Usuários
```
Dashboard → UserService → UserRepository → API/Repository → UI Update
```

### 3. Criação de Usuário
```
Form → API Route → UserService → UserRepository → Validation → Creation → Response
```

## Benefícios da Arquitetura

### 1. **Separação de Responsabilidades**
- Domínio isolado de detalhes técnicos
- Lógica de negócio independente de frameworks
- Interfaces claras entre camadas

### 2. **Testabilidade**
- Mock repositories para testes unitários
- Injeção de dependências facilita testes
- Domínio testável sem infraestrutura

### 3. **Manutenibilidade**
- Código organizado por responsabilidade
- Mudanças isoladas por camada
- Documentação clara de cada componente

### 4. **Flexibilidade**
- Fácil troca de implementações
- Suporte a diferentes fontes de dados
- Configuração por ambiente

### 5. **Escalabilidade**
- Estrutura preparada para crescimento
- Padrões consistentes
- Reutilização de componentes

## Padrões Utilizados

### 1. **Repository Pattern**
- Abstração de acesso a dados
- Implementações específicas por fonte
- Contratos claros

### 2. **Service Layer**
- Lógica de negócio centralizada
- Orquestração de operações
- Validações e regras

### 3. **Dependency Injection**
- Inversão de controle
- Configuração centralizada
- Facilita testes

### 4. **Result Pattern**
- Tratamento explícito de erros
- Encadeamento de operações
- Type safety

### 5. **Ports and Adapters**
- Interfaces definem contratos
- Implementações são adaptadores
- Domínio independente de detalhes

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para detalhes.
