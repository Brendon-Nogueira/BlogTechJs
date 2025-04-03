# Blog Tech 📝🚀

> Uma aplicação de blog desenvolvida com **Node.js, EJS e MySQL**, onde os usuários podem criar artigos organizados por categorias.
>  É um projeto Web tradicional no padrão MVC
> Com intenção de praticar funcionalidades que  **Node.js** proporciona como criação de rotas com Express, regra de negócio no model Sequelize ORM, gerenciamento de sessões com express-sesssion, autenticação JWT, Hashs de senhas etc...

## 📌 Tecnologias Utilizadas

- **Node.js** - Para a criação do servidor backend
- **Express.js** - Para gerenciar as rotas da aplicação
- **EJS** - Para renderizar páginas dinâmicas 
- **MySQL** - Banco de dados para armazenar os artigos e categorias
- **Sequelize ORM** - Para facilitar a interação com o banco de dados
- **Bootstrap** - Para estilização da interface
- **SweetAlert2** - Para criações de alertas
-  **DataTable** - Para exibir as informações em tabelas



## 🛠 Configuração do Projeto
Instalar Node.js LTS
Instalar o Mysql

### 📥 Clonando o Repositório
```sh
git clone https://github.com/seuusuario/blog-tech.git
cd blog-tech
```

### 📦 Instalando Dependências
```sh
npm i express --save
npm i express-session --save
npm i nodemon --save
npm i ejs --save
npm i mysql2 --save
npm i sequelize --save
npm i slugify --save
npm i bcryptjs --save
npm i dotenv --save
npm i jsonwebtoken --save
```

### ⚙️ Configuração do Banco de Dados
1. Certifique-se de ter o MySQL instalado e rodando.
2. Crie um banco de dados chamado **blog_tech**.
3. Configure o arquivo `connection.js` com suas credenciais do banco:
   ```env
   DB_NAME=blog_tech
   DB_USER=root
   DB_PASSWORD=sua_senha
   DB_HOST=localhost
   DB_DIALECT=mysql
   ```
4. Execute as migrations para criar as tabelas:
   ```sh
   npx sequelize db:migrate
   ```

### 🚀 Executando o Projeto
```sh
npm start
```
O servidor rodará em `http://localhost:8088` opcional você colocar na porta de sua preferência

## 📌 Funcionalidades

✅ Criar categorias para organizar os artigos 🏷️
✅ Criar, editar e excluir artigos ✍️
✅ Exibir artigos por categoria 📚
✅ Interface dinâmica e responsiva 🎨

## 📁 Estrutura do Projeto
```plaintext
📦 blog-tech
├── .env
├── 📂 src
│   ├── 📂 config  # Arquivos de conexão
│   ├── 📂 controllers # Lógica das rotas
│   ├── 📂 middleware # Autenticação JWT
│   ├── 📂 model   # Modelos do Sequelize
│   ├── 📂 public  # Arquivos estáticos (CSS, JS, imagens)
│   ├── 📂 router  # Rotas da aplicação
│   ├── 📂 views   # Arquivos EJS



├── index.js.js  # Arquivo principal
├── connection.js  # Configuração do banco de dados
├── package.json  # Dependências do projeto
```

## 🎯 Rotas da Aplicação

| Método | Rota                          | Descrição                                       |
|--------|-------------------------------|-------------------------------------------------|
| GET    | `/`                           | Página inicial com listagem de artigos         |
| GET    | `/about`                      | Página sobre a aplicação                       |
| GET    | `/admin/categorias`           | Listagem de categorias (requer autenticação)   |
| GET    | `/admin/categorias/new`       | Formulário para criar nova categoria           |
| POST   | `/categorias/save`            | Salvar uma nova categoria                      |
| POST   | `/categorias/update`          | Atualizar o título de uma categoria            |
| POST   | `/categorias/delete`          | Deletar uma categoria                          |
| POST   | `/categorias/delete/:id`      | Deletar uma categoria por ID (requer autenticação) |
| GET    | `/admin/categorias/edit/:id`  | Página para editar uma categoria (requer autenticação) |
| POST   | `/admin/categorias/edit/:id`  | Editar uma categoria                           |
| GET    | `/admin/artigos`              | Listagem de artigos (requer autenticação)      |
| GET    | `/admin/artigos/new`          | Formulário para criar um novo artigo          |
| POST   | `/artigos/save`               | Salvar um novo artigo                          |
| POST   | `/artigos/delete`             | Deletar um artigo                              |
| POST   | `/artigos/update`             | Atualizar um artigo                            |
| GET    | `/admin/artigos/edit/:id`     | Página para editar um artigo (requer autenticação) |
| GET    | `/login`                      | Página de login                               |
| POST   | `/login`                      | Autenticação de usuário                       |
| GET    | `/registrar`                  | Página de registro de novo usuário           |
| POST   | `/registrar/novo_usuario`     | Criar um novo usuário                         |
| POST   | `/logout`                     | Logout do usuário                            |
| GET    | `/admin/usuarios`             | Listagem de usuários (requer autenticação)   |

Feito por [BRENDON NOGUEIRA](https://github.com/Brendon-Nogueira) 😃



