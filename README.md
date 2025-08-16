# API REST de Gerenciamento de Cursos

Uma API REST moderna desenvolvida com Fastify e TypeScript, utilizando PostgreSQL como banc## 🔍 Features

- Logging formatado com `pino-pretty`
- Documentação OpenAPI automática
- Validação de dados com Zod
- Migrations automáticas com Drizzle Kit
- Interface de administração do banco com Drizzle Studio

## 🔄 Fluxo da Aplicação

O diagrama abaixo ilustra o fluxo principal da aplicação, desde a requisição HTTP até a resposta, incluindo validação e interação com o banco de dados:

```mermaid
sequenceDiagram
    participant C as Cliente
    participant F as Fastify Server
    participant Z as Zod Validator
    participant D as Drizzle ORM
    participant DB as PostgreSQL

    %% Fluxo de Criação de Curso
    C->>+F: POST /courses
    Note over C,F: { title, description }
    F->>Z: Validar payload
    alt Validação falha
        Z-->>F: Erro de validação
        F-->>C: 400 Bad Request
    else Validação sucesso
        Z-->>F: Dados validados
        F->>+D: Inserir curso
        D->>+DB: INSERT INTO courses
        DB-->>-D: Retorna ID
        D-->>-F: Curso criado
        F-->>-C: 201 Created
    end

    %% Fluxo de Consulta de Cursos
    C->>+F: GET /courses
    F->>+D: Buscar cursos
    D->>+DB: SELECT * FROM courses
    DB-->>-D: Lista de cursos
    D-->>-F: Dados formatados
    F-->>-C: 200 OK
```

## 📄 Licenças e Drizzle ORM para gerenciamento de dados. A API inclui documentação automática com Swagger/OpenAPI e interface de documentação com Scalar.

## 🚀 Tecnologias

Este projeto utiliza um stack moderno de tecnologias:

- [Fastify](https://fastify.io/) - Framework web de alta performance
- [TypeScript](https://www.typescriptlang.org/) - Tipagem estática para JavaScript
- [PostgreSQL](https://www.postgresql.org/) - Banco de dados relacional
- [Drizzle ORM](https://orm.drizzle.team/) - ORM TypeScript-first
- [Zod](https://zod.dev/) - Validação de schemas
- [Swagger/OpenAPI](https://swagger.io/) - Documentação da API
- [@scalar/fastify-api-reference](https://github.com/scalar/scalar) - Interface moderna para documentação

## 💻 Estrutura do Projeto

```
.
├── src/
│   ├── database/
│   │   ├── client.ts    # Configuração do cliente do banco de dados
│   │   └── schema.ts    # Schema do banco de dados (Drizzle ORM)
│   ├── routes/
│   │   ├── create-courses.ts
│   │   ├── get-courses.ts
│   │   └── get-courses-by-id.ts
│   └── app.ts
├── server.ts
├── drizzle.config.ts
└── docker-compose.yml
```

## 📋 Pré-requisitos

- Node.js
- PostgreSQL
- Docker (opcional)

## 🔧 Configuração do Ambiente

1. Clone o repositório:
```bash
git clone https://github.com/GustavoSirkis/restAPI.git
cd restAPI
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```env
DATABASE_URL="postgresql://seu_usuario:sua_senha@localhost:5432/nome_do_banco"
```

4. Execute as migrações do banco de dados:
```bash
npm run db:generate
npm run db:migrate
```

## 🎮 Usando a API

Para iniciar o servidor em modo de desenvolvimento:
```bash
npm run dev
```

## 🎯 Endpoints da API

### Cursos

#### GET `/courses`
- **Descrição**: Lista todos os cursos cadastrados
- **Resposta**: Array de cursos com ID e título
- **Status Code**: 200

#### GET `/courses/:id`
- **Descrição**: Retorna detalhes de um curso específico
- **Parâmetros**: ID do curso (UUID)
- **Status Code**: 200

#### POST `/courses`
- **Descrição**: Cria um novo curso
- **Corpo da Requisição**:
  ```json
  {
    "title": "string (mínimo 5 caracteres)",
    "description": "string (opcional)"
  }
  ```
- **Status Code**: 201
- **Resposta**: ID do curso criado

## 🛠️ Scripts Disponíveis

- `npm run dev` - Inicia o servidor em modo de desenvolvimento com hot-reload
- `npm run db:generate` - Gera as migrações do banco de dados
- `npm run db:migrate` - Executa as migrações pendentes
- `npm run db:studio` - Abre o Drizzle Studio para visualização do banco de dados

## 📚 Documentação

A API possui documentação interativa disponível em dois endpoints:

- Swagger UI: `http://localhost:3333/docs`
- Scalar API Reference: `http://localhost:3333/reference`

## 🔐 Validação e Tipos

- Utiliza Zod para validação de entrada e saída
- Integração TypeScript completa com Fastify através do `fastify-type-provider-zod`
- Schemas do banco definidos com Drizzle ORM garantindo type-safety

## 📝 Recursos do Banco de Dados

### Tabela: courses
- `id`: UUID (Primary Key, auto-gerado)
- `title`: Text (Único, não nulo)
- `description`: Text (Opcional)

### Tabela: users
- `id`: UUID (Primary Key, auto-gerado)
- `name`: Text (Não nulo)
- `email`: Text (Único, não nulo)

## 🔍 Features

- Logging formatado com `pino-pretty`
- Documentação OpenAPI automática
- Validação de dados com Zod
- Migrations automáticas com Drizzle Kit
- Interface de administração do banco com Drizzle Studio

## � Licença

Este projeto está sob a licença ISC. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Desenvolvido por GustavoSirkis 👋
