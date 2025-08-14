# Diagrama da Arquitetura Hexagonal

## Responsabilidades de Cada Camada

### **Presentation Layer (Next.js App)**
```
┌─────────────────────────────────────────────────────────────────┐
│                        RESPONSIBILITIES                         │
├─────────────────────────────────────────────────────────────────┤
│ • Renderização da interface do usuário                          │
│ • Navegação entre páginas                                       │
│ • Formulários e validação de entrada                            │
│ • Tratamento de eventos do usuário                              │
│ • Gerenciamento de estado da UI                                 │
│ • Responsividade e acessibilidade                               │
└─────────────────────────────────────────────────────────────────┘
```

### **Application Layer (Use Cases & Services)**
```
┌─────────────────────────────────────────────────────────────────┐
│                        RESPONSIBILITIES                         │
├─────────────────────────────────────────────────────────────────┤
│ • Orquestração de operações de negócio                          │
│ • Validação de dados de entrada                                 │
│ • Aplicação de regras de negócio                                │
│ • Tratamento de erros de aplicação                              │
│ • Coordenação entre diferentes serviços                         │
│ • Lógica de transações                                          │
└─────────────────────────────────────────────────────────────────┘
```

### **Core Domain (Entities & Business Rules)**
```
┌─────────────────────────────────────────────────────────────────┐
│                        RESPONSIBILITIES                         │
├─────────────────────────────────────────────────────────────────┤
│ • Definição de entidades de negócio                             │
│ • Implementação de regras de negócio                            │
│ • Validações de domínio                                         │
│ • Lógica de negócio invariante                                  │
│ • Contratos e interfaces                                        │
│ • Utilitários de domínio                                        │
└─────────────────────────────────────────────────────────────────┘
```

### **Infrastructure Layer (Repositories & External)**
```
┌─────────────────────────────────────────────────────────────────┐
│                        RESPONSIBILITIES                         │
├─────────────────────────────────────────────────────────────────┤
│ • Implementação de interfaces de domínio                        │
│ • Comunicação com sistemas externos                             │
│ • Persistência de dados                                         │
│ • Configuração de ambiente                                      │
│ • Injeção de dependências                                       │
│ • Adaptação de tecnologias externas                             │
└─────────────────────────────────────────────────────────────────┘
```

## 🔌 Ports and Adapters

### **Ports (Interfaces)**
```
┌─────────────────────────────────────────────────────────────────┐
│                           PORTS                                 │
├─────────────────────────────────────────────────────────────────┤
│ • IUserRepository: Contrato para operações de usuário           │
│ • IAuthRepository: Contrato para operações de autenticação      │
│ • IUserService: Contrato para serviços de usuário               │
│ • IAuthService: Contrato para serviços de autenticação          │
│ • User Entity: Contrato para estrutura de usuário               │
│ • Auth Entity: Contrato para estrutura de autenticação          │
└─────────────────────────────────────────────────────────────────┘
```

### **Adapters (Implementations)**
```
┌─────────────────────────────────────────────────────────────────┐
│                         ADAPTERS                                │
├─────────────────────────────────────────────────────────────────┤
│ • UserApiRepository: Implementa IUserRepository via HTTP        │
│ • AuthApiRepository: Implementa IAuthRepository via HTTP        │
│ • MockUserRepository: Implementa IUserRepository com dados      │
│ • MockAuthRepository: Implementa IAuthRepository com dados      │
│ • UserService: Implementa IUserService                          │
│ • AuthService: Implementa IAuthService                          │
└─────────────────────────────────────────────────────────────────┘
```

## Estratégia de Testes

### **Testes por Camada**
```
┌─────────────────────────────────────────────────────────────────┐
│                        TESTING STRATEGY                         │
├─────────────────────────────────────────────────────────────────┤
│ • Unit Tests: Core Domain (Entities, Services, Use Cases)       │
│ • Integration Tests: Application Layer (Services + Repos)       │
│ • Contract Tests: Interfaces vs Implementations                 │
│ • E2E Tests: Presentation Layer (User Flows)                    │
│ • Mock Tests: Infrastructure Layer (Mock Repositories)          │
└─────────────────────────────────────────────────────────────────┘
```

## Ciclo de Vida das Dependências

### **Container de Injeção de Dependências**
```
┌─────────────────────────────────────────────────────────────────┐
│                    DEPENDENCY LIFECYCLE                         │
├─────────────────────────────────────────────────────────────────┤
│ 1. Container inicializa                                         │
│ 2. Repositories são configurados (Mock/API)                     │
│ 3. Services são criados com repositories injetados              │
│ 4. Use Cases são criados com services injetados                 │
│ 5. Controllers recebem use cases via container                  │
│ 6. UI components consomem services via hooks                    │
└─────────────────────────────────────────────────────────────────┘
```

## Benefícios da Arquitetura

### **1. Separação de Responsabilidades**
- Cada camada tem uma responsabilidade específica
- Mudanças em uma camada não afetam outras
- Código mais organizado e legível

### **2. Testabilidade**
- Domínio pode ser testado independentemente
- Mock repositories facilitam testes unitários
- Interfaces claras para mocking

### **3. Manutenibilidade**
- Estrutura previsível e consistente
- Fácil localização de código
- Padrões bem definidos

### **4. Flexibilidade**
- Fácil troca de implementações
- Suporte a diferentes tecnologias
- Configuração por ambiente

### **5. Escalabilidade**
- Estrutura preparada para crescimento
- Novos recursos seguem padrões existentes
- Reutilização de componentes

## Padrões de Design Utilizados

### **1. Repository Pattern**
- Abstração de acesso a dados
- Implementações específicas por fonte
- Contratos claros

### **2. Service Layer Pattern**
- Lógica de negócio centralizada
- Orquestração de operações
- Validações e regras

### **3. Dependency Injection Pattern**
- Inversão de controle
- Configuração centralizada
- Facilita testes

### **4. Result Pattern**
- Tratamento explícito de erros
- Encadeamento de operações
- Type safety

### **5. Ports and Adapters Pattern**
- Interfaces definem contratos
- Implementações são adaptadores
- Domínio independente de detalhes

Esta arquitetura fornece uma base sólida para o desenvolvimento de aplicações frontend escaláveis, testáveis e manuteníveis, seguindo os princípios da arquitetura hexagonal e clean architecture.
