# Blog Tech 📝🚀

> Uma aplicação de blog desenvolvida com **Node.js, EJS e MySQL**, onde os usuários podem criar artigos organizados por categorias.

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
npm i express
npm i nodemon
npm i ejs
npm i mysql2
npm i sequelize
npm i slugify
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
├── 📂 src
│   ├── 📂 config  # Arquivos de conexão
│   ├── 📂 controllers # Lógica das rotas
│   ├── 📂 model   # Modelos do Sequelize
│   ├── 📂 public  # Arquivos estáticos (CSS, JS, imagens)
│   ├── 📂 router  # Rotas da aplicação
│   ├── 📂 views   # Arquivos EJS



├── index.js.js  # Arquivo principal
├── connection.js  # Configuração do banco de dados
├── package.json  # Dependências do projeto
```

## 🎯 Rotas da Aplicação

| Método | Rota                   | Descrição                          |
|--------|----------------------  |--------------------------------------   
| GET    | `/`                    | Página inicial                       |
| GET    | `/categorias`          | Listagem de categorias               |
| POST   | `/admin/categorias/new`| Formulário para criar nova categoria |
| GET    | `/categories/new`      | Formulário para criar uma categoria  |
| POST   | `/categories/save`     | Salvar uma nova categoria            |


Feito  por [BRENDON NOGUEIRA](https://github.com/Brendon-Nogueira) 😃

