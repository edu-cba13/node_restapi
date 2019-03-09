const Sequelize = require('sequelize');

const config = require('./config');

const db = config.default.dbConfigUsers;

let loggin = false;

if (config.default.env === 'development') {
    loggin = true;
}

const connect = new Sequelize(
    db.database,
    db.user,
    db.password,

    {
        host: db.server,
        port: db.port || 1443,
        dialect: 'mssql',
        operatorsAliases: true,

        pool: {
            max: db.pool.max || 5,
            min: db.pool.min || 0,
            acquire: db.pool.acqueri || 30000,
            idle: db.pool.idleTimeoutMillis || 30000
        },
        define: {
            timestamps: false // true by default
        },
        logging: loggin
    });


module.exports = connect;