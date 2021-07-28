# Weather API

# Installation
## Prerequisites
- [Docker](https://www.docker.com/)
- [NodeJs](https://nodejs.org/)

```
$ npm install

or

$ docker-compose up --build
```

# Usage
To run the application without docker on dev mode run the following at the project root folder.
You still will need to setup your own MongoDB instance in this case.

```
$ npm start
```
To run test use any of the following

```
$ npm run test
```

OpenAPI document page will be served under

```
$ localhost:3000/api-docs/
```


# Dependencies

- [typescript](https://www.npmjs.com/package/typescript)
    Enables proper OOP concepts usage which helps to scale enterprise size applications/servers

- [express](https://www.npmjs.com/package/express)
    Small and reliable web framework, providing robust tooling for HTTP servers. Works great with SPA's and public HTTP API projects

- [express-validator](https://www.npmjs.com/package/express-validator)
    Express body and field validator helper, providing easier access and extra features during developement to check necessary data for the API

- [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)
 Allows you to serve auto-generated living documentation for your API hosted from your API server via a route. based on a OpenAPI file format

- [winston](https://www.npmjs.com/package/winston)
    Responsible for logging requests to our API and the responses

- [express-winston](https://www.npmjs.com/package/express-winston)
    Integrates directly with Express.js, so that all standard API-related winston logging code is already done

- [helmet](https://www.npmjs.com/package/helmet)
    Middleware that helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but can solve many common situations

- [mongoose](https://www.npmjs.com/package/mongoose)
     MongoDB object modeling tool designed to work in an asynchronous environment. MongoDB fits our needs since this API does need to cross any relationship between the data models

- [mocha](https://www.npmjs.com/package/mocha)
    JavaScript test framework

- [chai](https://www.npmjs.com/package/chai)
    JavaScript BDD / TDD assertion library to be integrated with Mocha

- [supertest](https://www.npmjs.com/package/supertest)
    Mock API requests to provide HTTP assertions during test

- [ts-node](https://www.npmjs.com/package/ts-node)
    TypeScript execution engine and REPL for Node.js. Added to auxiliary during testing

- [eslint](https://www.npmjs.com/package/eslint)
    JavaScript linter to help find issues both in style and semantics during development

- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
    An implementation of JSON Web Tokens to authenticate who can manipulate the API

- [argon2](https://www.npmjs.com/package/argon2)
    Auxiliary lib to generate hash passwords before being stored in the DB

- [cors](https://www.npmjs.com/package/cors)
    Express middleware that allows us to enable cross-origin resource sharing

- [debug](https://www.npmjs.com/package/debug)
    Module that we will use to avoid calling console.log() while developing our application

- [dotenv](https://www.npmjs.com/package/dotenv)
    Added for development purposes to read .env file. This practice is bad and should be avoided if you have proper environment set

- [shortid](https://www.npmjs.com/package/shortid)
    Auxiliary lib to generate small and secure ID's. its current deprecated and if needed to be used should be update to [NanoID](https://github.com/ai/nanoid/)

# Comments
There is a lots of potential to keep scaling this project, but unfortunately there was no time to do it. 

 - Add real time DB updates from another weather API / Database

 - Proper server current time/date to select the weather data range correct range (Currently it only take the last values available)

 - We could add more paths or accept more parameters to server the data more precisely to the user.

 - Add more admin routes and better user management (including testing) since those was added just to provide the security context for the API

 - Better feedback messaging system so the users who will consume the API can get better insights of their requests

One of the requirements that is lacking is the real time push notifications. In this case I do have in mind 2 solutions we could be implementing:

 - First: WebSockets, using [Socket.io](https://www.npmjs.com/package/socket.io). This solution would be the better one to scale and most security as well, providing all the necessary tooling we might need to keep the connected apps real time and with more control over the connected peers

 - Second: Service Workers with a push notification system. But this one can face different issues with security and browser support in general


# Authors
- [Felipe Rybakovas](http://rybakovas.me)
