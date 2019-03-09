//import Joi from 'joi';
const Joi = require('joi');

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
        NODE_ENV: Joi.string()
            .allow(['development', 'production', 'test', 'provision'])
            .default('development'),
        NODE_PORT: Joi.number()
            .default(4040),
        JWT_SECRET: Joi.string().required()
            .description('JWT Secret required to sign'),
        FILE_MAX_BYTES: Joi.number().default(2000000)
            .description('Max size file upload in bytes'),
        DB_USER: Joi.string().required()
            .description('Usuario base de datos'),
        DB_PASSWORD: Joi.string().required()
            .description('Password usuario db'),
        DB_SERVER: Joi.string().required()
            .description('Servidor Ip'),
        DB_DATABASE: Joi.string().required()
            .description('Nombre base de datos'),
        DB_PORT: Joi.number()
            .description('Port db'),
        DB_DEBUG: Joi.boolean()
            .description('Debug mode'),
        DB_POOL_MAX: Joi.number()
            .description('Max pools'),
        DB_POOL_MIN: Joi.number()
            .description('Min pools'),
        DB_POOL_TIMEOUT: Joi.number()
            .description('Idle time out millis'),
        DB_POOL_ACQUERI: Joi.number()
            .description('Active query time out millis'),
        DB_USER_USER: Joi.string().required()
            .description('Usuario base de datos'),
        DB_USER_PASSWORD: Joi.string().required()
            .description('Password usuario db'),
        DB_USER_SERVER: Joi.string().required()
            .description('Servidor Ip'),
        DB_USER_DATABASE: Joi.string().required()
            .description('Nombre base de datos'),
        DB_USER_PORT: Joi.number()
            .description('Port db'),
        DB_USER_DEBUG: Joi.boolean()
            .description('Debug mode'),
        DB_USER_POOL_MAX: Joi.number()
            .description('Max pools'),
        DB_USER_POOL_MIN: Joi.number()
            .description('Min pools'),
        DB_USER_POOL_TIMEOUT: Joi.number()
            .description('Idle time out millis'),
        DB_USER_POOL_ACQUERI: Joi.number()
            .description('Active query time out millis'),

    }).unknown()
    .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const config = {
    selectLimit: 1000,
    env: envVars.NODE_ENV,
    serverport: envVars.NODE_PORT,
    jwtSecret: envVars.JWT_SECRET,
    filemaxsize: envVars.FILE_MAX_BYTES,
    dbConfig: {
        user: envVars.DB_USER,
        password: envVars.DB_PASSWORD,
        server: envVars.DB_SERVER,
        database: envVars.DB_DATABASE,
        port: envVars.DB_PORT || 1433,
        debug: envVars.DB_DEBUG || false,
        options: { encrypt: false },
        offsetDefault: envVars.DB_OFFSET || 0,
        limitDefault: envVars.DB_LIMIT || 50,
        logging: false,
        encrypt: false,
        pool: {
            max: envVars.DB_POOL_MAX || 20,
            min: envVars.DB_POOL_MIN || 1,
            idleTimeoutMillis: envVars.DB_USER_POOL_TIMEOUT || 30000,
            acqueri: envVars.DB_POOL_ACQUERI || 30000,
            handleDisconnects: true
        },
        define: {
            schema: "core"
        }
    },
    dbConfigUsers: {
        user: envVars.DB_USER_USER,
        password: envVars.DB_USER_PASSWORD,
        server: envVars.DB_USER_SERVER,
        database: envVars.DB_USER_DATABASE,
        port: envVars.DB_USER_PORT || 1433,
        debug: envVars.DB_USER_DEBUG || false,
        options: { encrypt: false },
        offsetDefault: envVars.DB_USER_OFFSET || 0,
        limitDefault: envVars.DB_USER_LIMIT || 50,
        logging: false,
        encrypt: false,
        pool: {
            max: envVars.DB_USER_POOL_MAX || 20,
            min: envVars.DB_USER_POOL_MIN || 1,
            idleTimeoutMillis: envVars.DB_USER_POOL_TIMEOUT || 30000,
            acqueri: envVars.DB_POOL_ACQUERI || 30000,
            handleDisconnects: true
        },
        define: {
            schema: "core"
        }
    }
};

export default config;