# Polls API

API para plataforma de enquetes desenvolvida durante o evento Next Level Week,
da empresa Rocketseat, em fevereiro de 2024.

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Fastify](https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white)

## Como executar o projeto

Instruções para executar o projeto localmente

### Pré requisitos

Para executar esse projeto você precisa ter instalado em sua máquina:

- [NodeJS](https://nodejs.org/en)
- [Docker](https://docs.docker.com/get-docker/)

### Passo a passo

1. Faça o download do repositório e abra a pasta no terminal

2. Instale os pacotes npm com o comando a seguir:

    ```bash
    npm i
    ```

3. Inicie o postgres e o redis usando o seguinte comando:

    ```bash
    docker compose up -d
    ```

4. Aplique as migrações do banco de dados:

    ```bash
    npx prisma migrate dev
    ```

5. Inicie o servidor local:

    ```bash
    npm run dev
    ```

## Comandos úteis

Lista de comandos e configurações que podem ser úteis enquanto estiver
trabalhando nesse projeto.

### Docker

- Iniciar docker (linux)

  ```bash
  systemctl start docker
  ```

- Parar docker (linux)

  ```bash
  systemctl stop docker
  ```

- Listar containers em execução

  ```bash
  docker ps
  ```

- Iniciar containers com o docker compose

  ```bash
  docker compose up -d
  ```

- Parar containers com o docker compose

  ```bash
  docker compose stop
  ```

### Prisma

- Iniciar interface web de gerenciamento de banco de dados do Prisma

  ```bash
  npx prisma studio
  ```

- Inicializar prisma em um novo projeto

  ```bash
  npx prisma init
  ```

- Criar migração

  ```bash
  npx prisma migrate dev
  ```

### VS Code

- Configuração para formatação automática dos arquivos do Prisma

  - Instalar a extensão [Prisma](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma)

  - Abrir a opção `Abrir as configurações do usuário (JSON)` e adicionar a
  configuração a seguir

  ```JSON
  "[prisma]": {
    "editor.defaultFormatter": "Prisma.prisma",
    "editor.formatOnSave": true
  }
  ```
