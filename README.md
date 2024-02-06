# Polls API

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
