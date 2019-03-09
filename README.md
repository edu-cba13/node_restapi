# Express & mssql REST API Boilerplate in ES6  [![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome)


# [![Express ES6 REST API Starter](https://cloud.githubusercontent.com/assets/4172932/12660610/90f5b856-c63a-11e5-878e-c9f0bbf33090.jpg)](https://172.16.3.23/PROG69AB/api-cartilla-prestadores)

## Overview

Esta es una aplicación base para crear API REST en Node.js utilizando ES6 y Express con cobertura de código y autenticación JWT. Te ayuda a mantenerte productivo siguiendo las mejores prácticas. Sigue [la guía de estilo de Javascript de Airbnb] (https://github.com/airbnb/javascript).

Inspirado de [Express & mongoose REST API Boilerplate in ES6 with Code Coverage](https://github.com/KunalKapadia/express-mongoose-es6-rest-api).

### Característica

| Característica                                | Rerumen                                                                                                                                                                                                                                                     |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ES6 via Babel                  	 	 | ES6 support using [Babel](https://babeljs.io/).  |
| Authentication via JsonWebToken                  	 	 | Supports authentication using [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken).  |
| Code Linting               			 | JavaScript code linting is done using [ESLint](http://eslint.org) - a pluggable linter tool for identifying and reporting on patterns in JavaScript. Uses ESLint with [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb), which tries to follow the Airbnb JavaScript style guide.                                                                                                |
| Auto server restart                  	 | Restart the server using [nodemon](https://github.com/remy/nodemon) in real-time anytime an edit is made, with babel compilation and eslint.                                                                                                                                                                                                                                                                                                                                                       |
| Debugging via [debug](https://www.npmjs.com/package/debug)           | Instead of inserting and deleting console.log you can replace it with the debug function and just leave it there. You can then selectively debug portions of your code by setting DEBUG env variable. If DEBUG env variable is not set, nothing is displayed to the console.                       |
| Promisified Code via [bluebird](https://github.com/petkaantonov/bluebird)           | We love promise, don't we ? All our code is promisified and even so our tests via [supertest-as-promised](https://www.npmjs.com/package/supertest-as-promised).               |
| API parameter validation via [express-validation](https://www.npmjs.com/package/express-validation)           | Validate body, params, query, headers and cookies of a request (via middleware) and return a response with errors; if any of the configured validation rules fail. You won't anymore need to make your route handler dirty with such validations. |
| Secure app via [helmet](https://github.com/helmetjs/helmet)           | Helmet helps secure Express apps by setting various HTTP headers. |

- CORS support via [cors](https://github.com/expressjs/cors)
- Uses [http-status](https://www.npmjs.com/package/http-status) to set http status code. It is recommended to use `httpStatus.INTERNAL_SERVER_ERROR` instead of directly using `500` when setting status code.

## Comenzar

Clone the repo:
```sh
git clone git@github.com:KunalKapadia/express-mongoose-es6-rest-api.git
cd express-mongoose-es6-rest-api
```

Install dependencies:
```sh
npm install
```

Set environment (vars):
```sh
cp .env.example .env
```

Start server:
```sh
# Start server
npm start
```

Tests:
```sh
# Run tests written in ES6 
npm test
```

Build server code:
```sh
# Wipe out build directory
npm run-script build

# Clean build directory.
npm run-script clean
```

##### Deployment

```sh
# compile to ES5
1. npm run-script build

# upload dist/ to your server
2. scp -rp build/ user@dest:/path

# install production dependencies only
3. npm --production

# Use any process manager to start your services
4. pm2 start build/index.js
```

En producción, debes asegurarte de que tu servidor siempre esté activo, lo ideal es que utilices el administrador de procesos recomendado. [here](http://expressjs.com/en/advanced/pm.html).
Se recomienda [pm2](http://pm2.keymetrics.io/) ya que tiene varias funciones útiles como puede configurarse para iniciar automáticamente sus servicios si el sistema se reinicia.

## Logging


La biblioteca de registro universal [winston](https://www.npmjs.com/package/winston) se usa para iniciar sesión. Tiene soporte para múltiples transports. Un transporte es esencialmente un dispositivo de almacenamiento para tus registros. Cada instancia de un registrador winston puede tener múltiples transports configurados en diferentes niveles. Por ejemplo, uno puede querer que los registros de errores se almacenen en una ubicación remota persistente (como una base de datos), pero todos los registros se envían a la consola o a un archivo local. Simplemente iniciamos sesión en la consola para simplificar, puede configurar más transports según sus necesidades.

En esta aplicacion se configuro por defecto los transports consola y archivo de log para errores en el directorio loggin.

#### API logging
Registra información detallada sobre cada solicitud de API a la consola durante el desarrollo.
![Detailed API logging](https://cloud.githubusercontent.com/assets/4172932/12563354/f0a4b558-c3cf-11e5-9d8c-66f7ca323eac.JPG)

#### Error logging
Registra la pila de error de la consola junto con otros detalles. Lo ideal sería almacenar todos los mensajes de error de forma persistente.
![Error logging](https://cloud.githubusercontent.com/assets/4172932/12563361/fb9ef108-c3cf-11e5-9a58-3c5c4936ae3e.JPG)



## Meta

Alejo Bianchi – alejobianchi@gmail.com

