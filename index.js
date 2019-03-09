// config should be imported before importing any other file
const polyfill = require("babel-polyfill");
const config = require('./config/config');
const app = require('./config/express');
const connect = require('./config/connection_cartilla');

const debug = require('debug')('ApiPrestadores:index');


connect
    .authenticate()
    .then(() => {
        if (!module.parent) { console.info('Sql server: \x1b[32m%s\x1b[0m', 'online') };
    })
    .catch(err => {
        console.error('Sql server: \x1b[31m%s\x1b[0m', 'offline');
        console.error('Error:', err);
    });


// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {
    // listen on port config.port
    app.listen(config.default.serverport, () => {
        console.info(`Server started on port ${config.default.serverport} (${config.default.env})`); // eslint-disable-line no-console
    });
}

module.exports = app;