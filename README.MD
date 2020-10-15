<p align="center">
  <img width="200" height="100%" src="https://res.cloudinary.com/practicaldev/image/fetch/s--hrh41qeV--/c_imagga_scale,f_auto,fl_progressive,h_500,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/1s3bedypkt7zm8maikzg.png" alt="API RESTful"></a>
</p>

<h3 align="center">API RESTful Sign-in/up - BOLD BR</h3>


<div align="center">
  
[![Status](https://img.shields.io/badge/status-active-success.svg)]()


</div>


## Apresentação:

Projeto: API RESTful seguindo conceito **MVC** utilizando  **NodeJS**, padronização de código **Eslint** e **Prettier**. Este projeto foi criado para o processo seletivo da **BOLD BR**.

 **[Aplicação Hospedada na Heroku](https://api-restful-boldbr.herokuapp.com/)**

Pacotes principais: 
- **Express** responsável pela criação das rotas e inicio dos `server`.
- **JWT** para persistência do `token` por 30 minutos, mantendo a segurança e garantindo a integridade da API. 
- **Mongoose**, um ORM para conexão com banco de dados NoSQL (**MongoDB**)
- **Yup** para validação dos dados enviados para a API, para garantir a integridade da aplicação.
- **Jest** para realização de tests unitários.

## **Requisitos**

### **Sign up**

Usar status codes de acordo, este endpoint deverá receber um usuário com os seguintes campos: 
- Nome
- E-mail, 
- Senha
- Lista de objetos telefone.

```java
{
  "nome": "string",
  "email": "string",
  "senha": "senha",
  "telefones": [
    {
     "numero": "123456789",
     "ddd": "11"
    }
  ]
}
```

#### **Em caso de sucesso irá retornar um usuário mais os campos:**
* **id**: id do usuário (pode ser o próprio gerado pelo banco, porém seria interessante
  se fosse um GUID
* **data_criacao**: data da criação do usuário
* **data_atualizacao**: data da última atualização do usuário
* **ultimo_login**: data do último login (no caso da criação, será a mesma que a
  criação)
* **token**: token de acesso da API (pode ser um GUID ou um JWT)

- Caso o e-mail já exista, deverá retornar erro com a mensagem "E-mail já existente".
- Token deverá ser persistido junto com o usuário

#### **Sign in**

- Este endpoint irá receber um objeto com e-mail e senha.
- Caso o e-mail exista e a senha seja a mesma que a senha persistida, retornar
      igual ao endpoint de `sign_up`.
- Caso o e-mail não exista, retornar erro com status apropriado mais a mensagem
      "Usuário e/ou senha inválidos"
- Caso o e-mail exista mas a senha não bata, retornar o status apropriado 401
      mais a mensagem "Usuário e/ou senha inválidos"

#### **Buscar usuário**

- Chamadas para este endpoint devem conter um header na requisição de
      Authentication com o valor "Bearer {token}" onde {token} é o valor do token
      passado na criação ou sign in de um usuário.
- Caso o token não exista, retornar erro com status apropriado com a mensagem
      "Não autorizado".
- Caso o token exista, buscar o usuário pelo user_id passado no path e comparar
      se o token no modelo é igual ao token passado no header.
- Caso não seja o mesmo token, retornar erro com status apropriado e mensagem
      "Não autorizado"
- Caso seja o mesmo token, verificar se o último login foi a MENOS que 30
      minutos atrás.
- Caso não seja a MENOS que 30 minutos atrás, retornar erro com status
      apropriado com mensagem "Sessão inválida".
- Caso tudo esteja ok, retornar o usuário.
  

## **Instalação**

- Variável de ambiente `.env.example`:

```java
SECRET_JWT=XXX
MONGO_CONN=mongodb+srv://<user>:<pass>@cluster0-okpdn.gcp.mongodb.net/api
```

- Instalar dependências: `yarn install` ou `npm install`
- Iniciar aplicação em modo de desenvolvimento: `yarn dev` ou `npm run dev`.
- Deploy da aplicação: `yarn start`
- Tests Jest: `yarn test`

## **Rotas**

**POST** `localhost:3333/users`

```java
{
   "nome": "Juan Patrick de Andrade Santos",
   "email": "juan-p.andrade@outlook.com",
   "senha": "123",
   "telefones": [
      {
	"numero": "999865802",
	"ddd": "11"
      },
      {
	"numero": "999865802",
	"ddd": "11"
      }
   ]
}
```

**POST** `localhost:3333/sign-in`

```java
{
   "email": "juan-p.andrade@outlook.com",
   "password": "123"
}
```

**GET** `localhost:3333/users/:user_id`

Observação importante: rota `/users/:user_id` é necessário passar no **header** o parâmetro **authentication** contendo o Token Bearer coletado na rota `sign-in`.

## **Test**

```javascript
yarn run v1.22.5
$ jest --setupFiles dotenv/config --detectOpenHandles --forceExit
 PASS  tests/api.test.js
  Authentication
    ✓ should create session authentication (1233 ms)
  Login
    ✓ should create user session (131 ms)
  User
    ✓ should list user by id (9 ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        2.136 s
Ran all test suites.
Done in 2.58s.
```

## Contato

- E-mail: juan-p.andrade@outlook.com
- [LinkedIn](https://www.linkedin.com/in/juan-patrick/)
