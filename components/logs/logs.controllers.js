// Requires - importacion de librerias propias o terceros.
const config = require('../../config/config').default.dbConfig;
const sqs = require('sequelize-querystring');

const Log = require('./logs.models');

const post = async(req, ids, transaction) => {
    let logObject = {
        id_usuario: ids.id_usuario,
        id_object: ids.id_object,
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        method: req.method,
        level: req.level || 'undefined',
        url: req.originalUrl,
        parameters: JSON.stringify(req.params),
        body: JSON.stringify(req.body),
        message: req.message || 'undefined'
    };
    if (transaction) {
        return await Log.create(logObject, { transaction });
    } else {
        return await Log.create(logObject);
    }
};

module.exports = { post };